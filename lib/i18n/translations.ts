export type Locale = "en" | "ru";

export type Translation = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    gameplay: string;
    rewards: string;
    team: string;
    roadmap: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  canon: Array<{ label: string; highlight: boolean }>;
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  showcase: {
    title: string;
    subtitle: string;
    imageAlt: string;
  };
  printer: {
    title: string;
    titleHighlight: string;
    description: string;
    caption: string;
    bullets: string[];
    imageAlt: string;
  };
  rewards: {
    title: string;
    subtitle: string;
    panelLabel: string;
    resetsIn: string;
    contribution: string;
    stats: Array<{ label: string; value: string }>;
  };
  gameplay: {
    title: string;
    cards: Array<{ title: string; description: string }>;
  };
  roadmap: {
    title: string;
    phases: string[];
  };
  brands: {
    title: string;
    subtitle: string;
    formula: string;
    disclaimer: string;
    panels: {
      howItWorks: {
        title: string;
        summary: string;
        levels: Array<{ name: string; description: string; formats: string[] }>;
      };
      spots: {
        title: string;
        summary: string;
        items: string[];
      };
      categories: {
        title: string;
        summary: string;
        items: string[];
      };
      rules: {
        title: string;
        summary: string;
        allowedLabel: string;
        notAllowedLabel: string;
        allowed: string[];
        notAllowed: string[];
      };
      packages: {
        title: string;
        summary: string;
        items: Array<{ id: string; name: string; description: string }>;
      };
    };
  };
  team: {
    title: string;
    subtitle: string;
    members: Array<{
      id: string;
      name: string;
      position: string;
      role: string;
      description: string;
      avatar: string;
    }>;
  };
  footer: {
    tagline: string;
  };
  language: {
    en: string;
    ru: string;
    switchLabel: string;
  };
};

