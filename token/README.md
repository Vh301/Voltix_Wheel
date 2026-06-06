# Voltix Wheel Token (VTX) — testnet deploy tooling

Изолированный модуль для деплоя jetton **Voltix Wheel Token (VTX)** в TON testnet.

**Scope:** только jetton. Без Cash Controller, Exchange и on-chain game economy.

## Важно

- Deploy и mint **не выполняются автоматически**.
- Реальный testnet deploy — **только после явного разрешения Яна**.
- Никогда не коммитьте `.env.local`, mnemonics и private keys.

## Token parameters

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

- Источник для deploy tooling: `token/metadata/jetton-metadata.json`
- Static copy для Vercel: `public/metadata/jetton-metadata.json`
- Jetton image asset: `public/jetton_image/vtx_jetton_image.png`

Перед реальным deploy metadata и image должны быть доступны по URL:

`https://voltix-wheel.vercel.app/metadata/jetton-metadata.json`

`https://voltix-wheel.vercel.app/jetton_image/vtx_jetton_image.png`

## Команды (следующий этап)

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
  metadata/jetton-metadata.json
  lib/config.ts
  scripts/
    deploy-jetton-testnet.ts
    mint-test-vtx.ts
    check-jetton-stats.ts
```

## Источник паттерна

Скрипты адаптированы из ECU `ECU_PRODUCTION_STAGING`:

- `scripts/deploy-jetton-final.ts`
- `scripts/mint-test-ecu.ts`
- `scripts/check-jetton-stats.ts`

ECU addresses, metadata URL и private values **не копировались**.
