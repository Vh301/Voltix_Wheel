import {
  WalletContractV5R1,
  internal,
  toNano,
  beginCell,
  Cell,
  SendMode,
} from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { JettonMinter } from "@ton-community/assets-sdk";
import {
  VTX_METADATA_URL,
  TESTNET_TONAPI,
  TESTNET_TONCENTER_RPC,
  loadDeployMnemonic,
  isPrepareOnly,
} from "../lib/config";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function buildOffchainContent(uri: string): Cell {
  return beginCell().storeUint(0x01, 8).storeStringTail(uri).endCell();
}

async function main() {
  const prepareOnly = isPrepareOnly();

  console.log("Deploy Voltix Wheel Token (VTX) jetton — TON testnet\n");

  const cleanMnemonic = loadDeployMnemonic();
  console.log(
    "Mnemonic loaded (first 3 words):",
    cleanMnemonic.split(" ").slice(0, 3).join(" ") + "...",
  );

  const keyPair = await mnemonicToPrivateKey(cleanMnemonic.split(" "));
  const wallet = WalletContractV5R1.create({
    publicKey: keyPair.publicKey,
    workchain: 0,
    walletId: { networkGlobalId: -3 },
  });

  const walletAddress = wallet.address;
  const contentCell = buildOffchainContent(VTX_METADATA_URL);
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
  console.log("  Metadata URL:", VTX_METADATA_URL);
  console.log("  Network: testnet");
  console.log("\nNext step after deploy:");
  console.log(`  VTX_JETTON_MASTER=${jettonMinterAddress.toString()}`);

  if (prepareOnly) {
    console.log("\n--prepare-only: no transaction sent.");
    return;
  }

  console.log("\nGetting wallet seqno...");
  const seqnoResponse = await fetch(
    `${TESTNET_TONAPI}/v2/blockchain/accounts/${walletAddress.toRawString()}/methods/seqno`,
  );
  const seqnoData = await seqnoResponse.json();
  const seqno = seqnoData.decoded?.state || 0;
  console.log("Current seqno:", seqno);

  const deployMessage = internal({
    to: jettonMinterAddress,
    value: toNano("0.15"),
    init: {
      code: JettonMinter.code,
      data: jettonMinter.init!.data,
    },
    body: beginCell().endCell(),
  });

  const transfer = wallet.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [deployMessage],
    sendMode: SendMode.PAY_GAS_SEPARATELY,
  });

  const externalMessage = beginCell()
    .storeUint(0b10, 2)
    .storeUint(0, 2)
    .storeAddress(walletAddress)
    .storeCoins(0)
    .storeBit(false)
    .storeBit(true)
    .storeRef(transfer)
    .endCell();

  const boc = externalMessage.toBoc().toString("base64");

  console.log("\nSending transaction via tonapi.io...");

  const sendResponse = await fetch(`${TESTNET_TONAPI}/v2/blockchain/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ boc }),
  });

  if (!sendResponse.ok) {
    const error = await sendResponse.text();
    console.log("Send failed:", error);

    console.log("\nTrying toncenter...");
    await delay(5000);

    const toncenterResponse = await fetch(TESTNET_TONCENTER_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "1",
        jsonrpc: "2.0",
        method: "sendBoc",
        params: { boc },
      }),
    });

    const toncenterResult = await toncenterResponse.json();
    console.log("Toncenter response:", JSON.stringify(toncenterResult));
  } else {
    console.log("Transaction sent!");
  }

  console.log("\nWaiting for deployment (30 seconds)...");

  for (let i = 0; i < 6; i++) {
    await delay(5000);
    process.stdout.write(".");

    try {
      const checkResponse = await fetch(
        `${TESTNET_TONAPI}/v2/accounts/${jettonMinterAddress.toRawString()}`,
      );
      const checkData = await checkResponse.json();

      if (checkData.status === "active") {
        console.log("\n\nJetton master deployed successfully!");
        console.log("\nAdd to token/.env.local:");
        console.log(`VTX_JETTON_MASTER=${jettonMinterAddress.toString()}`);
        console.log("\nNext: npx tsx scripts/mint-test-vtx.ts");
        return;
      }
    } catch {
      // Continue waiting
    }
  }

  console.log("\n\nDeployment not confirmed yet.");
  console.log(
    "Check manually: https://testnet.tonviewer.com/" +
      jettonMinterAddress.toString(),
  );
  console.log("\nIf deployed, add to token/.env.local:");
  console.log(`VTX_JETTON_MASTER=${jettonMinterAddress.toString()}`);
}

main().catch(console.error);
