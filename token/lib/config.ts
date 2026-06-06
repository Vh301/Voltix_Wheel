import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const VTX_TOKEN = {
  name: "Voltix Wheel Token",
  symbol: "VTX",
  decimals: 9,
  mintAmount: 1_000_000n,
} as const;

export const VTX_METADATA_URL =
  "https://voltix-wheel.vercel.app/metadata/jetton-metadata.json";

export const VTX_JETTON_IMAGE_URL =
  "https://voltix-wheel.vercel.app/jetton_image/vtx_jetton_image.png";

export const TESTNET_TONAPI = "https://testnet.tonapi.io";
export const TESTNET_TONCENTER_RPC =
  "https://testnet.toncenter.com/api/v2/jsonRPC";

export function loadDeployMnemonic(): string {
  const mnemonic =
    process.env.VTX_DEPLOY_MNEMONIC ||
    process.env.WALLET_MNEMONIC ||
    process.env.DEPLOY_MNEMONIC;

  if (!mnemonic) {
    throw new Error(
      "VTX_DEPLOY_MNEMONIC not set in token/.env.local (aliases: WALLET_MNEMONIC, DEPLOY_MNEMONIC)",
    );
  }

  return mnemonic.replace(/"/g, "").trim();
}

export function loadJettonMaster(): string {
  const master = process.env.VTX_JETTON_MASTER;

  if (!master) {
    throw new Error("VTX_JETTON_MASTER not set in token/.env.local");
  }

  return master.trim();
}

export function isPrepareOnly(argv: string[] = process.argv): boolean {
  return argv.includes("--prepare-only");
}
