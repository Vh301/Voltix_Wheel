export type Locale = "en" | "ru";

export type Translation = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    game: string;
    rewards: string;
    brands: string;
    team: string;
    roadmap: string;
    community: string;
    spin: string;
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
    cards: string[];
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
      game: "Game",
      rewards: "Rewards",
      brands: "Brands",
      team: "Team",
      roadmap: "Roadmap",
      community: "Community",
      spin: "Spin",
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
      title: "Sponsor moments built into the world",
      subtitle:
        "Brands can appear as natural parts of the Voltix Reactor — a drink in the cooling station, a monitor in the workshop, a poster on the wall, or a badge on the token printer.",
      cards: [
        "Product placement",
        "Sponsored events",
        "Optional sponsor boosts",
        "Brand props",
        "Native equipment skins",
        "Daily pool sponsorships",
      ],
    },
    team: {
      title: "The Team Behind Voltix Wheel",
      subtitle:
        "Meet the core Voltix Wheel team, represented by official project avatars.",
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
      game: "Игра",
      rewards: "Награды",
      brands: "Бренды",
      team: "Команда",
      roadmap: "Дорожная карта",
      community: "Сообщество",
      spin: "Крутить",
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
      title: "Спонсорские моменты внутри игрового мира",
      subtitle:
        "Бренды могут появляться как естественная часть Voltix Reactor — напиток в охлаждающей станции, монитор в мастерской, постер на стене или табличка на токен-принтере.",
      cards: [
        "Product placement",
        "Спонсорские события",
        "Опциональные спонсорские бусты",
        "Брендовые props",
        "Нативные скины оборудования",
        "Спонсорство daily pool",
      ],
    },
    team: {
      title: "Команда Voltix Wheel",
      subtitle:
        "Познакомьтесь с основной командой Voltix Wheel, представленной через официальные аватары проекта.",
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
          position: "Gameplay Developer",
          role: "Основная игровая механика",
          description:
            "Разрабатывает главный игровой цикл: вращение колеса, генерацию энергии, систему бустов, прогресс и поток наград.",
          avatar: "/images/team/torque.png",
        },
        {
          id: "lumen",
          name: "Lumen",
          position: "Frontend & UX Developer",
          role: "Интерфейс, лендинг и пользовательский опыт",
          description:
            "Отвечает за пользовательскую часть проекта: лендинг, экраны приложения, интерфейсную логику, onboarding и визуальный путь игрока.",
          avatar: "/images/team/lumen.png",
        },
        {
          id: "nexus",
          name: "Nexus",
          position: "Systems Developer",
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
  { key: "game" as const, href: "#hero" },
  { key: "rewards" as const, href: "#rewards" },
  { key: "brands" as const, href: "#brands" },
  { key: "team" as const, href: "#team" },
  { key: "roadmap" as const, href: "#roadmap" },
  { key: "community" as const, href: "#footer" },
];
