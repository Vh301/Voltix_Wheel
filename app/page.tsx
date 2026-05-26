import Image from "next/image";

const navLinks = [
  { label: "Game", href: "#hero" },
  { label: "Rewards", href: "#rewards" },
  { label: "Brands", href: "#brands" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Community", href: "#footer" },
];

const howItWorks = [
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
];

const printerBullets = [
  "Energy-driven reward machine",
  "Visible VW coin printing",
  "Clear link between gameplay and rewards",
  "Core visual symbol of the game",
];

const rewardPoolStats = [
  { label: "Spin activity", value: "+Energy" },
  { label: "Daily tasks", value: "+Bonus" },
  { label: "Boost usage", value: "+Power" },
  { label: "Friend invites", value: "+Team" },
];

const gameplayCards = [
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
];

const brandCards = [
  "Product placement",
  "Sponsored events",
  "Optional sponsor boosts",
  "Brand props",
  "Native equipment skins",
  "Daily pool sponsorships",
];

const roadmapPhases = [
  "Phase 1 — Landing and visual identity",
  "Phase 2 — Playable prototype",
  "Phase 3 — Tasks, boosts, and reward logic",
  "Phase 4 — Referral system and daily reward pool",
  "Phase 5 — VW token integration",
  "Phase 6 — Brand sponsorship marketplace",
];

const canon = [
  { label: "Voltix", highlight: false },
  { label: "Wheel", highlight: false },
  { label: "Energy", highlight: false },
  { label: "Reactor", highlight: false },
  { label: "VW Token Printer", highlight: true },
  { label: "Rewards", highlight: false },
];

function GameScreenshot({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`screenshot-frame ${className}`}>
      <div className="screenshot-inner glow-gold">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={900}
          className="h-auto w-full"
          priority={priority}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-blue-500/10 bg-[#070d1a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" className="text-lg font-bold tracking-tight">
            <span className="gradient-text">Voltix Wheel</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-blue-100/70 transition-colors hover:text-amber-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#how-it-works"
            className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white glow-blue"
          >
            Spin
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="hero-gradient relative overflow-hidden px-6 pb-20 pt-12 md:pb-28 md:pt-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-5 md:gap-6">
                <p className="inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cyan-200">
                  A reactor-powered mobile game
                </p>
                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  <span className="gradient-text">Voltix Wheel</span>
                </h1>
                <p className="text-xl font-semibold text-cyan-300 md:text-2xl">
                  Run the wheel. Charge the world.
                </p>

                {/* Mobile: image before description */}
                <div className="lg:hidden">
                  <GameScreenshot
                    src="/images/General_page.png"
                    alt="Voltix Wheel gameplay — reactor wheel, VW Token Printer, and daily rewards"
                    priority
                  />
                </div>

                <p className="max-w-xl text-base leading-relaxed text-blue-100/80">
                  Power the Voltix Reactor by running the wheel, generating
                  energy, and activating the VW Token Printer. Complete tasks,
                  use boosts, invite friends, and join the daily reward pool.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#how-it-works"
                    className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-slate-900 glow-gold transition hover:brightness-110"
                  >
                    SPIN THE WHEEL
                  </a>
                  <a
                    href="#showcase"
                    className="rounded-full border border-blue-400/40 bg-blue-500/10 px-8 py-3.5 text-sm font-semibold text-blue-100 transition hover:border-cyan-400/60 hover:bg-blue-500/20"
                  >
                    Explore gameplay
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {canon.map((item, i) => (
                    <span key={item.label} className="flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-cyan-500/60 text-[10px]">→</span>
                      )}
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          item.highlight
                            ? "border border-amber-400/40 bg-amber-400/15 text-amber-200"
                            : "border border-blue-400/20 bg-blue-500/10 text-blue-100/80"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Desktop hero image */}
              <div className="hidden lg:block">
                <GameScreenshot
                  src="/images/General_page.png"
                  alt="Voltix Wheel gameplay — reactor wheel, VW Token Printer, and daily rewards"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="section-gradient px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-blue-100/70">
              From wheel spin to golden rewards — every action powers the
              reactor chain.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {howItWorks.map((item) => (
                <div
                  key={item.title}
                  className="glass-card glow-blue rounded-2xl p-6 transition hover:border-cyan-400/40"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/20 text-lg font-bold text-cyan-300 ring-1 ring-cyan-400/30">
                      {item.icon}
                    </span>
                    <span className="font-mono text-xs text-cyan-400/80">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-amber-300">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-blue-100/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gameplay showcase */}
        <section id="showcase" className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              The full gameplay loop lives inside the Voltix Reactor
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-blue-100/70">
              Spin the wheel, charge energy, power the reactor, and watch the
              reward system come alive.
            </p>
            <GameScreenshot
              src="/images/Other_General_page.png"
              alt="Full Voltix Reactor gameplay loop with wheel, energy, and VW Token Printer"
            />
          </div>
        </section>

        {/* VW Token Printer */}
        <section id="printer" className="section-gradient px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <GameScreenshot
                src="/images/Other_General_page.png"
                alt="VW Token Printer printing golden VW coins"
                className="max-w-lg mx-auto lg:max-w-none"
              />
              <p className="mt-4 text-center text-sm font-medium tracking-wide text-amber-300/90 lg:text-left">
                Spin → Energy → Reactor → Printer → VW coins
              </p>
            </div>
            <div className="order-1 flex flex-col gap-6 lg:order-2">
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                The coolest part of the reactor: the{" "}
                <span className="text-amber-300">VW Token Printer</span>
              </h2>
              <p className="text-base leading-relaxed text-blue-100/80 md:text-lg">
                The VW Token Printer is the visual heart of Voltix Wheel. The
                more energy you generate, the harder the reactor works — and the
                more exciting it feels when golden VW coins roll out of the
                machine.
              </p>
              <ul className="flex flex-col gap-3">
                {printerBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 text-blue-100/90"
                  >
                    <span className="flex h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Daily Reward Pool */}
        <section id="rewards" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Daily Reward Pool
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-blue-100/70">
              Every day, active players help charge the shared game reward
              pool. Your spins, tasks, boosts, and team activity increase your
              contribution.
            </p>

            <div className="glass-card glow-gold mx-auto max-w-2xl rounded-2xl border-amber-400/20 p-8">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-300/80">
                    Daily Reward Pool
                  </p>
                  <p className="mt-1 text-3xl font-bold text-amber-300 md:text-4xl">
                    250,000{" "}
                    <span className="text-lg text-amber-200/80">VW</span>
                  </p>
                </div>
                <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-right">
                  <p className="text-[10px] uppercase tracking-wider text-blue-200/60">
                    Resets in
                  </p>
                  <p className="font-mono text-sm text-cyan-300">07:45:32</p>
                </div>
              </div>

              <div className="mb-6 h-2 overflow-hidden rounded-full bg-blue-950/80">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400" />
              </div>

              <p className="mb-4 text-sm text-blue-100/70">
                Your contribution: Energy + Tasks + Boosts + Friends
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {rewardPoolStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-blue-400/15 bg-blue-500/5 px-3 py-3 text-center"
                  >
                    <p className="text-[10px] uppercase tracking-wide text-blue-200/50">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-amber-200">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Boosts / Tasks / Friends */}
        <section id="gameplay" className="section-gradient px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              More ways to charge your reactor
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {gameplayCards.map((card) => (
                <div
                  key={card.title}
                  className="glass-card glow-blue rounded-2xl p-8"
                >
                  <h3 className="mb-3 text-xl font-semibold text-cyan-300">
                    {card.title}
                  </h3>
                  <p className="text-blue-100/70">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Roadmap
            </h2>
            <ol className="relative flex flex-col gap-0">
              {roadmapPhases.map((phase, i) => (
                <li
                  key={phase}
                  className="relative flex gap-6 border-l-2 border-blue-500/30 pb-10 pl-8 last:pb-0"
                >
                  <span className="absolute -left-2.5 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-blue-100/90">{phase}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Native Ads — moved below Roadmap */}
        <section
          id="brands"
          className="section-gradient border-t border-blue-500/10 px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Sponsor moments built into the world
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-blue-100/70">
              Brands can appear as natural parts of the Voltix Reactor — a drink
              in the cooling station, a monitor in the workshop, a poster on
              the wall, or a badge on the token printer.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brandCards.map((card) => (
                <div
                  key={card}
                  className="glass-card rounded-xl border-amber-400/10 px-6 py-5 text-center text-sm font-medium text-blue-100/90 transition hover:border-amber-400/30"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="footer"
        className="mt-auto border-t border-blue-500/10 bg-[#050a14] px-6 py-12"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
          <p className="text-center text-sm text-blue-100/60 md:text-left">
            Voltix Wheel — Run the wheel. Charge the world.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-blue-100/50 transition hover:text-amber-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