export const translations: Record<Locale, Translation> = {
  en: {
    meta: {
      title: "Voltix Wheel — Run the wheel. Charge the world.",
      description:
        "Power the Voltix Reactor, spin the generator wheel, and activate the VW Token Printer. A reactor-powered mobile game.",
    },
    nav: {
      gameplay: "Gameplay",
      rewards: "Rewards",
      team: "Team",
      roadmap: "Roadmap",
    },
    hero: {
      badge: "A reactor-powered mobile game",
      title: "Voltix Wheel",
      subtitle: "Run the wheel. Charge the world.",
      description:
        "Power the Voltix Reactor by running the wheel, generating energy, and activating the VW Token Printer. Complete tasks, use boosts, invite friends, and join the daily reward pool.",
      ctaPrimary: "SPIN THE WHEEL",
      ctaSecondary: "Explore gameplay",
      imageAlt:
        "Voltix Wheel gameplay — reactor wheel, VW Token Printer, and daily rewards",
    },
    canon: [
      { label: "Voltix", highlight: false },
      { label: "Wheel", highlight: false },
      { label: "Energy", highlight: false },
      { label: "Reactor", highlight: false },
      { label: "VW Token Printer", highlight: true },
      { label: "Rewards", highlight: false },
    ],
    howItWorks: {
      title: "How it works",
      subtitle:
        "From wheel spin to golden rewards — every action powers the reactor chain.",
      steps: [
        {
          step: "01",
          icon: "◎",
          title: "Run the Wheel",
          description:
            "Voltix runs inside the reactor wheel and turns motion into energy.",
        },
        {
          step: "02",
          icon: "⚡",
          title: "Generate Energy",
          description:
            "Every spin charges your Energy Power and boosts your progress.",
        },
        {
          step: "03",
          icon: "◉",
          title: "Power the Reactor",
          description:
            "Energy flows into the Voltix Reactor through glowing cables and machinery.",
        },
        {
          step: "04",
          icon: "VW",
          title: "Print VW",
          description:
            "The VW Token Printer converts reactor power into shiny VW rewards.",
        },
        {
          step: "05",
          icon: "★",
          title: "Claim Rewards",
          description:
            "Join the Daily Reward Pool, open bonuses, and grow your progress every day.",
        },
      ],
    },
    showcase: {
      title: "The full gameplay loop lives inside the Voltix Reactor",
      subtitle:
        "Spin the wheel, charge energy, power the reactor, and watch the reward system come alive.",
      imageAlt:
        "Full Voltix Reactor gameplay loop with wheel, energy, and VW Token Printer",
    },
    printer: {
      title: "The coolest part of the reactor: the ",
      titleHighlight: "VW Token Printer",
      description:
        "The VW Token Printer is the visual heart of Voltix Wheel. The more energy you generate, the harder the reactor works — and the more exciting it feels when golden VW coins roll out of the machine.",
      caption: "Spin → Energy → Reactor → Printer → VW coins",
      bullets: [
        "Energy-driven reward machine",
        "Visible VW coin printing",
        "Clear link between gameplay and rewards",
        "Core visual symbol of the game",
      ],
      imageAlt: "VW Token Printer printing golden VW coins",
    },
    rewards: {
      title: "Daily Reward Pool",
      subtitle:
        "Every day, active players help charge the shared game reward pool. Your spins, tasks, boosts, and team activity increase your contribution.",
      panelLabel: "Daily Reward Pool",
      resetsIn: "Resets in",
      contribution: "Your contribution: Energy + Tasks + Boosts + Friends",
      stats: [
        { label: "Spin activity", value: "+Energy" },
        { label: "Daily tasks", value: "+Bonus" },
        { label: "Boost usage", value: "+Power" },
        { label: "Friend invites", value: "+Team" },
      ],
    },
    gameplay: {
      title: "More ways to charge your reactor",
      cards: [
        {
          title: "Boosts",
          description:
            "Speed up the wheel, increase energy, and power up the reactor.",
        },
        {
          title: "Tasks",
          description: "Complete daily missions and collect extra bonuses.",
        },
        {
          title: "Friends",
          description: "Invite your team and grow your shared energy network.",
        },
      ],
    },
    roadmap: {
      title: "Roadmap",
      phases: [
        "Phase 1 — Landing and visual identity",
        "Phase 2 — Playable prototype",
        "Phase 3 — Tasks, boosts, and reward logic",
        "Phase 4 — Referral system and daily reward pool",
        "Phase 5 — VW token integration",
        "Phase 6 — Brand sponsorship marketplace",
      ],
    },
    brands: {
      title: "For Brands",
      subtitle:
        "Voltix Wheel does not sell ad space. It offers sponsor presence inside the Voltix Reactor world.",
      formula: "Brand → Game object → Player action → Reward",
      disclaimer:
        "Concept only. Placeholder sponsors. No partnership implied.",
      panels: {
        howItWorks: {
          title: "How integration works",
          summary: "Three levels — from in-world props to sponsored systems.",
          levels: [
            {
              name: "Level 1 — Native Props",
              description:
                "The brand appears as a physical object inside the reactor workshop.",
              formats: ["Product placement", "Brand props"],
            },
            {
              name: "Level 2 — Optional Sponsor Moments",
              description:
                "The player chooses to engage — no forced viewing, no popups.",
              formats: ["Optional sponsor boosts"],
            },
            {
              name: "Level 3 — Sponsored Systems",
              description:
                "The brand supports a game system, event, or equipment layer.",
              formats: [
                "Sponsored events",
                "Native equipment skins",
                "Daily pool sponsorships",
              ],
            },
          ],
        },
        spots: {
          title: "Sponsor spots",
          summary: "Seven natural placement points inside Voltix Reactor.",
          items: [
            "Cooling Station — drink, fridge badge, temperature display",
            "Reactor Control Monitor — status screen, diagnostics",
            "Workshop Wall Poster — performance / seasonal poster",
            "VW Token Printer Badge — manufacturer plate on the machine",
            "Battery / Energy Module — power cell branding",
            "Daily Reward Pool Panel — today's pool charged by sponsor",
            "Boost / Task Card — optional sponsor boost or challenge",
          ],
        },
        categories: {
          title: "Good fit categories",
          summary: "Brand categories that fit the reactor world naturally.",
          items: [
            "Drinks / Energy / Water",
            "Appliances / Cooling / Home Tech",
            "Electronics / Displays / Monitors",
            "Automotive / Speed / Performance",
            "Hardware / Tools / Batteries",
          ],
        },
        rules: {
          title: "Rules",
          summary: "What we build — and what we avoid.",
          allowedLabel: "We do",
          notAllowedLabel: "We don't",
          allowed: [
            "In-world props and equipment",
            "Optional sponsor boosts",
            "Sponsored reward pool",
            "Branded cosmetic skins",
            "Screens inside machinery",
          ],
          notAllowed: [
            "Banner ads over the game",
            "Popups blocking gameplay",
            "Forced ad watching",
            "Huge logos covering the screen",
            "Misleading earn-money promises",
          ],
        },
        packages: {
          title: "Packages",
          summary: "Five sponsor formats for partners.",
          items: [
            {
              id: "A",
              name: "Native Prop Placement",
              description: "Small sponsor object in the game environment.",
            },
            {
              id: "B",
              name: "Sponsored Boost",
              description: "Optional energy or gameplay boost from a sponsor.",
            },
            {
              id: "C",
              name: "Sponsored Daily Pool",
              description: "Brand supports the shared daily reward pool.",
            },
            {
              id: "D",
              name: "Sponsor Challenge / Event",
              description: "Limited-time mission or reactor event.",
            },
            {
              id: "E",
              name: "Premium Equipment Skin",
              description: "Branded fridge, monitor, printer, or reactor panel.",
            },
          ],
        },
      },
    },
    team: {
      title: "The Team Behind Voltix Wheel",
      subtitle: "Meet the core Voltix Wheel team",
      members: [
        {
          id: "atlas",
          name: "Atlas",
          position: "Team Lead",
          role: "Product & Technical Direction",
          description:
            "Leads the project roadmap, technical priorities, and product execution. Responsible for keeping Voltix Wheel focused, consistent, and ready for launch.",
          avatar: "/images/team/atlas.png",
        },
        {
          id: "torque",
          name: "Torque",
          position: "Gameplay Developer",
          role: "Core Game Mechanics",
          description:
            "Builds the gameplay loop: wheel spins, energy generation, boost systems, progression, and reward flow.",
          avatar: "/images/team/torque.png",
        },
        {
          id: "lumen",
          name: "Lumen",
          position: "Frontend & UX Developer",
          role: "Interface, Landing & User Experience",
          description:
            "Shapes the player-facing side of the project: landing page, app screens, interface logic, onboarding, and visual flow.",
          avatar: "/images/team/lumen.png",
        },
        {
          id: "nexus",
          name: "Nexus",
          position: "Systems Developer",
          role: "Backend Logic & Integrations",
          description:
            "Handles backend logic, data flow, integrations, reward calculations, and the technical foundation behind the product.",
          avatar: "/images/team/nexus.png",
        },
      ],
    },
    footer: {
      tagline: "Voltix Wheel — Run the wheel. Charge the world.",
    },
    language: {
      en: "EN",
      ru: "RU",
      switchLabel: "Language",
    },
  },
  ru: {
    meta: {
      title: "Voltix Wheel — Крути колесо. Заряжай мир.",
      description:
        "Заряжай Voltix Reactor, крути генераторное колесо и запускай VW Token Printer. Мобильная игра на энергии реактора.",
    },
    nav: {
      gameplay: "Геймплей",
      rewards: "Награды",
      team: "Команда",
      roadmap: "План",
    },
    hero: {
      badge: "Мобильная игра на энергии реактора",
      title: "Voltix Wheel",
      subtitle: "Крути колесо. Заряжай мир.",
      description:
        "Заряжай Voltix Reactor: крути колесо, генерируй энергию и активируй VW Token Printer. Выполняй задания, используй бусты, приглашай друзей и участвуй в ежедневном пуле наград.",
      ctaPrimary: "КРУТИ КОЛЕСО",
      ctaSecondary: "Изучить геймплей",
      imageAlt:
        "Геймплей Voltix Wheel — реакторное колесо, VW Token Printer и ежедневные награды",
    },
    canon: [
      { label: "Voltix", highlight: false },
      { label: "Колесо", highlight: false },
      { label: "Энергия", highlight: false },
      { label: "Реактор", highlight: false },
      { label: "VW Token Printer", highlight: true },
      { label: "Награды", highlight: false },
    ],
    howItWorks: {
      title: "Как это работает",
      subtitle:
        "От вращения колеса до золотых наград — каждое действие питает цепочку реактора.",
      steps: [
        {
          step: "01",
          icon: "◎",
          title: "Крути колесо",
          description:
            "Voltix бежит внутри реакторного колеса и превращает движение в энергию.",
        },
        {
          step: "02",
          icon: "⚡",
          title: "Генерируй энергию",
          description:
            "Каждый запуск заряжает Energy Power и ускоряет твой прогресс.",
        },
        {
          step: "03",
          icon: "◉",
          title: "Заряжай реактор",
          description:
            "Энергия поступает в Voltix Reactor через светящиеся кабели и механизмы.",
        },
        {
          step: "04",
          icon: "VW",
          title: "Печатай VW",
          description:
            "VW Token Printer превращает мощность реактора в блестящие VW-награды.",
        },
        {
          step: "05",
          icon: "★",
          title: "Забирай награды",
          description:
            "Участвуй в Daily Reward Pool, открывай бонусы и развивай прогресс каждый день.",
        },
      ],
    },
    showcase: {
      title: "Весь игровой цикл живёт внутри Voltix Reactor",
      subtitle:
        "Крути колесо, заряжай энергию, питай реактор и смотри, как оживает система наград.",
      imageAlt:
        "Полный игровой цикл Voltix Reactor — колесо, энергия и VW Token Printer",
    },
    printer: {
      title: "Самая крутая часть реактора: ",
      titleHighlight: "VW Token Printer",
      description:
        "VW Token Printer — визуальное сердце Voltix Wheel. Чем больше энергии ты генерируешь, тем мощнее работает реактор — и тем зрелищнее, когда золотые VW-монеты выкатываются из машины.",
      caption: "Крути → Энергия → Реактор → Принтер → VW-монеты",
      bullets: [
        "Машина наград, работающая на энергии",
        "Видимая печать VW-монет",
        "Понятная связь между геймплеем и наградами",
        "Главный визуальный символ игры",
      ],
      imageAlt: "VW Token Printer печатает золотые VW-монеты",
    },
    rewards: {
      title: "Daily Reward Pool",
      subtitle:
        "Каждый день активные игроки заряжают общий игровой пул наград. Твои спины, задания, бусты и активность команды увеличивают вклад.",
      panelLabel: "Daily Reward Pool",
      resetsIn: "Сброс через",
      contribution: "Твой вклад: Энергия + Задания + Бусты + Друзья",
      stats: [
        { label: "Активность спинов", value: "+Энергия" },
        { label: "Ежедневные задания", value: "+Бонус" },
        { label: "Использование бустов", value: "+Мощность" },
        { label: "Приглашения друзей", value: "+Команда" },
      ],
    },
    gameplay: {
      title: "Больше способов зарядить реактор",
      cards: [
        {
          title: "Бусты",
          description:
            "Ускоряй колесо, увеличивай энергию и усиливай реактор.",
        },
        {
          title: "Задания",
          description: "Выполняй ежедневные миссии и собирай дополнительные бонусы.",
        },
        {
          title: "Друзья",
          description:
            "Приглашай команду и развивай общую энергетическую сеть.",
        },
      ],
    },
    roadmap: {
      title: "Дорожная карта",
      phases: [
        "Фаза 1 — Лендинг и визуальная идентичность",
        "Фаза 2 — Играбельный прототип",
        "Фаза 3 — Задания, бусты и логика наград",
        "Фаза 4 — Реферальная система и daily reward pool",
        "Фаза 5 — Интеграция VW-токена",
        "Фаза 6 — Маркетплейс брендовых спонсорств",
      ],
    },
    brands: {
      title: "Для брендов",
      subtitle:
        "Voltix Wheel продаёт не рекламные места, а присутствие бренда внутри игрового мира Voltix Reactor.",
      formula: "Бренд → Игровой объект → Действие игрока → Награда",
      disclaimer:
        "Только концепт. Спонсоры-заглушки. Партнёрство не подразумевается.",
      panels: {
        howItWorks: {
          title: "Как это работает",
          summary: "Три уровня — от объектов в мире до спонсорских систем.",
          levels: [
            {
              name: "Уровень 1 — Нативные объекты",
              description:
                "Бренд появляется как физический объект внутри реакторной мастерской.",
              formats: ["Размещение продукта", "Брендовые объекты"],
            },
            {
              name: "Уровень 2 — Опциональные спонсорские моменты",
              description:
                "Игрок сам решает участвовать — без принудительного просмотра и всплывающих окон.",
              formats: ["Опциональные спонсорские бусты"],
            },
            {
              name: "Уровень 3 — Спонсорские игровые системы",
              description:
                "Бренд поддерживает игровую систему, событие или слой оборудования.",
              formats: [
                "Спонсорские события",
                "Нативные скины оборудования",
                "Спонсорство ежедневного пула",
              ],
            },
          ],
        },
        spots: {
          title: "Точки размещения",
          summary: "Семь естественных точек внутри Voltix Reactor.",
          items: [
            "Станция охлаждения — напиток, шильдик холодильника, температура",
            "Монитор управления реактором — экран статуса, диагностика",
            "Постер в мастерской — динамика / сезонный постер",
            "Шильдик VW Token Printer — табличка производителя на машине",
            "Батарейный / энергетический модуль — брендинг энергоячейки",
            "Панель ежедневного пула наград — сегодняшний пул заряжен спонсором",
            "Карточка буста / задания — опциональный спонсорский буст или челлендж",
          ],
        },
        categories: {
          title: "Кому подходит",
          summary: "Категории брендов, которые органично ложатся в мир реактора.",
          items: [
            "Напитки / энергетика / вода",
            "Бытовая техника / охлаждение",
            "Электроника / дисплеи / мониторы",
            "Автомобили / скорость / динамика",
            "Оборудование / инструменты / батареи",
          ],
        },
        rules: {
          title: "Правила",
          summary: "Что мы делаем — и чего избегаем.",
          allowedLabel: "Делаем",
          notAllowedLabel: "Не делаем",
          allowed: [
            "Объекты и оборудование внутри мира",
            "Опциональные спонсорские бусты",
            "Спонсорский пул наград",
            "Брендированные игровые скины",
            "Экраны внутри оборудования",
          ],
          notAllowed: [
            "Баннеры поверх игры",
            "Всплывающие окна, блокирующие геймплей",
            "Принудительный просмотр рекламы",
            "Огромные логотипы на весь экран",
            "Ложные обещания «заработка»",
          ],
        },
        packages: {
          title: "Пакеты",
          summary: "Пять форматов для партнёров.",
          items: [
            {
              id: "A",
              name: "Нативное размещение объекта",
              description: "Небольшой спонсорский объект в игровой среде.",
            },
            {
              id: "B",
              name: "Спонсорский буст",
              description: "Опциональный буст энергии или геймплея от спонсора.",
            },
            {
              id: "C",
              name: "Спонсорский ежедневный пул",
              description: "Бренд поддерживает общий ежедневный пул наград.",
            },
            {
              id: "D",
              name: "Спонсорский челлендж / событие",
              description: "Ограниченная по времени миссия или событие реактора.",
            },
            {
              id: "E",
              name: "Премиальный скин оборудования",
              description:
                "Брендированный холодильник, монитор, принтер или панель реактора.",
            },
          ],
        },
      },
    },
    team: {
      title: "Команда Voltix Wheel",
      subtitle: "Познакомьтесь с основной командой Voltix Wheel",
      members: [
        {
          id: "atlas",
          name: "Atlas",
          position: "Тимлид",
          role: "Продуктовое и техническое направление",
          description:
            "Ведёт дорожную карту проекта, технические приоритеты и продуктовую реализацию. Отвечает за фокус, целостность и готовность Voltix Wheel к запуску.",
          avatar: "/images/team/atlas.png",
        },
        {
          id: "torque",
          name: "Torque",
          position: "Разработчик геймплея",
          role: "Основная игровая механика",
          description:
            "Разрабатывает главный игровой цикл: вращение колеса, генерацию энергии, систему бустов, прогресс и поток наград.",
          avatar: "/images/team/torque.png",
        },
        {
          id: "lumen",
          name: "Lumen",
          position: "Frontend и UX-разработчик",
          role: "Интерфейс, лендинг и пользовательский опыт",
          description:
            "Отвечает за пользовательскую часть проекта: лендинг, экраны приложения, интерфейсную логику, onboarding и визуальный путь игрока.",
          avatar: "/images/team/lumen.png",
        },
        {
          id: "nexus",
          name: "Nexus",
          position: "Системный разработчик",
          role: "Backend-логика и интеграции",
          description:
            "Отвечает за системную часть проекта: backend-логику, потоки данных, интеграции, расчёты наград и техническую основу продукта.",
          avatar: "/images/team/nexus.png",
        },
      ],
    },
    footer: {
      tagline: "Voltix Wheel — Крути колесо. Заряжай мир.",
    },
    language: {
      en: "EN",
      ru: "RU",
      switchLabel: "Язык",
    },
  },
};

export const navItems = [
  { key: "gameplay" as const, href: "#how-it-works" },
  { key: "rewards" as const, href: "#rewards" },
  { key: "team" as const, href: "#team" },
  { key: "roadmap" as const, href: "#roadmap" },
];
