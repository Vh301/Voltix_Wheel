import { Address } from "@ton/core";
import { TESTNET_TONAPI, VTX_TOKEN, loadJettonMaster } from "../lib/config";

async function getJettonStats(address: string) {
  const parsedAddress = Address.parse(address);
  const rawAddress = parsedAddress.toRawString();

  try {
    const accountResponse = await fetch(`${TESTNET_TONAPI}/v2/accounts/${rawAddress}`);
    if (!accountResponse.ok) {
      return { error: `HTTP ${accountResponse.status}` };
    }
    const accountData = await accountResponse.json();

    let transactionsCount = 0;
    let lastTx: { now?: number } | null = null;

    try {
      const transactionsResponse = await fetch(
        `${TESTNET_TONAPI}/v2/accounts/${rawAddress}/transactions?limit=1000`,
      );
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json();
        transactionsCount = transactionsData.transactions?.length || 0;
        lastTx = transactionsData.transactions?.[0] ?? null;
      }

      if (transactionsCount === 0) {
        const eventsResponse = await fetch(
          `${TESTNET_TONAPI}/v2/accounts/${rawAddress}/events?limit=1000`,
        );
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json();
          transactionsCount = eventsData.events?.length || 0;
          if (eventsData.events?.[0]) {
            lastTx = { now: eventsData.events[0].timestamp };
          }
        }
      }
    } catch {
      // Ignore fetch errors for optional stats
    }

    let holdersCount = 0;
    try {
      const jettonsResponse = await fetch(`${TESTNET_TONAPI}/v2/jettons/${rawAddress}`);
      if (jettonsResponse.ok) {
        const jettonsData = await jettonsResponse.json();
        holdersCount = jettonsData.holders_count || jettonsData.holders?.length || 0;
      }
    } catch {
      // Ignore fetch errors for optional stats
    }

    const lastActivityTimestamp = lastTx?.now || accountData.last_activity || null;
    const lastActivity = lastActivityTimestamp
      ? new Date(lastActivityTimestamp * 1000).toISOString()
      : null;

    return {
      address,
      status: accountData.status,
      balance: accountData.balance,
      transactionsCount,
      holdersCount,
      lastActivity,
      lastActivityTimestamp,
      rawAddress,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

async function main() {
  const jettonMaster = loadJettonMaster();

  console.log(`Check ${VTX_TOKEN.symbol} jetton master stats — TON testnet\n`);
  console.log("=".repeat(60));
  console.log("\nJetton master");
  console.log("-".repeat(60));
  console.log(`Address: ${jettonMaster}`);
  console.log(`Explorer: https://testnet.tonviewer.com/${jettonMaster}\n`);

  const stats = await getJettonStats(jettonMaster);

  if ("error" in stats && stats.error) {
    console.log(`Error: ${stats.error}`);
  } else if ("error" in stats) {
    console.log("Error: unknown");
  } else {
    console.log("Stats:");
    console.log(`  Status: ${stats.status ?? "N/A"}`);
    console.log(`  TON balance (nano): ${stats.balance ?? "N/A"}`);
    console.log(`  Transactions: ${stats.transactionsCount}`);
    console.log(
      `  Holders: ${stats.holdersCount || "N/A (could not fetch)"}`,
    );
    if (stats.lastActivity && stats.lastActivityTimestamp) {
      const date = new Date(stats.lastActivityTimestamp * 1000);
      console.log(
        `  Last activity: ${date.toLocaleString("ru-RU")} (${stats.lastActivity})`,
      );
    } else {
      console.log("  Last activity: N/A");
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("\nRead-only check — no transactions sent.");
}

main().catch(console.error);
