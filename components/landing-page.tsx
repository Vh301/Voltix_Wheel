"use client";

import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { navItems } from "@/lib/i18n/translations";

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

export function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-blue-500/10 bg-[#070d1a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="#hero" className="shrink-0 text-lg font-bold tracking-tight">
            <span className="gradient-text">{t.hero.title}</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-blue-100/70 transition-colors hover:text-amber-300"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <a
              href="#how-it-works"
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white glow-blue sm:px-4"
            >
              {t.nav.spin}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          id="hero"
          className="hero-gradient relative overflow-hidden px-6 pb-20 pt-12 md:pb-28 md:pt-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-5 md:gap-6">
                <p className="inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cyan-200">
                  {t.hero.badge}
                </p>
                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  <span className="gradient-text">{t.hero.title}</span>
                </h1>
                <p className="text-xl font-semibold text-cyan-300 md:text-2xl">
                  {t.hero.subtitle}
                </p>

                <div className="lg:hidden">
                  <GameScreenshot
                    src="/images/General_page.png"
                    alt={t.hero.imageAlt}
                    priority
                  />
                </div>

                <p className="max-w-xl text-base leading-relaxed text-blue-100/80">
                  {t.hero.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#how-it-works"
                    className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-slate-900 glow-gold transition hover:brightness-110"
                  >
                    {t.hero.ctaPrimary}
                  </a>
                  <a
                    href="#showcase"
                    className="rounded-full border border-blue-400/40 bg-blue-500/10 px-8 py-3.5 text-sm font-semibold text-blue-100 transition hover:border-cyan-400/60 hover:bg-blue-500/20"
                  >
                    {t.hero.ctaSecondary}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {t.canon.map((item, i) => (
                    <span key={item.label} className="flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-[10px] text-cyan-500/60">→</span>
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

              <div className="hidden lg:block">
                <GameScreenshot
                  src="/images/General_page.png"
                  alt={t.hero.imageAlt}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="section-gradient px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {t.howItWorks.title}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-blue-100/70">
              {t.howItWorks.subtitle}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {t.howItWorks.steps.map((item) => (
                <div
                  key={item.step}
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

        <section id="showcase" className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              {t.showcase.title}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-blue-100/70">
              {t.showcase.subtitle}
            </p>
            <GameScreenshot
              src="/images/Other_General_page.png"
              alt={t.showcase.imageAlt}
            />
          </div>
        </section>

        <section id="printer" className="section-gradient px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <GameScreenshot
                src="/images/Other_General_page.png"
                alt={t.printer.imageAlt}
                className="mx-auto max-w-lg lg:max-w-none"
              />
              <p className="mt-4 text-center text-sm font-medium tracking-wide text-amber-300/90 lg:text-left">
                {t.printer.caption}
              </p>
            </div>
            <div className="order-1 flex flex-col gap-6 lg:order-2">
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                {t.printer.title}
                <span className="text-amber-300">{t.printer.titleHighlight}</span>
              </h2>
              <p className="text-base leading-relaxed text-blue-100/80 md:text-lg">
                {t.printer.description}
              </p>
              <ul className="flex flex-col gap-3">
                {t.printer.bullets.map((bullet) => (
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

        <section id="rewards" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {t.rewards.title}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-blue-100/70">
              {t.rewards.subtitle}
            </p>

            <div className="glass-card glow-gold mx-auto max-w-2xl rounded-2xl border-amber-400/20 p-8">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-300/80">
                    {t.rewards.panelLabel}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-amber-300 md:text-4xl">
                    250,000{" "}
                    <span className="text-lg text-amber-200/80">VW</span>
                  </p>
                </div>
                <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-right">
                  <p className="text-[10px] uppercase tracking-wider text-blue-200/60">
                    {t.rewards.resetsIn}
                  </p>
                  <p className="font-mono text-sm text-cyan-300">07:45:32</p>
                </div>
              </div>

              <div className="mb-6 h-2 overflow-hidden rounded-full bg-blue-950/80">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400" />
              </div>

              <p className="mb-4 text-sm text-blue-100/70">
                {t.rewards.contribution}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {t.rewards.stats.map((stat) => (
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

        <section id="gameplay" className="section-gradient px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              {t.gameplay.title}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {t.gameplay.cards.map((card) => (
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

        <section
          id="brands"
          className="section-gradient px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {t.brands.title}
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-blue-100/70">
              {t.brands.subtitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.brands.cards.map((card) => (
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

        <section id="team" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {t.team.title}
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-blue-100/70">
              {t.team.subtitle}
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {t.team.members.map((member) => (
                <article
                  key={member.id}
                  className="glass-card glow-blue flex flex-col overflow-hidden rounded-2xl border-blue-400/20 transition hover:border-cyan-400/35"
                >
                  <div className="p-4 pb-0">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950 glow-blue">
                      <Image
                        src={member.avatar}
                        alt={`${member.name} — ${member.position}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-200">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-amber-300">
                        {member.position}
                      </p>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-blue-300/70">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-blue-100/70">
                      {member.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="section-gradient px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              {t.roadmap.title}
            </h2>
            <ol className="relative flex flex-col gap-0">
              {t.roadmap.phases.map((phase, i) => (
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

      <footer
        id="footer"
        className="mt-auto border-t border-blue-500/10 bg-[#050a14] px-6 py-12"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
          <p className="text-center text-sm text-blue-100/60 md:text-left">
            {t.footer.tagline}
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            {navItems.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-blue-100/50 transition hover:text-amber-300"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
