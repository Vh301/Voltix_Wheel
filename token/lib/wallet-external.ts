import {
  WalletContractV5R1,
  beginCell,
  internal,
  SendMode,
  type MessageRelaxed,
} from "@ton/ton";
import type { Address } from "@ton/core";
import type { KeyPair } from "@ton/crypto";

export async function fetchWalletSeqno(
  tonapiBase: string,
  walletAddress: Address,
): Promise<number> {
  const seqnoResponse = await fetch(
    `${tonapiBase}/v2/blockchain/accounts/${walletAddress.toRawString()}/methods/seqno`,
  );
  const seqnoData = await seqnoResponse.json();
  return seqnoData.decoded?.state || 0;
}

export function buildSignedExternalBoc(
  wallet: WalletContractV5R1,
  walletAddress: WalletContractV5R1["address"],
  keyPair: KeyPair,
  seqno: number,
  messages: MessageRelaxed[],
): string {
  const transfer = wallet.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages,
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

  return externalMessage.toBoc().toString("base64");
}

export async function sendExternalBoc(
  tonapiBase: string,
  toncenterRpc: string,
  boc: string,
): Promise<boolean> {
  const sendResponse = await fetch(`${tonapiBase}/v2/blockchain/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ boc }),
  });

  if (sendResponse.ok) {
    return true;
  }

  const error = await sendResponse.text();
  console.log("Send failed:", error);
  console.log("\nTrying toncenter...");

  const toncenterResponse = await fetch(toncenterRpc, {
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
  return false;
}

export function createMainnetWallet(keyPair: KeyPair): WalletContractV5R1 {
  return WalletContractV5R1.create({
    publicKey: keyPair.publicKey,
    workchain: 0,
    walletId: { networkGlobalId: -239 },
  });
}

export { internal };
