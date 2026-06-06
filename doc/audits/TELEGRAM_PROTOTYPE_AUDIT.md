Статус: аудит + план внедрения (без изменений кода)
Проект: Voltix Wheel
Дата: 2026-05-27
Назначение: подготовить основу для технического прототипа Telegram Mini App / WebApp с механикой горизонтального ротора

Production URL: https://voltix-wheel.vercel.app

---

# Voltix Wheel — Telegram Mini App Prototype Audit

## 1. Краткий вывод

Сейчас репозиторий **Voltix Wheel** — это **готовый marketing landing** на Next.js 16, а **не игровое приложение**.

- Есть сильный визуальный макет главного экрана в виде **PNG-мокапа**.
- Нет интерактивного gameplay UI, нет физики ротора, нет Telegram WebApp-интеграции.
- Для прототипа нужен **отдельный изолированный маршрут**, чтобы не ломать лендинг.

Рекомендация: добавить **`/prototype`** (или `/play`) как client-only экран с фоном `General_page.png`, CSS/SVG-ротором, swipe-физикой и debug HUD.

---

## 2. Текущая структура проекта

```
VOLTIX WHEEL/
├── app/
│   ├── layout.tsx          # root layout, metadata, fonts, global styles
│   ├── page.tsx            # единственная страница → LandingPage
│   └── globals.css         # design tokens, glass-card, glow, gradients
├── components/
│   ├── landing-page.tsx    # весь лендинг (hero, sections, footer)
│   ├── brands-accordion.tsx
│   ├── language-provider.tsx
│   ├── language-switcher.tsx
│   └── image-lightbox.tsx
├── lib/
│   └── i18n/translations.ts
├── public/images/
│   ├── General_page.png        # главный game UI mock
│   ├── Other_General_page.png  # второй game screen mock
│   ├── General_Hero.png        # character sheet (не hero)
│   ├── Other_heroes.png
│   └── team/                   # avatars
├── reports/                    # audit / strategy reports
├── VOLTIX_WHEEL_PRIMARY_GAME_CONCEPT.md
├── VOLTIX_WHEEL_PRODUCT_PLACEMENT_STRATEGY.md
├── VOLTIX_WHEEL_LANDING_COPY.md
└── package.json
```

### Стек

| Слой | Технология |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| UI | React 19 + TypeScript |
| Styles | Tailwind CSS v4 |
| Deploy | Vercel |
| Game libs | **нет** |
| Telegram SDK | **нет** |
| Backend / DB | **нет** |

### Маршруты

| Route | Назначение |
|---|---|
| `/` | Marketing landing |
| `/prototype` | **не существует** |
| API routes | **нет** |

---

## 3. Главный экран / главная картинка игры

### Главный визуальный макет

**Primary asset:** `public/images/General_page.png`

- Полноэкранный mobile game UI mock (9:16 mood).
- Показывает: Voltix Reactor, reactor wheel, VW Token Printer, Daily Reward Pool, SPIN UI, sponsor placements.
- Используется на лендинге в **hero** (desktop + mobile) — это **лучший и единственный полноценный макет главного экрана**.

**Secondary assets:**

| File | Содержание | Где используется |
|---|---|---|
| `Other_General_page.png` | Альтернативный/доп. game screen | showcase, printer section |
| `General_Hero.png` | Character exploration sheet | **не используется** (ранее был в hero, заменён) |
| `Other_heroes.png` | Доп. персонажи | **не используется** |

### Где «главный экран» в коде

**Нигде как интерактивный экран.**  
`General_page.png` — только статичная картинка через компонент `GameScreenshot` в `components/landing-page.tsx`.

Концептуально главный экран описан в `VOLTIX_WHEEL_PRIMARY_GAME_CONCEPT.md` как **Home / Voltix Reactor**, но в коде не реализован.

---

## 4. Где сейчас игровой UI

Весь текущий UI — **маркетинговый лендинг**:

| Секция | ID | Тип |
|---|---|---|
| Hero | `#hero` | Static image + copy |
| How it works | `#how-it-works` | Text cards |
| Showcase | `#showcase` | Static screenshot |
| VW Token Printer | `#printer` | Static screenshot + copy |
| Daily Reward Pool | `#rewards` | **Mock UI panel** (статичный HTML, не live) |
| Gameplay | `#gameplay` | Text cards |
| For Brands | `#brands` | Accordion |
| Team | `#team` | Cards |
| Roadmap | `#footer` | List |

**Единственный «игровоподобный» UI** — статичная mock-панель Daily Reward Pool (`250,000 VW`, progress bar, timer `07:45:32`). Это декоративный блок лендинга, не game logic.

