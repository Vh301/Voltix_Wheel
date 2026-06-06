import * as dotenv from "dotenv";
import { VTX_METADATA_URL, VTX_TOKEN } from "./config";

dotenv.config({ path: ".env.local" });

export const VTX_MAINNET = {
  name: VTX_TOKEN.name,
  symbol: VTX_TOKEN.symbol,
  decimals: VTX_TOKEN.decimals,
  mintAmount: 1_000_000_000n,
  supplyTarget: 1_000_000_000n,
} as const;

export const MAINNET_NETWORK_GLOBAL_ID = -239;
export const MAINNET_TONAPI = "https://tonapi.io";
export const MAINNET_TONCENTER_RPC =
  "https://toncenter.com/api/v2/jsonRPC";

export const MAINNET_CONFIRM_VALUE = "YES_I_UNDERSTAND";
export const REVOKE_CONFIRM_VALUE = "YES_REVOKE_IRREVERSIBLY";

export { VTX_METADATA_URL };

export function assertMainnetConfirm(): void {
  if (process.env.VTX_MAINNET_CONFIRM !== MAINNET_CONFIRM_VALUE) {
    throw new Error(
      `Mainnet action blocked. Set VTX_MAINNET_CONFIRM=${MAINNET_CONFIRM_VALUE} in token/.env.local`,
    );
  }
}

export function assertRevokeConfirm(): void {
  assertMainnetConfirm();
  if (process.env.VTX_REVOKE_ADMIN_CONFIRM !== REVOKE_CONFIRM_VALUE) {
    throw new Error(
      `Revoke blocked. Set VTX_REVOKE_ADMIN_CONFIRM=${REVOKE_CONFIRM_VALUE} in token/.env.local`,
    );
  }
}

export function loadMainnetDeployMnemonic(): string {
  const mnemonic = process.env.VTX_MAINNET_DEPLOY_MNEMONIC;

  if (!mnemonic) {
    throw new Error(
      "VTX_MAINNET_DEPLOY_MNEMONIC not set in token/.env.local",
    );
  }

  return mnemonic.replace(/"/g, "").trim();
}

export function loadMainnetJettonMaster(): string {
  const master = process.env.VTX_MAINNET_JETTON_MASTER;

  if (!master) {
    throw new Error("VTX_MAINNET_JETTON_MASTER not set in token/.env.local");
  }

  return master.trim();
}

export function isPrepareOnly(argv: string[] = process.argv): boolean {
  return argv.includes("--prepare-only");
}
