# VTX Mainnet Deploy Readiness

Audit and preparation plan for **Voltix Wheel Token (VTX)** mainnet jetton deploy.

**Date:** 2026-06-06  
**Status:** scripts prepared — **no mainnet transactions executed**  
**Scope:** jetton only — no Cash Controller, Exchange, on-chain game economy

---

## 1. Is the token module ready for mainnet?

**READY (with conditions).**

| Area | Status | Notes |
|------|--------|-------|
| Testnet reference deploy | Done | Master + 1M VTX mint verified |
| Production metadata | Live | Vercel URLs return HTTP 200 |
| Production image | Live | 1024×1024 PNG, ~479 KB |
| Testnet scripts | Stable | Unchanged, testnet-only endpoints |
| Mainnet scripts | Prepared | Separate files, confirmation flags |
| Revoke mechanism | Confirmed | TEP-74 `change_admin` (opcode 3) → null admin |
| Mainnet wallet | **Pending Yan** | Separate wallet + funded TON |
| Mainnet mnemonic | **Pending Yan** | Local only in `.env.local` |

**Blockers before live mainnet:**

1. Dedicated **mainnet deploy wallet** (not testnet wallet).
2. Wallet funded with sufficient **mainnet TON**.
3. Explicit Yan OK on **each step**: deploy → mint → verify → revoke.
4. `VTX_MAINNET_CONFIRM=YES_I_UNDERSTAND` set only when executing send steps.
5. `VTX_REVOKE_ADMIN_CONFIRM=YES_REVOKE_IRREVERSIBLY` set only for revoke step.

---

## 2. Scripts required

| Step | Script | Sends tx? |
|------|--------|-----------|
| Deploy master | `token/scripts/deploy-jetton-mainnet.ts` | Yes (with confirm) |
| Mint 1B VTX | `token/scripts/mint-mainnet-vtx.ts` | Yes (with confirm) |
| Check stats | `token/scripts/check-mainnet-jetton-stats.ts` | No (read-only) |
| Revoke admin | `token/scripts/revoke-mainnet-admin.ts` | Yes (with both confirms) |

Supporting libs:

- `token/lib/mainnet-config.ts` — mainnet endpoints, env, confirmation guards
- `token/lib/amount.ts` — `vtxAmountToNano()` via BigInt decimals math
- `token/lib/wallet-external.ts` — mainnet wallet V5R1 (`networkGlobalId: -239`)

---

## 3. Scripts safely adapted from testnet

| Testnet script | Mainnet counterpart | Changes |
|----------------|---------------------|---------|
| `deploy-jetton-testnet.ts` | `deploy-jetton-mainnet.ts` | `networkGlobalId: -239`, mainnet TonAPI, `VTX_MAINNET_*` env, confirm gate |
| `mint-test-vtx.ts` | `mint-mainnet-vtx.ts` | 1B VTX via `vtxAmountToNano()`, mainnet endpoints, confirm gate |
| `check-jetton-stats.ts` | `check-mainnet-jetton-stats.ts` | mainnet TonAPI, admin/supply/metadata display |

**Testnet scripts were not modified.**

---

## 4. Mint amount calculation

Target: **1,000,000,000 VTX** with **9 decimals**.

Formula (BigInt, no manual string):

```typescript
amountNano = vtxAmountToNano(1_000_000_000n, 9)
           = 1_000_000_000n * 10n ** 9n
           = 1_000_000_000_000_000_000n
```

Implemented in:

- `token/lib/amount.ts` — `vtxAmountToNano(amountVtx, decimals)`
- `token/lib/mainnet-config.ts` — `VTX_MAINNET.mintAmount = 1_000_000_000n`

Mint script logs both human amount and nano for manual verification before send.

---

## 5. Mainnet sequence (strict order)

