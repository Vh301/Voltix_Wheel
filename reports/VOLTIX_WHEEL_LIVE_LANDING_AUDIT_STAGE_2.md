# Voltix Wheel — Live Landing Audit Stage 2

## Context

- Branch: `main`
- HEAD: `165d168 Add Vercel-ready Next.js landing page`
- Vercel project: `voltix-wheel` (`301-s-projects`)
- Production URL: https://voltix-wheel.vercel.app
- Deployment status: ● Ready (`dpl_AGQXLWMycVeGypiBR57sEtBxQDyf`)
- Audit date: 2026-05-26

## Summary

Лендинг **технически рабочий и structurally complete**: все секции на месте, деплой стабилен, runtime чистый. Но для продукта уровня Voltix Wheel он **требует polish (Stage 3)**, прежде всего в hero и визуальной подаче.

Главная проблема: **в hero используется не тот asset**. Сейчас показывается character exploration sheet (`General_Hero.png`) с белым фоном, а не главный игровой экран с колесом, реактором и VW Token Printer (`General_page.png`). Из-за этого первый экран выглядит как design doc, а не как игра.

**Вердикт:** готов как MVP-каркас → **требует targeted polish**, не полной переработки.

---

## Technical status

- Site opens: **yes**
- Deployment ready: **yes**
- Images loaded: **yes** (`General_Hero.png`, `General_page.png` → HTTP 200 via `/_next/image`)
- Runtime errors: **none** (browser console: 0 errors, 0 warnings)
- Console issues: **none observed**

---

## Desktop review

### Что хорошо

- Сайт открывается без Vercel error / 404 / дефолтного create-next-app.
- Все 9 блоков присутствуют: Header, Hero, How it works, VW Token Printer, Daily Reward Pool, Boosts/Tasks/Friends, Native Ads, Roadmap, Footer.
- Канон `Voltix → Wheel → Energy → Reactor → VW Token Printer → Rewards` читается в hero.
- Цветовая база (dark blue + cyan + gold) соответствует game/reactor mood.
- Типографическая иерархия в hero понятная: badge → title → subtitle → description → CTA.
- VW Token Printer section использует сильный visual (`General_page.png`) — это лучший asset на странице.
- Sticky header, readable nav, responsive grid для cards.

### Проблемы

- **Hero image — wrong asset:** `General_Hero.png` = 4 character variants on white background, not the gameplay scene. Ломает immersion и «вау».
- **White background clash:** hero image резко контрастирует с тёмной темой страницы.
- **Hero не продаёт gameplay:** на первом экране не видны reactor wheel, Voltix Reactor, VW Token Printer, SPIN UI — они есть только ниже по странице.
- **Секции после hero однообразны:** много text-only cards, мало игровых visuals.
- **Other_General_page.png** спрятан внизу gameplay-блока в маленьком `max-w-md` контейнере — теряется impact.
- **Other_heroes.png** не используется вообще.
- CTA `SPIN THE WHEEL` / `Explore gameplay` — только anchor scroll, без ощущения action.
- Страница длинная; визуальный ритм падает после hero + printer block.

---

## Mobile review

### Что хорошо

- Layout не ломается, горизонтального scroll нет.
- CTA `SPIN THE WHEEL` крупный, thumb-friendly.
- Текст читаемый, stacking корректный.
- Header compact: logo + SPIN button.

### Проблемы

- **Hero visual ниже текста** — пользователь сначала читает абзац, только потом видит картинку.
- Character sheet на mobile ещё менее читаем (мелкие labels Variant A/B/C/D).
- Белый фон hero image на mobile особенно бросается в глаза.
- Длинная вертикальная лента text-cards утомляет без промежуточных visuals.
- Gameplay image (`Other_General_page.png`) слишком маленький для mobile hero substitute.

---

## Hero review

### Что хорошо

- Copy сильный: «Run the wheel. Charge the world.»
- Badge «Mobile energy game powered by VW rewards» задаёт контекст.
- Primary/secondary CTA визуально различимы.
- Canon chain внизу hero — правильная product logic.

### Проблемы

- Не тот visual asset (character sheet вместо game screen).
- Нет эмоционального game-first «вау» — скорее concept presentation.
- Voltix виден, но как reference sheet, не как running hero in wheel.
- VW Token Printer на первом экране не виден.
- Ощущение ближе к crypto/Web3 landing из-за badge «VW rewards» + earn copy в description.

### Рекомендации

- **P0:** заменить hero image на `General_page.png` (full game UI with wheel, reactor, printer, spin button).
- Добавить dark gradient frame / masked edges вокруг screenshot, убрать резкий white box.
- Укоротить hero description на 1–2 строки; gameplay details — ниже.
- Рассмотреть mobile order: image выше или сразу под subtitle.
- CTA primary можно якорить на `#how-it-works` или будущий waitlist — но визуально усилить button glow.

