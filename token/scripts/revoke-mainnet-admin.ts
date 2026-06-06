import { toNano, beginCell, Address } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { JETTON_CHANGE_ADMIN_OPCODE } from "@ton-community/assets-sdk";
import {
  MAINNET_TONAPI,
  MAINNET_TONCENTER_RPC,
  loadMainnetDeployMnemonic,
  loadMainnetJettonMaster,
  assertRevokeConfirm,
  isPrepareOnly,
} from "../lib/mainnet-config";
import {
  buildSignedExternalBoc,
  createMainnetWallet,
  fetchWalletSeqno,
  internal,
  sendExternalBoc,
} from "../lib/wallet-external";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchAdmin(jettonMaster: string): Promise<string | null> {
  const response = await fetch(`${MAINNET_TONAPI}/v2/jettons/${jettonMaster}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch jetton info: HTTP ${response.status}`);
  }
  const data = await response.json();
  return data.admin?.address ?? null;
}

async function main() {
  const prepareOnly = isPrepareOnly();

  console.log("Revoke VTX jetton admin — TON MAINNET\n");
  console.log("IRREVERSIBLE: after revoke, mint and metadata updates become impossible.\n");

  const cleanMnemonic = loadMainnetDeployMnemonic();
  const jettonMaster = loadMainnetJettonMaster();

  const keyPair = await mnemonicToPrivateKey(cleanMnemonic.split(" "));
  const wallet = createMainnetWallet(keyPair);
  const walletAddress = wallet.address;

  const currentAdmin = await fetchAdmin(jettonMaster);

  console.log("Deploy/admin wallet:", walletAddress.toString());
  console.log("Jetton master:", jettonMaster);
  console.log("Current admin (on-chain):", currentAdmin ?? "null / already revoked");
  console.log("Revoke action: change_admin → null address (TEP-74 / assets-sdk JettonMinter)");
  console.log(`Opcode: ${JETTON_CHANGE_ADMIN_OPCODE} (JETTON_CHANGE_ADMIN_OPCODE)`);

  if (prepareOnly) {
    console.log("\n--prepare-only: no transaction sent.");
    return;
  }

  assertRevokeConfirm();

  if (!currentAdmin) {
    console.log("\nAdmin already null/revoked. Nothing to do.");
    return;
  }

  const revokeBody = beginCell()
    .storeUint(JETTON_CHANGE_ADMIN_OPCODE, 32)
    .storeUint(0, 64)
    .storeAddress(null)
    .endCell();

  console.log("\nGetting wallet seqno...");
  const seqno = await fetchWalletSeqno(MAINNET_TONAPI, walletAddress);
  console.log("Current seqno:", seqno);

  const revokeMessage = internal({
    to: Address.parse(jettonMaster),
    value: toNano("0.1"),
    body: revokeBody,
  });

  const boc = buildSignedExternalBoc(
    wallet,
    walletAddress,
    keyPair,
    seqno,
    [revokeMessage],
  );

  console.log("\nSending revoke transaction (mainnet)...");
  await sendExternalBoc(MAINNET_TONAPI, MAINNET_TONCENTER_RPC, boc);

  console.log("\nWaiting for confirmation (30 seconds)...");
  for (let i = 0; i < 6; i++) {
    await delay(5000);
    process.stdout.write(".");
  }

  const adminAfter = await fetchAdmin(jettonMaster);
  console.log("\n\nAdmin after revoke:", adminAfter ?? "null (revoked)");

  if (!adminAfter) {
    console.log("\nRevoke confirmed: admin is null.");
    console.log("Mint, metadata update, and admin transfer should now be impossible.");
  } else {
    console.log("\nRevoke not confirmed yet. Check manually on tonviewer.");
  }

  console.log(`\nMaster: https://tonviewer.com/${jettonMaster}`);
}

main().catch(console.error);
