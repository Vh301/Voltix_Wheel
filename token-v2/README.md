# VLTX v2 — Tact Fixed-Supply Jetton

Isolated module for **VLTX v2** production token on Tact base jetton (`tact-lang/jetton`).

| Phase | Status |
|-------|--------|
| **Phase A** — sandbox compile + fixed-supply tests | **PASSED** (7/7) |
| **Phase B** — testnet deploy proof | **PASSED** |
| **Mainnet** | **Not executed** — blocked until permanent assets domain |

Testnet proof: [`doc/token/VLTX_V2_TESTNET_PROOF.md`](../doc/token/VLTX_V2_TESTNET_PROOF.md)

## Why not `token/`?

| Module | Stack | Status |
|--------|-------|--------|
| `token/` | `@ton-community/assets-sdk` JettonMinter | Historical — testnet VTX + deprecated VLTX v1 |
| `token-v2/` | Tact base JettonMinter | **VLTX v2 production candidate** |

Tact base stores real `mintable: Bool` and supports `CloseMinting` → Tonviewer `Mintable: false`.

## Testnet master (Phase B)

```text
EQDCYp85l7EDU_Ag6k2JFPRZLZgedGF3lXgp3GMibU1nt3-c
```

Final state: 1,000,000 VLTX, mintable=false, admin=null.

## Contracts

Vendored from [`tact-lang/jetton`](https://github.com/tact-lang/jetton) **base** variant:

- `contracts/jetton-minter.tact`
- `contracts/jetton-wallet.tact`
- `contracts/messages.tact`
- `contracts/constants.tact`
- `contracts/utils.tact`

## Metadata

| File | URL |
|------|-----|
| `metadata/vltx-v2-jetton-metadata.json` | source copy |
| `public/metadata/vltx-v2-jetton-metadata.json` | pinned via git tag `vltx-v2-mainnet-metadata` |

**Mainnet metadata (raw GitHub, tag-pinned):**

```text
https://raw.githubusercontent.com/Vh301/Voltix_Wheel/vltx-v2-mainnet-metadata/public/metadata/vltx-v2-jetton-metadata.json
https://raw.githubusercontent.com/Vh301/Voltix_Wheel/vltx-v2-mainnet-metadata/public/jetton_image/vltx_jetton_image.png
```

**Do not use** `vltx-jetton-metadata.json` — deprecated stub for old master.

## Commands

```bash
cd token-v2
npm install
npm run build    # Tact compile → output/
npm test         # sandbox fixed-supply proof
npm run typecheck
```

Phase B testnet scripts (gated by `VLTX_V2_TESTNET_CONFIRM` in `.env.local`):

```bash
npm run deploy:testnet
npm run mint:testnet
npm run close-minting:testnet
npm run revoke-owner:testnet
npm run check:stats
npm run emulate:post-close          # Step 4 — no on-chain tx
npm run emulate:after-owner-null    # Step 6 — no on-chain tx
```

## Fixed-supply sequence (production)

```text
1. Deploy master (mintable=true)
2. Mint 1,000,000,000 VLTX
3. CloseMinting          → get_jetton_data().mintable = 0
4. ChangeOwner(null)     → metadata immutable
5. Emulate admin ops     → verify all rejected (dry-run)
```

Testnet used 1,000,000 VLTX for cost control; mainnet uses full 1B supply.

## Mainnet metadata hosting

Mainnet metadata/image use **raw GitHub** from public repo `Vh301/Voltix_Wheel`, pinned by tag `vltx-v2-mainnet-metadata` — not Vercel, not branch `main`.

Mainnet deploy is still blocked until explicit Yan OK per deploy step (on-chain only).

## Audit

See [`docs/reports/VLTX_V2_TACT_JETTON_AUDIT_AND_PLAN.md`](../docs/reports/VLTX_V2_TACT_JETTON_AUDIT_AND_PLAN.md).

## Scope

- Jetton only — no Cash Controller, Exchange, game economy UI
- Never commit `.env.local`, mnemonics, or private keys
