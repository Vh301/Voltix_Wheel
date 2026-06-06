# Voltix Wheel Token — testnet + mainnet deploy tooling

Изолированный модуль для деплоя jetton **Voltix Wheel Token** в TON testnet (VTX) и mainnet (VLTX).

**Scope:** только jetton. Без Cash Controller, Exchange и on-chain game economy.

## Testnet status (VTX)

| Parameter | Value |
|-----------|-------|
| Status | **Deployed on testnet** (master + initial mint) |
| Jetton master | `EQAX_evrbU5GgQa91KOZS3wjcxCGyc6fcnY6U7CQhY8RUsU2` |
| Admin wallet | `0QBbEep4YB5I7MB_6gAfplVR79wvUG8emX5xeuZU5G-z3N8o` |
| Total supply | 1,000,000 VTX |
| Tonviewer (master) | https://testnet.tonviewer.com/EQAX_evrbU5GgQa91KOZS3wjcxCGyc6fcnY6U7CQhY8RUsU2 |

Полный отчёт: [`doc/token/VTX_TESTNET_DEPLOY_REPORT.md`](../doc/token/VTX_TESTNET_DEPLOY_REPORT.md)

## Важно

- Deploy и mint **не выполняются автоматически** при изменении кода.
- Testnet master уже задеплоен — повторный deploy не нужен без отдельного решения.
- **Deprecated mainnet VTX** (`EQCqxMdiA9u_t-u30v45CHo6wBc5zndQOP2m6wQhflB_JR1r`) — abandoned, не revoke, не менять metadata, не использовать в UI/docs.
- Production mainnet ticker: **VLTX**.
- Никогда не коммитьте `.env.local`, mnemonics и private keys.

## Testnet token parameters (VTX)

| Parameter | Value |
|-----------|-------|
| Name | Voltix Wheel Token |
| Symbol | VTX |
| Decimals | 9 |
| Network | TON testnet |
| Initial test mint | 1,000,000 VTX |
| Metadata URL | https://voltix-wheel.vercel.app/metadata/jetton-metadata.json |
| Jetton image | https://voltix-wheel.vercel.app/jetton_image/vtx_jetton_image.png |

## Подготовка `.env.local`

```bash
cd token
cp .env.example .env.local
```

Заполните локально (файл не коммитится):

```text
VTX_DEPLOY_MNEMONIC=your testnet deploy wallet mnemonic
VTX_JETTON_MASTER=          # после deploy
TONCENTER_API_KEY=          # optional fallback
```

Скрипты также принимают alias `WALLET_MNEMONIC` / `DEPLOY_MNEMONIC` (ECU compatibility).

## Metadata

### Testnet (VTX)

- Источник для deploy tooling: `token/metadata/jetton-metadata.json`
- Static copy для Vercel: `public/metadata/jetton-metadata.json`

### Mainnet production (VLTX)

- Источник для deploy tooling: `token/metadata/vltx-jetton-metadata.json`
- Static copy для Vercel: `public/metadata/vltx-jetton-metadata.json`
- Metadata URL: https://voltix-wheel.vercel.app/metadata/vltx-jetton-metadata.json

### Shared image

- Jetton image asset: `public/jetton_image/vtx_jetton_image.png`
- Image URL (брендовая Voltix, без переименования): https://voltix-wheel.vercel.app/jetton_image/vtx_jetton_image.png

Перед реальным mainnet deploy metadata и image должны быть доступны по URL на Vercel.

## Команды testnet

Установка зависимостей:

```bash
cd token
npm install
```

Подготовка адресов без on-chain транзакций:

```bash
npx tsx scripts/deploy-jetton-testnet.ts --prepare-only
npx tsx scripts/mint-test-vtx.ts --prepare-only
```

Реальный deploy (только после разрешения Яна):

```bash
npx tsx scripts/deploy-jetton-testnet.ts
```

После deploy — записать `VTX_JETTON_MASTER` в `.env.local`, затем:

```bash
npx tsx scripts/mint-test-vtx.ts
npx tsx scripts/check-jetton-stats.ts
```

Или через npm scripts:

```bash
npm run deploy:testnet:prepare
npm run deploy:testnet
npm run mint:testnet
npm run check:stats
```

## Структура

```text
token/
  README.md
  .env.example
  metadata/jetton-metadata.json          # testnet VTX
  metadata/vltx-jetton-metadata.json     # mainnet VLTX
  lib/config.ts                          # testnet
  lib/mainnet-config.ts                  # mainnet VLTX
  scripts/
    deploy-jetton-testnet.ts
    mint-test-vtx.ts
    check-jetton-stats.ts
    deploy-jetton-mainnet.ts
    mint-mainnet-vltx.ts
    check-mainnet-jetton-stats.ts
    revoke-mainnet-admin.ts
```

## Источник паттерна

Скрипты адаптированы из ECU `ECU_PRODUCTION_STAGING`:

- `scripts/deploy-jetton-final.ts`
- `scripts/mint-test-ecu.ts`
- `scripts/check-jetton-stats.ts`

ECU addresses, metadata URL и private values **не копировались**.

## Mainnet production (VLTX — NOT deployed)

**Target:** 1,000,000,000 VLTX, mint once, then revoke admin.

| Parameter | Value |
|-----------|-------|
| Status | **Not deployed** — scripts prepared only |
| Symbol | VLTX |
| Network | TON mainnet |
| Supply target | 1,000,000,000 VLTX |
| Mint policy | mint once → revoke admin |
| Metadata URL | https://voltix-wheel.vercel.app/metadata/vltx-jetton-metadata.json |

Readiness audit (historical VTX context): [`doc/token/VTX_MAINNET_DEPLOY_READINESS.md`](../doc/token/VTX_MAINNET_DEPLOY_READINESS.md)

### Mainnet env (`token/.env.local`)

```text
VLTX_MAINNET_DEPLOY_MNEMONIC=
VLTX_MAINNET_JETTON_MASTER=
TONCENTER_MAINNET_API_KEY=
VLTX_MAINNET_CONFIRM=
VLTX_REVOKE_ADMIN_CONFIRM=
```

- `VLTX_MAINNET_CONFIRM=YES_I_UNDERSTAND` — required for deploy/mint send
- `VLTX_REVOKE_ADMIN_CONFIRM=YES_REVOKE_IRREVERSIBLY` — required for revoke send
- **Separate mainnet wallet** — do not reuse testnet deploy wallet

### Mainnet sequence (each step needs explicit Yan OK)

```bash
cd token

# 1. Prepare addresses (no tx)
npx tsx scripts/deploy-jetton-mainnet.ts --prepare-only

# 2. Deploy master (requires VLTX_MAINNET_CONFIRM)
npx tsx scripts/deploy-jetton-mainnet.ts

# 3. Set VLTX_MAINNET_JETTON_MASTER, then prepare mint
npx tsx scripts/mint-mainnet-vltx.ts --prepare-only

# 4. Mint 1B VLTX (requires VLTX_MAINNET_CONFIRM)
npx tsx scripts/mint-mainnet-vltx.ts

# 5. Verify supply/metadata/admin
npx tsx scripts/check-mainnet-jetton-stats.ts

# 6. Revoke admin (requires BOTH confirm flags)
npx tsx scripts/revoke-mainnet-admin.ts --prepare-only
npx tsx scripts/revoke-mainnet-admin.ts

# 7. Verify admin revoked
npx tsx scripts/check-mainnet-jetton-stats.ts
```