---

## Gameplay clarity

| Concept | Понятно? | Comment |
|---------|----------|---------|
| Voltix | Partial | Виден в hero sheet, но не как active runner |
| Wheel | Weak in hero | Ясно из copy и How it works, не из hero visual |
| Energy | Text only | Нет visual energy bar / power metaphor above fold |
| Reactor | Weak in hero | Появляется только в General_page lower on page |
| VW Token Printer | Medium | Strong in dedicated section, weak in first impression |
| Rewards | Medium | Daily Reward Pool explained, but sounds earn-first |

**Общая оценка:** текст объясняет loop, но **visual storytelling отстаёт**. Пользователь без текста не поймёт игру с первого экрана.

---

## VW Token Printer review

### Что хорошо

- Отдельная секция с правильным заголовком и сильным copy.
- `General_page.png` идеально показывает printer, coins, reactor, daily pool UI.
- Bullets точные и product-correct.

### Проблемы

- Этот asset логичнее в hero, а не только в mid-page section.
- Section дублирует то, что должно быть главным первым впечатлением.
- Нет callout на golden coins / printer motion (static image only — ok for Stage 1).

### Как усилить

- Перенести или продублировать key visual выше.
- Добавить подпись/caption: «Spin → Energy → Reactor → Printer → VW coins».
- Crop hero area around printer + coin output для secondary visual.

---

## Daily Reward Pool review

### Что хорошо

- Секция есть, copy понятный.
- 6 cards покрывают sources of contribution.

### Проблемы

- Cards = plain text labels, visually flat.
- «Sponsor-powered rewards» + «unlock more ways to earn» звучит earn-first.
- Нет visual tie-in к UI element «250,000 / Resets in» из game mockup.
- Не видно, что pool shared/community-driven.

### Как усилить

- Добавить mock UI card (inspired by game screenshot).
- Переформулировать copy: activity → contribution → shared pool → daily claim.
- Иконки или mini-stats placeholders для cards.

---

## Native Ads section review

### Что хорошо

- Copy правильный по intent: placements inside game world, not banners.
- Примеры (drink, monitor, poster, badge) совпадают с concept.

### Проблемы

- **Нет visual proof** — хотя `General_page.png` уже содержит Coke + Mercedes placements.
- 6 text cards feel B2B/platform, not player-facing.
- Секция стоит high on page for consumer landing — может отвлекать от fun.
- «Rewarded ads» card может пугать casual player.

### Как сделать аккуратнее

- Добавить cropped visual from game mockup showing native placements.
- Split tone: player sees «sponsor moments», brands see «partnership options» (footer/B2B subsection later).
- Переместить ниже Roadmap или сделать collapsible «For brands».
- Убрать/переименовать «Rewarded ads» → «Optional sponsor boosts» для player tone.

---

## Priority fixes for Stage 3

### P0 — обязательно перед дальнейшим движением

1. **Swap hero image:** `General_Hero.png` → `General_page.png` (or dedicated hero crop from game UI).
2. **Fix white background clash** — dark frame, gradient mask, or processed asset.
3. **Mobile hero order** — visual earlier, less text before first impression.
4. **Shorten hero description** — game-first, not earn-first.

### P1 — желательно для сильного лендинга

5. Enlarge / reposition `Other_General_page.png` in gameplay section (full-width showcase).
6. Add icons or mini-visuals to How it works cards (5-step chain).
7. Daily Reward Pool — mock UI panel instead of plain text cards.
8. Native Ads — add screenshot crop with Coke/Mercedes; move or retitle for B2B.
9. Use `Other_heroes.png` for character/team section or hero secondary visual.
10. Strengthen section rhythm: alternate text/visual blocks, reduce card monotony.
11. Soften early token language: badge «VW rewards» → «mobile energy game» first.

### P2 — можно позже

12. Light motion: glow pulse on SPIN CTA, subtle hero parallax.
13. Waitlist / coming soon modal for CTA.
14. Open Graph / social preview image.
15. Custom domain, analytics, Speed Insights.
16. Footer: separate «For brands» link vs player nav.

---

## Do not touch yet

- wallet
- backend
- token mechanics
- env
- database
- domain
- analytics
- ECU projects

---

## Recommended Stage 3 scope

Один focused commit «Landing polish — hero & visual hierarchy»:

1. Hero → `General_page.png` + dark treatment + shorter copy.
2. Mobile layout: image priority above fold.
3. How it works → add step icons or numbered visual strip.
4. Daily Reward Pool → mock pool UI block.
5. Gameplay section → full-width `Other_General_page.png`.
6. Native Ads → add game screenshot crop; optional move below Roadmap.
7. Copy pass: game/fun first, earn/token second.

Estimated impact: transforms landing from **MVP wireframe** to **credible game product page** without backend work.
