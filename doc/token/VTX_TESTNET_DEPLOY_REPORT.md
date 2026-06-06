# VTX Testnet Deploy Report

Отчёт об успешном deploy и initial mint jetton **Voltix Wheel Token (VTX)** в TON testnet.

**Дата:** 2026-06-06  
**Scope:** jetton only — без Cash Controller, Exchange и on-chain game economy.

---

## Token

| Parameter | Value |
|-----------|-------|
| Network | TON testnet |
| Token name | Voltix Wheel Token |
| Symbol | VTX |
| Decimals | 9 |

## On-chain addresses

| Role | Address |
|------|---------|
| Jetton master | `EQAX_evrbU5GgQa91KOZS3wjcxCGyc6fcnY6U7CQhY8RUsU2` |
| Admin / deploy wallet | `0QBbEep4YB5I7MB_6gAfplVR79wvUG8emX5xeuZU5G-z3N8o` |

## Metadata

| Resource | URL |
|----------|-----|
| Metadata URL | https://voltix-wheel.vercel.app/metadata/jetton-metadata.json |
| Jetton image URL | https://voltix-wheel.vercel.app/jetton_image/vtx_jetton_image.png |

On-chain metadata (TonAPI) подтверждено: name, symbol, decimals и image совпадают с Vercel static.

## Initial mint

| Parameter | Value |
|-----------|-------|
| Mint amount | 1,000,000 VTX |
| Recipient wallet | `0QBbEep4YB5I7MB_6gAfplVR79wvUG8emX5xeuZU5G-z3N8o` (admin/deploy wallet) |
| Total supply after mint | 1,000,000 VTX (`1000000000000000` nano) |
| Holders after mint | 1 |

## Explorer links

| Resource | Link |
|----------|------|
| Jetton master (Tonviewer) | https://testnet.tonviewer.com/EQAX_evrbU5GgQa91KOZS3wjcxCGyc6fcnY6U7CQhY8RUsU2 |
| Admin wallet (Tonviewer) | https://testnet.tonviewer.com/0QBbEep4YB5I7MB_6gAfplVR79wvUG8emX5xeuZU5G-z3N8o |
| Mint transaction | https://testnet.tonviewer.com/transaction/3495f070fcb6139a64c766d2eae79910a3815b527f68433183ee84e6dd950228 |

Mint transaction hash: `3495f070fcb6139a64c766d2eae79910a3815b527f68433183ee84e6dd950228`

External message hash (mint): `67e64cf0e4100d479b5e61fdce9c6abdcaa19211d64d719fc9a0c9dd2e0a05c0`

## Deploy wallet balance

| Metric | Value |
|--------|-------|
| TON remaining (after deploy + mint) | ~1.88 TON |

## Security & scope confirmations

- **Mainnet не трогался** — deploy и mint выполнены только в TON testnet.
- **`.env.local`, mnemonics и private keys не коммитились** — secrets остаются локально в `token/.env.local` (gitignored).
- **Mainnet config не создавался.**
- **Cash Controller / Exchange не подключались.**

## Tooling

Deploy и mint выполнены через:

```text
token/scripts/deploy-jetton-testnet.ts
token/scripts/mint-test-vtx.ts
token/scripts/check-jetton-stats.ts
```

Подготовительный commit tooling: `f5208e3` — `chore(token): prepare VTX jetton metadata image`
