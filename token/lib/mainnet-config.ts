import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const VLTX_MAINNET = {
  name: "Voltix Wheel Token",
  symbol: "VLTX",
  decimals: 9,
  mintAmount: 1_000_000_000n,
  supplyTarget: 1_000_000_000n,
} as const;

export const VLTX_METADATA_URL =
  "https://voltix-wheel.vercel.app/metadata/vltx-jetton-metadata.json";

export const VLTX_JETTON_IMAGE_URL =
  "https://voltix-wheel.vercel.app/jetton_image/vtx_jetton_image.png";

export const MAINNET_NETWORK_GLOBAL_ID = -239;
export const MAINNET_TONAPI = "https://tonapi.io";
export const MAINNET_TONCENTER_RPC =
  "https://toncenter.com/api/v2/jsonRPC";

export const MAINNET_CONFIRM_VALUE = "YES_I_UNDERSTAND";
export const REVOKE_CONFIRM_VALUE = "YES_REVOKE_IRREVERSIBLY";

/** Deprecated mainnet VTX master — do not use, revoke, or update metadata. */
export const DEPRECATED_VTX_MAINNET_MASTER =
  "EQCqxMdiA9u_t-u30v45CHo6wBc5zndQOP2m6wQhflB_JR1r";

export function assertMainnetConfirm(): void {
  if (process.env.VLTX_MAINNET_CONFIRM !== MAINNET_CONFIRM_VALUE) {
    throw new Error(
      `Mainnet action blocked. Set VLTX_MAINNET_CONFIRM=${MAINNET_CONFIRM_VALUE} in token/.env.local`,
    );
  }
}

export function assertRevokeConfirm(): void {
  assertMainnetConfirm();
  if (process.env.VLTX_REVOKE_ADMIN_CONFIRM !== REVOKE_CONFIRM_VALUE) {
    throw new Error(
      `Revoke blocked. Set VLTX_REVOKE_ADMIN_CONFIRM=${REVOKE_CONFIRM_VALUE} in token/.env.local`,
    );
  }
}

export function loadMainnetDeployMnemonic(): string {
  const mnemonic = process.env.VLTX_MAINNET_DEPLOY_MNEMONIC;

  if (!mnemonic) {
    throw new Error(
      "VLTX_MAINNET_DEPLOY_MNEMONIC not set in token/.env.local",
    );
  }

  return mnemonic.replace(/"/g, "").trim();
}

export function loadMainnetJettonMaster(): string {
  const master = process.env.VLTX_MAINNET_JETTON_MASTER;

  if (!master) {
    throw new Error("VLTX_MAINNET_JETTON_MASTER not set in token/.env.local");
  }

  return master.trim();
}

export function isPrepareOnly(argv: string[] = process.argv): boolean {
  return argv.includes("--prepare-only");
}