```text
Step 0  Preflight (readiness audit, metadata/image live, wallet funded)
Step 1  deploy-jetton-mainnet.ts --prepare-only
        → verify admin address = intended mainnet deploy wallet
Step 2  deploy-jetton-mainnet.ts (VTX_MAINNET_CONFIRM)
        → save VTX_MAINNET_JETTON_MASTER
Step 3  check-mainnet-jetton-stats.ts
        → verify master active, metadata, admin, supply = 0
Step 4  mint-mainnet-vtx.ts --prepare-only
        → verify amount = 1B VTX, recipient = admin wallet
Step 5  mint-mainnet-vtx.ts (VTX_MAINNET_CONFIRM)
Step 6  check-mainnet-jetton-stats.ts
        → verify total_supply = 1B VTX, admin still set, metadata unchanged
Step 7  Yan explicit OK on revoke
Step 8  revoke-mainnet-admin.ts --prepare-only
Step 9  revoke-mainnet-admin.ts (VTX_MAINNET_CONFIRM + VTX_REVOKE_ADMIN_CONFIRM)
Step 10 check-mainnet-jetton-stats.ts
        → admin = null, mint impossible, metadata frozen
```

**Never combine steps.** Stop after each critical step for Yan confirmation.

---

## 6. Revoke admin / ownership implementation

### Source of truth

`JettonMinter` from `@ton-community/assets-sdk` (same code used in testnet deploy):

- `sendChangeAdmin(provider, sender, newAdmin)` — standard wrapper
- `JETTON_CHANGE_ADMIN_OPCODE = 3`
- Payload: `opcode(32) + query_id(64) + newAdmin(address)`

Standard TEP-74 jetton-minter (`ton-blockchain/token-contract`):

```func
if (op == 3) { ;; change admin
    throw_unless(73, equal_slices(sender_address, admin_address));
    slice new_admin_address = in_msg_body~load_msg_addr();
    save_data(total_supply, new_admin_address, content, jetton_wallet_code);
    return ();
}
```

### Revoke method

Set **new admin to null address** (`addr_none`):

```typescript
beginCell()
  .storeUint(JETTON_CHANGE_ADMIN_OPCODE, 32) // 3
  .storeUint(0, 64)
  .storeAddress(null)
  .endCell()
```

This matches SDK `sendChangeAdmin(..., null)` semantics and official minter guidance.

### Post-revoke verification

Via TonAPI `GET /v2/jettons/{master}`:

- `admin` field absent / null
- `get_jetton_data` returns `adminAddress: null` (SDK `readAddressOpt()`)

### What becomes impossible after revoke

| Action | After revoke |
|--------|--------------|
| Mint new VTX | **Impossible** — mint requires `sender == admin_address` (error 73) |
| Change metadata (op 4) | **Impossible** — same admin check |
| Transfer admin (op 3) | **Impossible** — no admin to authorize |
| User transfers / burns | Still possible per jetton wallet rules |

**Irreversible.** Verify metadata and supply before revoke.

---

## 7. Environment variables

### Testnet (already deployed — do not reuse for mainnet)

```text
VTX_DEPLOY_MNEMONIC=
VTX_JETTON_MASTER=
TONCENTER_API_KEY=
```

### Mainnet (separate wallet)

```text
VTX_MAINNET_DEPLOY_MNEMONIC=
VTX_MAINNET_JETTON_MASTER=
TONCENTER_MAINNET_API_KEY=
VTX_MAINNET_CONFIRM=
VTX_REVOKE_ADMIN_CONFIRM=
```

| Variable | When required |
|----------|---------------|
| `VTX_MAINNET_DEPLOY_MNEMONIC` | deploy / mint / revoke prepare & send |
| `VTX_MAINNET_JETTON_MASTER` | after deploy — mint / check / revoke |
| `TONCENTER_MAINNET_API_KEY` | optional fallback RPC |
| `VTX_MAINNET_CONFIRM=YES_I_UNDERSTAND` | deploy send, mint send, revoke send |
| `VTX_REVOKE_ADMIN_CONFIRM=YES_REVOKE_IRREVERSIBLY` | revoke send only |

**No cross-fallback:** mainnet scripts do **not** read `VTX_DEPLOY_MNEMONIC` or testnet master.

