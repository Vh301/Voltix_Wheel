import { Address } from "@ton/core";
import {
  VTX_MAINNET,
  MAINNET_TONAPI,
  loadMainnetJettonMaster,
} from "../lib/mainnet-config";

async function getJettonStats(address: string) {
  const parsedAddress = Address.parse(address);
  const rawAddress = parsedAddress.toRawString();

  try {
    const accountResponse = await fetch(`${MAINNET_TONAPI}/v2/accounts/${rawAddress}`);
    if (!accountResponse.ok) {
      return { error: `HTTP ${accountResponse.status}` };
    }
    const accountData = await accountResponse.json();

    const jettonsResponse = await fetch(`${MAINNET_TONAPI}/v2/jettons/${rawAddress}`);
    let jettonInfo: Record<string, unknown> | null = null;
    if (jettonsResponse.ok) {
      jettonInfo = await jettonsResponse.json();
    }

    return {
      address,
      status: accountData.status,
      balance: accountData.balance,
      totalSupply: jettonInfo?.total_supply,
      mintable: jettonInfo?.mintable,
      admin: jettonInfo?.admin,
      metadata: jettonInfo?.metadata,
      holdersCount:
        (jettonInfo?.holders_count as number | undefined) ??
        (Array.isArray(jettonInfo?.holders) ? jettonInfo.holders.length : 0),
      rawAddress,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

async function main() {
  const jettonMaster = loadMainnetJettonMaster();

  console.log(`Check ${VTX_MAINNET.symbol} jetton master stats — TON MAINNET\n`);
  console.log("=".repeat(60));
  console.log("\nJetton master");
  console.log("-".repeat(60));
  console.log(`Address: ${jettonMaster}`);
  console.log(`Explorer: https://tonviewer.com/${jettonMaster}\n`);

  const stats = await getJettonStats(jettonMaster);

  if ("error" in stats && stats.error) {
    console.log(`Error: ${stats.error}`);
  } else if ("error" in stats) {
    console.log("Error: unknown");
  } else {
    console.log("Stats:");
    console.log(`  Status: ${stats.status ?? "N/A"}`);
    console.log(`  TON balance (nano): ${stats.balance ?? "N/A"}`);
    console.log(`  Total supply (nano): ${stats.totalSupply ?? "N/A"}`);
    console.log(`  Mintable: ${stats.mintable ?? "N/A"}`);
    console.log(`  Admin: ${stats.admin ? JSON.stringify(stats.admin) : "null / revoked"}`);
    console.log(`  Holders: ${stats.holdersCount || "N/A"}`);
    if (stats.metadata && typeof stats.metadata === "object") {
      const meta = stats.metadata as Record<string, string>;
      console.log(`  Metadata name: ${meta.name ?? "N/A"}`);
      console.log(`  Metadata symbol: ${meta.symbol ?? "N/A"}`);
      console.log(`  Metadata image: ${meta.image ?? "N/A"}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("\nRead-only check — no transactions sent.");
}

main().catch(console.error);
