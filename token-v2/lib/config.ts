/** VLTX uses 9 decimals — same helper pattern as token/lib/amount.ts */
export const VLTX_DECIMALS = 9;

export function vltxAmountToNano(amount: bigint | number | string): bigint {
  const whole = BigInt(amount);
  return whole * 10n ** BigInt(VLTX_DECIMALS);
}

export const VLTX_V2_METADATA_URL =
  "https://raw.githubusercontent.com/Vh301/Voltix_Wheel/vltx-v2-mainnet-metadata/public/metadata/vltx-v2-jetton-metadata.json";

export const VLTX_V2_TEST_MINT_AMOUNT = 1_000_000n;
