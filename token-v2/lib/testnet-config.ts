import * as dotenv from "dotenv";
import { VLTX_V2_METADATA_URL } from "./config";

dotenv.config({ path: ".env.local" });

export { VLTX_V2_METADATA_URL };

export const TESTNET_TONAPI = "https://testnet.tonapi.io";
export const TESTNET_TONCENTER_RPC =
  "https://testnet.toncenter.com/api/v2/jsonRPC";

export function loadTestnetDeployMnemonic(): string {
  const mnemonic = process.env.VLTX_V2_TESTNET_DEPLOY_MNEMONIC?.trim();

  if (!mnemonic) {
    throw new Error(
      "VLTX_V2_TESTNET_DEPLOY_MNEMONIC not set in token-v2/.env.local",
    );
  }

  if (
    process.env.VLTX_MAINNET_DEPLOY_MNEMONIC ||
    process.env.VLTX_MAINNET_CONFIRM
  ) {
    throw new Error(
      "token-v2/.env.local must contain testnet keys only — remove mainnet env vars.",
    );
  }

  return mnemonic.replace(/"/g, "").trim();
}

export function loadTestnetJettonMaster(): string {
  const master = process.env.VLTX_V2_TESTNET_JETTON_MASTER?.trim();
  if (!master) {
    throw new Error("VLTX_V2_TESTNET_JETTON_MASTER not set in token-v2/.env.local");
  }
  return master;
}

export function isPrepareOnly(argv: string[] = process.argv): boolean {
  return argv.includes("--prepare-only");
}

export function assertTestnetConfirm(): void {
  if (process.env.VLTX_V2_TESTNET_CONFIRM !== "YES_I_UNDERSTAND") {
    throw new Error(
      "Set VLTX_V2_TESTNET_CONFIRM=YES_I_UNDERSTAND in token-v2/.env.local to send testnet transactions.",
    );
  }
}

export function assertTestnetNetworkOnly(): void {
  const forbidden = [
    "VLTX_MAINNET_DEPLOY_MNEMONIC",
    "VLTX_MAINNET_JETTON_MASTER",
    "VLTX_MAINNET_CONFIRM",
    "VLTX_REVOKE_ADMIN_CONFIRM",
  ];

  for (const key of forbidden) {
    if (process.env[key]) {
      throw new Error(`Mainnet env detected (${key}) — token-v2 is testnet-only.`);
    }
  }
}
