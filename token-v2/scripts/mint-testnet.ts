import { Address, beginCell, toNano } from "@ton/core";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { Mint, storeMint } from "../output/VltxJetton_JettonMinter";
import {
  VLTX_V2_METADATA_URL,
  VLTX_V2_TEST_MINT_AMOUNT,
  vltxAmountToNano,
} from "../lib/config";
import {
  TESTNET_TONAPI,
  TESTNET_TONCENTER_RPC,
  assertTestnetConfirm,
  assertTestnetNetworkOnly,
  isPrepareOnly,
  loadTestnetDeployMnemonic,
  loadTestnetJettonMaster,
} from "../lib/testnet-config";
import {
  buildSignedExternalBoc,
  createTestnetWallet,
  fetchWalletNeedsInit,
  fetchWalletSeqno,
  internal,
  sendExternalBoc,
} from "../lib/wallet-external";

const EXPECTED_MASTER = "EQDCYp85l7EDU_Ag6k2JFPRZLZgedGF3lXgp3GMibU1nt3-c";
const EXPECTED_IMAGE =
  "https://voltix-wheel.vercel.app/jetton_image/vltx_jetton_image.png";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitForBalance(
  walletRaw: string,
  masterRaw: string,
  expectedNano: bigint,
): Promise<boolean> {
  for (let i = 0; i < 12; i++) {
    await delay(5000);
    process.stdout.write(".");

    const response = await fetch(
      `${TESTNET_TONAPI}/v2/accounts/${walletRaw}/jettons/${masterRaw}`,
    );
    if (!response.ok) {
      continue;
    }

    const data = await response.json();
    if (data.balance && BigInt(data.balance) >= expectedNano) {
      console.log("\nMint balance confirmed on-chain.");
      return true;
    }
  }

  return false;
}

async function main() {
  const prepareOnly = isPrepareOnly();

  console.log("Mint VLTX v2 test supply — TON TESTNET ONLY\n");

  assertTestnetNetworkOnly();

  const jettonMaster = loadTestnetJettonMaster();
  if (jettonMaster !== EXPECTED_MASTER) {
    throw new Error(
      `Unexpected jetton master: ${jettonMaster}\nExpected: ${EXPECTED_MASTER}`,
    );
  }

  const cleanMnemonic = loadTestnetDeployMnemonic();
  const keyPair = await mnemonicToPrivateKey(cleanMnemonic.split(" "));
  const wallet = createTestnetWallet(keyPair);
  const walletAddress = wallet.address;
  const masterAddress = Address.parse(jettonMaster);
  const mintAmountNano = vltxAmountToNano(VLTX_V2_TEST_MINT_AMOUNT);

  console.log("Recipient/admin wallet:", walletAddress.toString());
  console.log("Jetton master:", jettonMaster);
  console.log(`Mint amount: ${VLTX_V2_TEST_MINT_AMOUNT.toLocaleString()} VLTX`);
  console.log(`Amount (nano): ${mintAmountNano.toString()}`);
  console.log("CloseMinting: NOT running");
  console.log("Mainnet: NOT touched");

  if (prepareOnly) {
    console.log("\n--prepare-only: no transaction sent.");
    return;
  }

  assertTestnetConfirm();

  const mintBody: Mint = {
    $$type: "Mint",
    queryId: 0n,
    receiver: walletAddress,
    mintMessage: {
      $$type: "JettonTransferInternal",
      queryId: 0n,
      amount: mintAmountNano,
      sender: masterAddress,
      responseDestination: masterAddress,
      forwardTonAmount: toNano("0.05"),
      forwardPayload: beginCell().storeUint(0, 1).endCell().asSlice(),
    },
  };

  const mintValue = toNano("1.1");
  const mintMessage = internal({
    to: masterAddress,
    value: mintValue,
    body: beginCell().store(storeMint(mintBody)).endCell(),
  });

  console.log("\nGetting wallet seqno...");
  const needsInit = await fetchWalletNeedsInit(TESTNET_TONAPI, walletAddress);
  const seqno = await fetchWalletSeqno(TESTNET_TONAPI, walletAddress);
  console.log("Current seqno:", seqno, needsInit ? "(wallet needs init)" : "");

  const boc = buildSignedExternalBoc(
    wallet,
    walletAddress,
    keyPair,
    seqno,
    [mintMessage],
    needsInit,
  );

  console.log("\nSending mint transaction via TonAPI testnet...");
  const sent = await sendExternalBoc(TESTNET_TONAPI, TESTNET_TONCENTER_RPC, boc);
  if (!sent) {
    throw new Error("Failed to send mint transaction.");
  }

  console.log("Mint transaction sent. Waiting for balance update (up to 60s)...");
  const confirmed = await waitForBalance(
    walletAddress.toRawString(),
    masterAddress.toRawString(),
    mintAmountNano,
  );

  const eventsResponse = await fetch(
    `${TESTNET_TONAPI}/v2/accounts/${walletAddress.toRawString()}/events?limit=3`,
  );
  let mintTxHash: string | undefined;
  if (eventsResponse.ok) {
    const events = await eventsResponse.json();
    mintTxHash = events.events?.[0]?.event_id;
  }

  const jettonInfoResponse = await fetch(`${TESTNET_TONAPI}/v2/jettons/${masterAddress.toRawString()}`);
  const jettonInfo = jettonInfoResponse.ok ? await jettonInfoResponse.json() : null;

  const balanceResponse = await fetch(
    `${TESTNET_TONAPI}/v2/accounts/${walletAddress.toRawString()}/jettons/${masterAddress.toRawString()}`,
  );
  const balanceData = balanceResponse.ok ? await balanceResponse.json() : null;
  const recipientBalanceNano = balanceData?.balance ? BigInt(balanceData.balance) : 0n;

  console.log("\n=== Step 2 mint result ===");
  console.log("Mint status:", confirmed ? "CONFIRMED" : "SENT — verify manually");
  if (mintTxHash) {
    console.log("Mint tx:", mintTxHash);
    console.log("Tonviewer tx:", `https://testnet.tonviewer.com/transaction/${mintTxHash}`);
  }
  console.log("Recipient wallet:", walletAddress.toString());
  console.log("Minted amount:", `${VLTX_V2_TEST_MINT_AMOUNT.toLocaleString()} VLTX`);
  console.log("Minted amount (nano):", mintAmountNano.toString());
  console.log("Total supply (TonAPI):", jettonInfo?.total_supply ?? "unknown");
  console.log("Recipient balance (nano):", recipientBalanceNano.toString());
  console.log("Mintable (TonAPI):", jettonInfo?.mintable ?? "unknown");
  console.log("Metadata name:", jettonInfo?.metadata?.name ?? "unknown");
  console.log("Metadata symbol:", jettonInfo?.metadata?.symbol ?? "unknown");
  console.log("Metadata image:", jettonInfo?.metadata?.image ?? "unknown");
  console.log(
    "Master Tonviewer:",
    `https://testnet.tonviewer.com/${masterAddress.toString()}`,
  );
  console.log("CloseMinting run: NO");
  console.log("Mainnet touched: NO");

  if (jettonInfo?.metadata?.image !== EXPECTED_IMAGE) {
    console.warn("WARNING: metadata image mismatch");
  }
  if (recipientBalanceNano !== mintAmountNano && confirmed) {
    console.warn("WARNING: recipient balance differs from mint amount");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