**Интерактивность в проекте:**

- EN/RU language switcher (`language-provider.tsx`)
- Image lightbox для hero / team avatars (`image-lightbox.tsx`)
- Anchor navigation

**Нет:** swipe, canvas, game loop, physics, rotor animation, energy simulation.

---

## 5. Telegram WebApp / Mini App — заготовки

### Результат проверки: **заготовок нет**

| Проверка | Статус |
|---|---|
| `@twa-dev/sdk` / Telegram WebApp JS | ❌ не установлен |
| `Telegram.WebApp` init | ❌ нет |
| viewport / safe-area meta для TWA | ❌ нет |
| отдельный route под mini app | ❌ нет |
| deep link / bot integration | ❌ нет |
| haptic feedback | ❌ нет |

Единственное упоминание Telegram — в `VOLTIX_WHEEL_PRIMARY_GAME_CONCEPT.md` как возможная платформа (open question), без реализации.

**Вывод:** прототип можно начать как **mobile-first Web screen**, совместимый с Telegram iframe, без SDK на первом этапе.

---

## 6. Компоненты и assets, пригодные для прототипа

### Можно переиспользовать

| Элемент | Где | Как использовать |
|---|---|---|
| `General_page.png` | `public/images/` | Фон главного экрана прототипа |
| Color tokens | `globals.css` | `#070d1a`, cyan, amber, glass-card |
| `.glass-card`, `.glow-blue`, `.glow-gold` | `globals.css` | HUD panels (speed, energy, coins) |
| `LanguageProvider` pattern | `components/` | Опционально EN/RU для HUD позже |
| Next.js `Image` | уже в проекте | Фон (static) |
| Vercel deploy | infra | Preview URL для теста в Telegram |

### Нельзя переиспользовать напрямую

| Элемент | Причина |
|---|---|
| `LandingPage` | Монолит лендинга, не game screen |
| `GameScreenshot` | Только static frame + glow, без interaction layer |
| Daily Reward Pool mock | Hardcoded статика, не связана с симуляцией |
| `brands-accordion`, team, roadmap | Marketing only |

### Нужно создать с нуля

- Route `/prototype`
- Rotor component (horizontal flywheel)
- Swipe zone (right → left)
- Physics loop (velocity, inertia, friction)
- Energy flow calculator
- Coin printer accumulator
- Reset button
- Debug HUD

---

## 7. Текущее состояние проекта (summary)

**Что уже есть:**

1. Production-ready landing на Vercel.
2. Bilingual EN/RU infrastructure.
3. Product / placement strategy docs.
4. Primary game concept doc.
5. Качественный PNG-мокап главного экрана (`General_page.png`).
6. Design system (dark blue / electric gold / glass).

**Чего нет:**

1. Игрового приложения / gameplay code.
2. Telegram Mini App integration.
3. Rotor mechanics / physics.
4. Отдельного mobile game route.
5. Game state management.
6. Backend, wallet, token economy (и не требуется для прототипа).

**Риск для внедрения:** низкий, если прототип изолировать в отдельном route и не трогать `/`.

---

## 8. План внедрения технического прототипа

> Принцип: **минимальный diff, изолированный route, без ломки лендинга.**

### Phase 0 — Подготовка (перед кодом)

- [x] Аудит (этот документ)
- [ ] Подтверждение Яна на route name: **`/prototype`** (рекомендуется)
- [ ] Подтверждение: использовать **`General_page.png`** как фон первой версии

### Phase 1 — Изолированный прототип-экран (P0)

**Цель:** один mobile screen с работающей механикой ротора.

**Новые файлы (предложение):**

```
app/prototype/page.tsx              # route entry, metadata noindex
app/prototype/layout.tsx            # optional: mobile viewport lock
components/prototype/
  rotor-prototype-screen.tsx        # main client screen
  horizontal-rotor.tsx              # visual rotor + rotation transform
  swipe-zone.tsx                    # touch area R→L
  prototype-hud.tsx                 # speed, energy, coins, reset
lib/prototype/
  rotor-physics.ts                  # pure functions: impulse, friction, integrate
  use-rotor-simulation.ts           # rAF loop hook
```

**Не трогать:**

- `app/page.tsx`
- `components/landing-page.tsx`
- `lib/i18n/translations.ts` (можно позже)

#### Visual layer