---

## 8. Estimated mainnet TON required

| Operation | Estimate |
|-----------|----------|
| Deploy jetton master | ~0.25 TON + gas |
| Mint 1B VTX (single tx) | ~0.15 TON + 0.05 jetton wallet init + gas |
| Revoke admin | ~0.1 TON + gas |
| Buffer / fee spikes | ~0.5–1.0 TON |

**Recommended mainnet wallet balance:** **≥ 2–3 TON** before starting.

Testnet reference: deploy + 1M mint consumed ~0.23 TON total; mainnet fees may be higher.

---

## 9. Risks

| Risk | Mitigation |
|------|------------|
| Wrong wallet / wrong network | Separate env vars; `--prepare-only` before each send; verify admin address |
| Mint wrong amount | BigInt formula + prepare-only logs nano amount |
| Revoke before verifying supply/metadata | Strict step order; Yan OK gate before revoke |
| Reusing testnet wallet on mainnet | Documented prohibition; separate `VTX_MAINNET_DEPLOY_MNEMONIC` |
| Accidental mainnet tx | `VTX_MAINNET_CONFIRM` required; testnet scripts unchanged |
| Metadata not live at deploy | Preflight URL checks (passed 2026-06-06) |
| Irreversible revoke | Separate `VTX_REVOKE_ADMIN_CONFIRM`; prepare-only first |
| Secret leak | `.env.local` gitignored; never commit mnemonics |

---

## 10. Preflight checks (2026-06-06)

### Metadata URL

`https://voltix-wheel.vercel.app/metadata/jetton-metadata.json` — **HTTP 200**

```json
{
  "name": "Voltix Wheel Token",
  "symbol": "VTX",
  "decimals": 9,
  "image": "https://voltix-wheel.vercel.app/jetton_image/vtx_jetton_image.png"
}
```

### Image URL

`https://voltix-wheel.vercel.app/jetton_image/vtx_jetton_image.png` — **HTTP 200**

- Content-Type: `image/png`
- Size: 490,376 bytes (~479 KB)
- Dimensions: 1024×1024

### ECU / testnet contamination audit

- No ECU addresses in scripts
- No ECU metadata URLs
- No hardcoded testnet master in mainnet scripts
- Testnet master unchanged: `EQAX_evrbU5GgQa91KOZS3wjcxCGyc6fcnY6U7CQhY8RUsU2`

### Git / secrets

- `token/.env.local` — gitignored
- `assets/sources/` — gitignored
- `token/node_modules/` — gitignored

---

## 11. What Yan must provide before live mainnet

1. **Dedicated mainnet deploy wallet** (new mnemonic — not testnet `0QBbE...`).
2. **Fund wallet** with ≥ 2–3 TON on mainnet.
3. Fill `token/.env.local` locally (never commit).
4. Explicit OK for **Step 2 deploy** after `--prepare-only` admin check.
5. Explicit OK for **Step 5 mint** after supply/metadata verification.
6. Explicit OK for **Step 9 revoke** after 1B supply confirmed on-chain.
7. Decision on **recipient wallet** for 1B VTX (default: admin/deploy wallet — confirm if treasury wallet needed instead).

---

## 12. Testnet reference (unchanged)

| Item | Value |
|------|-------|
| Master | `EQAX_evrbU5GgQa91KOZS3wjcxCGyc6fcnY6U7CQhY8RUsU2` |
| Admin | `0QBbEep4YB5I7MB_6gAfplVR79wvUG8emX5xeuZU5G-z3N8o` |
| Supply | 1,000,000 VTX |

Full testnet report: [`VTX_TESTNET_DEPLOY_REPORT.md`](./VTX_TESTNET_DEPLOY_REPORT.md)

---

## Confirmations

- **Mainnet deploy:** not executed
- **Mainnet mint:** not executed
- **Mainnet revoke:** not executed
- **Testnet master:** not modified
- **Metadata:** not modified
- **Secrets:** not committed
