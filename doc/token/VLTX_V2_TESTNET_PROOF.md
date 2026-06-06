# VLTX v2 Testnet Proof — Tact Fixed-Supply Jetton

**Status:** Phase B complete — testnet proof passed  
**Date:** 2026-05-26  
**Scope:** jetton only — no Cash Controller, Exchange, on-chain game economy  
**Module:** `token-v2/` (Tact base JettonMinter from `tact-lang/jetton`)

---

## Executive summary

VLTX v2 on TON testnet proves the Tact fixed-supply lifecycle:

```text
Deploy → Mint 1,000,000 VLTX → CloseMinting → ChangeOwner(null) → Emulation after owner null
```

After `CloseMinting`, `get_jetton_data().mintable` is **0 / false** and Tonviewer shows **Mintable: NO**.  
After `ChangeOwner(null)`, admin operations are rejected (emulation only — no further on-chain txs).

**Mainnet:** not executed. Mainnet metadata host is ready via git tag `vltx-v2-mainnet-metadata` (see [Mainnet metadata hosting](#mainnet-metadata-hosting)). On-chain deploy still requires explicit Yan OK per step.

---

## Testnet master

```text
VLTX v2 testnet master:
EQDCYp85l7EDU_Ag6k2JFPRZLZgedGF3lXgp3GMibU1nt3-c
```

| Role | Address |
|------|---------|
| Jetton master | `EQDCYp85l7EDU_Ag6k2JFPRZLZgedGF3lXgp3GMibU1nt3-c` |
| Admin / deploy wallet (former owner) | `EQBbEep4YB5I7MB_6gAfplVR79wvUG8emX5xeuZU5G-z3Dln` |

Tonviewer (master): https://testnet.tonviewer.com/EQDCYp85l7EDU_Ag6k2JFPRZLZgedGF3lXgp3GMibU1nt3-c

---

## Lifecycle

```text
Deploy → Mint 1,000,000 VLTX → CloseMinting → ChangeOwner(null) → Emulation after owner null
```

| Step | Action | Result |
|------|--------|--------|
| 1 | Deploy master | mintable=true, supply=0 |
| 2 | Mint 1,000,000 VLTX | supply=1M, holder balance=1M |
| 3 | CloseMinting | mintable=false (raw `0x0`) |
| 4 | Emulate mint after close | REJECTED exit 51950 |
| 5 | ChangeOwner(null) | admin revoked |
| 6 | Emulate admin ops after revoke | all REJECTED (9215 / 51950) |

---

## Final state

```text
Network: TON testnet
Token name: Voltix Wheel Token
Symbol: VLTX
Decimals: 9
Total supply: 1,000,000 VLTX
Mintable: false / NO
Owner/admin: null / empty
Holder balance: 1,000,000 VLTX
Metadata image: https://voltix-wheel.vercel.app/jetton_image/vltx_jetton_image.png
```

| Parameter | On-chain / API value |
|-----------|----------------------|
| Metadata URL | https://voltix-wheel.vercel.app/metadata/vltx-v2-jetton-metadata.json |
| `total_supply` (nano) | `1000000000000000` |
| `mintable` (TonAPI) | `false` |
| `mintable` (get_jetton_data raw) | `0x0` |
| Admin | null / empty |

---

## Transactions

| Step | Transaction |
|------|-------------|
| Deploy | https://testnet.tonviewer.com/transaction/9a06c277a2fe5958c7ac9490aa02a506074b7756215f020246836b3b8ce5decd |
| Mint 1,000,000 VLTX | https://testnet.tonviewer.com/transaction/6f631043026666b7f0c6e3bf821c31ee460900f41f184eeec2f3786b64dd2bc6 |
| CloseMinting | https://testnet.tonviewer.com/transaction/b1fe7c87f4c450c778fca23bf2c530a2b5e146ff0c5d7ea446c83baad9a43721 |
| ChangeOwner(null) | https://testnet.tonviewer.com/transaction/45e8a99b574be93c9f31b21f686c2c179db189bfc4c2c7b51fbb2ec3718e6eac |

Emulation steps (4 and 6) used TonAPI `POST /v2/traces/emulate` only — **no on-chain transactions**.

---

## Critical proof — CloseMinting

Unlike `@ton-community/assets-sdk` JettonMinter (reference FunC), Tact base stores real `mintable: Bool` in storage and supports `CloseMinting`.

```text
CloseMinting result:
get_jetton_data().mintable changed from -1 / true to 0 / false.
TonAPI shows mintable=false.
Yan visually confirmed in testnet Tonviewer: Mintable = NO.
```

This is the primary UX/trust requirement for VLTX v2 production.

---

## Emulation proof

### Step 4 — Mint after CloseMinting

Sender: former admin wallet `EQBbEep4YB5I7MB_6gAfplVR79wvUG8emX5xeuZU5G-z3Dln`  
Method: TonAPI trace emulate (`npm run emulate:post-close`)

```text
Mint after CloseMinting:
REJECTED
Exit code: 51950
Reason: Mint is closed
Supply unchanged
Balance unchanged
No on-chain tx
```

### Step 6 — After ChangeOwner(null)

Sender: former admin wallet (same as above)  
Method: TonAPI trace emulate (`npm run emulate:after-owner-null`)

```text
After ChangeOwner(null):

JettonUpdateContent → REJECTED, exit 9215, Incorrect sender
ChangeOwner → REJECTED, exit 9215, Incorrect sender
CloseMinting → REJECTED, exit 9215, Incorrect sender
Mint → REJECTED, exit 51950, Mint is closed
```

Exit codes (Tact):

| Code | Meaning |
|------|---------|
| 9215 | Incorrect sender |
| 51950 | Mint is closed |

Post-emulation chain state unchanged: mintable=false, admin=null, supply=1M, balance=1M, metadata unchanged, wallet seqno unchanged.

---

## Phase A — Sandbox (local)

Module: `token-v2/tests/fixed-supply.spec.ts` — 7/7 PASS

Proves locally (no chain):

1. `mintable` stored in contract storage
2. `CloseMinting` sets mintable to false
3. `get_jetton_data()` returns mintable = 0 after close
4. Mint after close rejected
5. `ChangeOwner(null)` after close succeeds
6. `JettonUpdateContent` after revoke rejected

---

## Verdict

```text
VLTX v2 Tact fixed-supply flow is ready for mainnet preparation.

Mainnet sequence must be:
1. Deploy master
2. Mint full supply: 1,000,000,000 VLTX
3. CloseMinting
4. Verify Mintable = false / NO
5. ChangeOwner(null)
6. Verify admin null and admin operations rejected
```

**Phase B testnet proof: PASSED**

---

## Mainnet metadata hosting

Testnet proof used Vercel URLs (historical). Mainnet metadata is pinned separately:

| Asset | URL |
|-------|-----|
| Metadata JSON | `https://raw.githubusercontent.com/Vh301/Voltix_Wheel/vltx-v2-mainnet-metadata/public/metadata/vltx-v2-jetton-metadata.json` |
| Jetton image | `https://raw.githubusercontent.com/Vh301/Voltix_Wheel/vltx-v2-mainnet-metadata/public/jetton_image/vltx_jetton_image.png` |

Git tag: `vltx-v2-mainnet-metadata` on public repo `Vh301/Voltix_Wheel`. No Vercel, no branch `main` URL for mainnet deploy.

---

## Related docs

| Document | Path |
|----------|------|
| Technical audit & plan | [`docs/reports/VLTX_V2_TACT_JETTON_AUDIT_AND_PLAN.md`](../../docs/reports/VLTX_V2_TACT_JETTON_AUDIT_AND_PLAN.md) |
| Module README | [`token-v2/README.md`](../../token-v2/README.md) |

---

## Scope exclusions

- Deprecated VLTX v1 mainnet master — not modified
- Legacy `token/` assets-sdk flow — not used for v2
- Mainnet deploy / mint / revoke — **not executed**
- `.env.local`, mnemonics, private keys — never committed
