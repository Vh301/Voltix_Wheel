/** Convert whole VTX amount to on-chain nano units using decimals (testnet). */
export function vtxAmountToNano(amountVtx: bigint, decimals: number): bigint {
  return amountVtx * 10n ** BigInt(decimals);
}

/** Convert whole VLTX amount to on-chain nano units using decimals (mainnet). */
export function vltxAmountToNano(amountVltx: bigint, decimals: number): bigint {
  return amountVltx * 10n ** BigInt(decimals);
}
