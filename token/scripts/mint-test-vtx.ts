import {
  WalletContractV5R1,
  internal,
  toNano,
  beginCell,
  Address,
  SendMode,
} from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import {
  VTX_TOKEN,
  TESTNET_TONAPI,
  loadDeployMnemonic,
  loadJettonMaster,
  isPrepareOnly,
} from "../lib/config";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const prepareOnly = isPrepareOnly();

  console.log("Mint test VTX tokens — TON testnet\n");

  const cleanMnemonic = loadDeployMnemonic();
  const jettonMaster = loadJettonMaster();

  const keyPair = await mnemonicToPrivateKey(cleanMnemonic.split(" "));
  const wallet = WalletContractV5R1.create({
    publicKey: keyPair.publicKey,
    workchain: 0,
    walletId: { networkGlobalId: -3 },
  });

  const walletAddress = wallet.address;
  const decimals = BigInt(VTX_TOKEN.decimals);
  const amountNano = VTX_TOKEN.mintAmount * 10n ** decimals;

  console.log("Admin/recipient wallet:", walletAddress.toString());
  console.log("Jetton master:", jettonMaster);
  console.log(
    `Mint amount: ${VTX_TOKEN.mintAmount.toLocaleString()} ${VTX_TOKEN.symbol}`,
  );
  console.log(`Amount (nano): ${amountNano.toString()}`);

  if (prepareOnly) {
    console.log("\n--prepare-only: no transaction sent.");
    return;
  }

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
  const seqnoResponse = await fetch(
    `${TESTNET_TONAPI}/v2/blockchain/accounts/${walletAddress.toRawString()}/methods/seqno`,
  );
  const seqnoData = await seqnoResponse.json();
  const seqno = seqnoData.decoded?.state || 0;
  console.log("Current seqno:", seqno);

  const mintMessage = internal({
    to: Address.parse(jettonMaster),
    value: toNano("0.1"),
    body: mintBody,
  });

  const transfer = wallet.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [mintMessage],
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

  console.log("\nSending mint transaction...");

  const sendResponse = await fetch(`${TESTNET_TONAPI}/v2/blockchain/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ boc }),
  });

  if (!sendResponse.ok) {
    const error = await sendResponse.text();
    console.log("Mint failed:", error);
    return;
  }

  console.log("Mint transaction sent!");

  console.log("\nWaiting for confirmation (30 seconds)...");
  for (let i = 0; i < 6; i++) {
    await delay(5000);
    process.stdout.write(".");
  }

  console.log("\n\nChecking VTX balance...");
  try {
    const balanceResponse = await fetch(
      `${TESTNET_TONAPI}/v2/accounts/${walletAddress.toRawString()}/jettons/${Address.parse(jettonMaster).toRawString()}`,
    );
    const balanceData = await balanceResponse.json();

    if (balanceData.balance) {
      const balance = BigInt(balanceData.balance);
      const balanceVtx = Number(balance) / Number(10n ** decimals);
      console.log(`\nVTX balance: ${balanceVtx.toLocaleString()} ${VTX_TOKEN.symbol}`);
    } else {
      console.log("\nCould not fetch balance. Check manually on tonviewer.");
    }
  } catch {
    console.log("\nCould not fetch balance. Check manually on tonviewer.");
  }

  console.log(
    `\nCheck on: https://testnet.tonviewer.com/${walletAddress.toString()}`,
  );
}

main().catch(console.error);
