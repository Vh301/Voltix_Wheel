import { toNano, beginCell, Address } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import {
  VTX_MAINNET,
  MAINNET_TONAPI,
  MAINNET_TONCENTER_RPC,
  loadMainnetDeployMnemonic,
  loadMainnetJettonMaster,
  assertMainnetConfirm,
  isPrepareOnly,
} from "../lib/mainnet-config";
import { vtxAmountToNano } from "../lib/amount";
import {
  buildSignedExternalBoc,
  createMainnetWallet,
  fetchWalletSeqno,
  internal,
  sendExternalBoc,
} from "../lib/wallet-external";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const prepareOnly = isPrepareOnly();

  console.log("Mint VTX on TON MAINNET\n");
  console.log("WARNING: real mainnet. No transaction without VTX_MAINNET_CONFIRM.\n");

  const cleanMnemonic = loadMainnetDeployMnemonic();
  const jettonMaster = loadMainnetJettonMaster();

  const keyPair = await mnemonicToPrivateKey(cleanMnemonic.split(" "));
  const wallet = createMainnetWallet(keyPair);
  const walletAddress = wallet.address;
  const decimals = VTX_MAINNET.decimals;
  const amountNano = vtxAmountToNano(VTX_MAINNET.mintAmount, decimals);

  console.log("Admin/recipient wallet:", walletAddress.toString());
  console.log("Jetton master:", jettonMaster);
  console.log(
    `Mint amount: ${VTX_MAINNET.mintAmount.toLocaleString()} ${VTX_MAINNET.symbol}`,
  );
  console.log(`Amount (nano): ${amountNano.toString()}`);
  console.log(
    `Expected raw check: ${VTX_MAINNET.mintAmount.toString()} * 10^${decimals} = ${amountNano.toString()}`,
  );

  if (prepareOnly) {
    console.log("\n--prepare-only: no transaction sent.");
    return;
  }

  assertMainnetConfirm();

  const internalTransferBody = beginCell()
    .storeUint(0x178d4519, 32)
    .storeUint(0, 64)
    .storeCoins(amountNano)
    .storeAddress(null)
    .storeAddress(walletAddress)
    .storeCoins(0)
    .storeBit(false)
    .endCell();

  const mintBody = beginCell()
    .storeUint(21, 32)
    .storeUint(0, 64)
    .storeAddress(walletAddress)
    .storeCoins(toNano("0.05"))
    .storeRef(internalTransferBody)
    .endCell();

  console.log("\nGetting wallet seqno...");
  const seqno = await fetchWalletSeqno(MAINNET_TONAPI, walletAddress);
  console.log("Current seqno:", seqno);

  const mintMessage = internal({
    to: Address.parse(jettonMaster),
    value: toNano("0.15"),
    body: mintBody,
  });

  const boc = buildSignedExternalBoc(
    wallet,
    walletAddress,
    keyPair,
    seqno,
    [mintMessage],
  );

  console.log("\nSending mint transaction (mainnet)...");
  await sendExternalBoc(MAINNET_TONAPI, MAINNET_TONCENTER_RPC, boc);

  console.log("\nWaiting for confirmation (45 seconds)...");
  for (let i = 0; i < 9; i++) {
    await delay(5000);
    process.stdout.write(".");
  }

  console.log("\n\nChecking VTX balance...");
  try {
    const balanceResponse = await fetch(
      `${MAINNET_TONAPI}/v2/accounts/${walletAddress.toRawString()}/jettons/${Address.parse(jettonMaster).toRawString()}`,
    );
    const balanceData = await balanceResponse.json();

    if (balanceData.balance) {
      const balance = BigInt(balanceData.balance);
      const balanceVtx = Number(balance) / Number(10n ** BigInt(decimals));
      console.log(
        `\nVTX balance: ${balanceVtx.toLocaleString()} ${VTX_MAINNET.symbol}`,
      );
    } else {
      console.log("\nCould not fetch balance. Check manually on tonviewer.");
    }
  } catch {
    console.log("\nCould not fetch balance. Check manually on tonviewer.");
  }

  console.log(`\nCheck on: https://tonviewer.com/${walletAddress.toString()}`);
}

main().catch(console.error);
