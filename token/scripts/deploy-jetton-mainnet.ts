import {
  internal,
  toNano,
  beginCell,
  Cell,
} from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { JettonMinter } from "@ton-community/assets-sdk";
import {
  VLTX_METADATA_URL,
  VLTX_MAINNET,
  MAINNET_TONAPI,
  MAINNET_TONCENTER_RPC,
  loadMainnetDeployMnemonic,
  assertMainnetConfirm,
  isPrepareOnly,
} from "../lib/mainnet-config";
import {
  buildSignedExternalBoc,
  createMainnetWallet,
  fetchWalletSeqno,
  sendExternalBoc,
} from "../lib/wallet-external";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function buildOffchainContent(uri: string): Cell {
  return beginCell().storeUint(0x01, 8).storeStringTail(uri).endCell();
}

async function main() {
  const prepareOnly = isPrepareOnly();

  console.log(`Deploy ${VLTX_MAINNET.name} (${VLTX_MAINNET.symbol}) jetton — TON MAINNET\n`);
  console.log("WARNING: real mainnet. No transaction without VLTX_MAINNET_CONFIRM.\n");

  const cleanMnemonic = loadMainnetDeployMnemonic();
  console.log(
    "Mnemonic loaded (first 3 words):",
    cleanMnemonic.split(" ").slice(0, 3).join(" ") + "...",
  );

  const keyPair = await mnemonicToPrivateKey(cleanMnemonic.split(" "));
  const wallet = createMainnetWallet(keyPair);
  const walletAddress = wallet.address;
  const contentCell = buildOffchainContent(VLTX_METADATA_URL);
  const jettonMinter = JettonMinter.createFromConfig(
    {
      admin: walletAddress,
      content: contentCell,
    },
    JettonMinter.code,
  );
  const jettonMinterAddress = jettonMinter.address;

  console.log("\nPrepared deployment:");
  console.log("  Admin address:", walletAddress.toString());
  console.log("  Jetton master address:", jettonMinterAddress.toString());
  console.log("  Symbol:", VLTX_MAINNET.symbol);
  console.log("  Metadata URL:", VLTX_METADATA_URL);
  console.log("  Network: mainnet");
  console.log("\nNext step after deploy:");
  console.log(`  VLTX_MAINNET_JETTON_MASTER=${jettonMinterAddress.toString()}`);

  if (prepareOnly) {
    console.log("\n--prepare-only: no transaction sent.");
    return;
  }

  assertMainnetConfirm();

  console.log("\nGetting wallet seqno...");
  const seqno = await fetchWalletSeqno(MAINNET_TONAPI, walletAddress);
  console.log("Current seqno:", seqno);

  const deployMessage = internal({
    to: jettonMinterAddress,
    value: toNano("0.25"),
    init: {
      code: JettonMinter.code,
      data: jettonMinter.init!.data,
    },
    body: beginCell().endCell(),
  });

  const boc = buildSignedExternalBoc(
    wallet,
    walletAddress,
    keyPair,
    seqno,
    [deployMessage],
  );

  console.log("\nSending transaction via tonapi.io (mainnet)...");
  await sendExternalBoc(MAINNET_TONAPI, MAINNET_TONCENTER_RPC, boc);

  console.log("\nWaiting for deployment (45 seconds)...");

  for (let i = 0; i < 9; i++) {
    await delay(5000);
    process.stdout.write(".");

    try {
      const checkResponse = await fetch(
        `${MAINNET_TONAPI}/v2/accounts/${jettonMinterAddress.toRawString()}`,
      );
      const checkData = await checkResponse.json();

      if (checkData.status === "active") {
        console.log("\n\nJetton master deployed successfully on MAINNET!");
        console.log("\nAdd to token/.env.local:");
        console.log(`VLTX_MAINNET_JETTON_MASTER=${jettonMinterAddress.toString()}`);
        console.log("\nNext: npx tsx scripts/mint-mainnet-vltx.ts --prepare-only");
        return;
      }
    } catch {
      // Continue waiting
    }
  }

  console.log("\n\nDeployment not confirmed yet.");
  console.log(
    "Check manually: https://tonviewer.com/" + jettonMinterAddress.toString(),
  );
  console.log("\nIf deployed, add to token/.env.local:");
  console.log(`VLTX_MAINNET_JETTON_MASTER=${jettonMinterAddress.toString()}`);
}

main().catch(console.error);
