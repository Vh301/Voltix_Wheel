/** Convert whole VTX amount to on-chain nano units using decimals. */
export function vtxAmountToNano(amountVtx: bigint, decimals: number): bigint {
  return amountVtx * 10n ** BigInt(decimals);
}
