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
    title: "Run the Wheel",
    description:
      "Voltix runs inside the reactor wheel and turns motion into energy.",
  },
  {
    step: "02",
    title: "Generate Energy",
    description:
      "Every spin charges your Energy Power and boosts your progress.",
  },
  {
    step: "03",
    title: "Power the Reactor",
    description:
      "Energy flows into the Voltix Reactor through glowing cables and machinery.",
  },
  {
    step: "04",
    title: "Print VW",
    description:
      "The VW Token Printer converts reactor power into shiny VW rewards.",
  },
  {
    step: "05",
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

const rewardPoolCards = [
  "Spin activity",
  "Daily tasks",
  "Boost usage",
  "Friend invites",
  "Special events",
  "Sponsor-powered rewards",
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
  "Rewarded ads",
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
  "Voltix",
  "Wheel",
  "Energy",
  "Reactor",
  "VW Token Printer",
  "Rewards",
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
            href="#hero"
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
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <p className="inline-flex w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-amber-300">
                Mobile energy game powered by VW rewards
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                <span className="gradient-text">Voltix Wheel</span>
              </h1>
              <p className="text-xl font-semibold text-cyan-300 md:text-2xl">
                Run the wheel. Charge the world.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-blue-100/80 md:text-lg">
                Help Voltix power the reactor, spin the generator wheel, and
                activate the VW Token Printer. Play, charge energy, complete
                tasks, invite friends, and earn rewards from the daily reward
                pool.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#how-it-works"
                  className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-slate-900 glow-gold transition hover:brightness-110"
                >
                  SPIN THE WHEEL
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-full border border-blue-400/40 bg-blue-500/10 px-8 py-3.5 text-sm font-semibold text-blue-100 transition hover:border-cyan-400/60 hover:bg-blue-500/20"
                >
                  Explore gameplay
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-blue-200/60">
                {canon.map((item, i) => (
                  <span key={item} className="flex items-center gap-2">
                    {i > 0 && <span className="text-cyan-400">→</span>}
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-blue-400/20 glow-blue">
                <Image
                  src="/images/General_Hero.png"
                  alt="Voltix running inside the reactor wheel"
                  width={800}
                  height={800}
                  className="h-auto w-full"
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
                  <span className="mb-3 block font-mono text-sm text-cyan-400">
                    {item.step}
                  </span>
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

        {/* VW Token Printer */}
        <section id="printer" className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 glow-gold">
                <Image
                  src="/images/General_page.png"
                  alt="VW Token Printer in the Voltix Reactor"
                  width={700}
                  height={700}
                  className="h-auto w-full"
                />
              </div>
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
        <section
          id="rewards"
          className="section-gradient px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Daily Reward Pool
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-blue-100/70">
              Every day, active players help charge the shared reward pool.
              Spins, tasks, boosts, referrals, and events increase your
              contribution and unlock more ways to earn.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rewardPoolCards.map((card) => (
                <div
                  key={card}
                  className="glass-card rounded-xl px-6 py-5 text-center font-medium text-blue-100 transition hover:border-amber-400/30 hover:text-amber-200"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Boosts / Tasks / Friends */}
        <section id="gameplay" className="px-6 py-20 md:py-28">
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
            <div className="mt-12 flex justify-center">
              <div className="relative max-w-md overflow-hidden rounded-2xl border border-blue-400/20">
                <Image
                  src="/images/Other_General_page.png"
                  alt="Voltix Wheel gameplay overview"
                  width={600}
                  height={400}
                  className="h-auto w-full opacity-90"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Native Ads for Brands */}
        <section
          id="brands"
          className="section-gradient px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Ads that feel like part of the game world
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-blue-100/70">
              Voltix Wheel turns advertising into native in-game placements: a
              drink inside the cooling station, a brand monitor in the reactor
              room, a poster on the workshop wall, or a badge on the token
              printer. No boring banners — just sponsor moments built into the
              world.
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