1. Full-viewport mobile container (`max-w-md mx-auto`, `100dvh`).
2. Background: `General_page.png` (`object-cover` / `object-contain` — протестировать crop).
3. Поверх фона — **стилизованный горизонтальный ротор**:
   - Phase 1: CSS/SVG ring + gradient + tick marks (не финальный art).
   - Позиция: overlay в зоне wheel на мокапе (approximate coordinates).
4. Swipe zone — полупрозрачная debug-область (можно скрыть позже).

#### Interaction / physics

```
swipe right→left → angularVelocity += impulse * swipeSpeed
each frame:
  angle += angularVelocity * dt
  if no recent swipe: angularVelocity *= frictionFactor (e.g. 0.985)
  if |angularVelocity| < threshold: stop
```

**Параметры (tunable constants):**

- `IMPULSE_SCALE` — чувствительность свайпа
- `FRICTION` — замедление (0.98–0.995)
- `MIN_VELOCITY` — порог остановки
- `MAX_VELOCITY` — cap

#### Energy + printer logic

```
energyFlow = clamp(|angularVelocity| / MAX_VELOCITY, 0, 1)
if energyFlow > 0:
  printedCoins += energyFlow * PRINT_RATE * dt
else:
  printedCoins unchanged
```

**HUD (debug):**

- Rotor speed (rad/s or RPM display)
- Energy flow (0–100%)
- Printed coins (integer/float)
- **Reset** → angle=0, velocity=0, coins=0, energy=0

#### Tech choices

| Задача | Решение |
|---|---|
| Animation loop | `requestAnimationFrame` |
| Touch | native `touchstart/touchmove/touchend` + mouse fallback for desktop test |
| State | `useRef` for physics + `useState` throttled for HUD |
| Libraries | **none** (no matter.js, no framer-motion required) |

### Phase 2 — Telegram-friendly shell (P1, после P0)

Без backend, только совместимость:

1. Add viewport meta / `viewportFit=cover` in prototype layout.
2. Optional: `@twa-dev/sdk` — expand viewport, theme sync, haptic on strong swipe.
3. Test open in Telegram WebApp iframe via bot menu button URL → `https://voltix-wheel.vercel.app/prototype`

### Phase 3 — Visual polish (P2, optional)

- Replace CSS rotor with cropped wheel art from mockup.
- Energy cable glow animation tied to `energyFlow`.
- Printer slot glow when coins increment.
- Hide debug swipe zone.

### Phase 4 — Not in prototype scope

- ❌ Kotlin / native app
- ❌ Google Play
- ❌ Wallet / token / backend
- ❌ User registration
- ❌ Real economy
- ❌ Final UI design

---

## 9. Риски и митигация

| Риск | Митигация |
|---|---|
| Сломать лендинг | Отдельный route `/prototype`, zero changes to `/` |
| Rotor не совпадёт с wheel на PNG | Phase 1 — abstract overlay; Phase 2 — coordinate tuning |
| Desktop test vs mobile swipe | Mouse drag fallback + Chrome mobile emulation |
| Telegram iframe scroll / bounce | `overflow-hidden`, `touch-action: none` on prototype root |
| Performance on low-end phones | CSS transform only (`rotate`), no canvas initially |

---

## 10. Acceptance criteria для P0 прототипа

- [ ] Открывается `/prototype` на mobile width
- [ ] Виден фон `General_page.png`
- [ ] Виден стилизованный горизонтальный ротор
- [ ] Swipe R→L добавляет импульс
- [ ] Повторные свайпы ускоряют
- [ ] После отпускания — инерция + постепенная остановка
- [ ] HUD показывает speed / energy flow / printed coins
- [ ] Reset сбрасывает состояние
- [ ] Лендинг `/` не изменён
- [ ] `npm run lint && npm run build` проходят

---

## 11. Рекомендуемый порядок работ (после подтверждения)

1. Create branch `feature/rotor-prototype`
2. Add `/prototype` route + isolated components
3. Implement physics hook + HUD
4. Test on mobile + Vercel preview
5. Optional: Telegram iframe smoke test
6. Report back to Ян with preview URL

**Estimated scope:** 1 focused commit for P0 skeleton; 1–2 commits for polish.

---

## 12. Связанные документы

- `VOLTIX_WHEEL_PRIMARY_GAME_CONCEPT.md` — Voltix Reactor, game loop, main screen concept
- `VOLTIX_WHEEL_PRODUCT_PLACEMENT_STRATEGY.md` — sponsor placements on main screen
- `reports/VOLTIX_WHEEL_LIVE_LANDING_AUDIT_STAGE_2.md` — hero asset notes (`General_page.png`)

---

*Документ подготовлен без изменений в коде. Следующий шаг — подтверждение плана и реализация Phase 1.*
