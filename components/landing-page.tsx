"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { BrandsAccordion } from "@/components/brands-accordion";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ImageLightbox, useImageLightbox } from "@/components/image-lightbox";
import { useLanguage } from "@/components/language-provider";
import { navItems } from "@/lib/i18n/translations";

const stepCardAccents = [
  {
    card: "border-cyan-400/25 bg-cyan-950/20",
    bar: "from-cyan-400/80 to-cyan-400/20",
    icon: "from-cyan-500/35 to-cyan-400/15 text-cyan-300 ring-cyan-400/35",
    title: "text-cyan-200",
  },
  {
    card: "border-blue-400/25 bg-blue-950/20",
    bar: "from-blue-400/80 to-blue-400/20",
    icon: "from-blue-500/35 to-blue-400/15 text-blue-300 ring-blue-400/35",
    title: "text-blue-200",
  },
  {
    card: "border-indigo-400/25 bg-indigo-950/20",
    bar: "from-indigo-400/80 to-indigo-400/20",
    icon: "from-indigo-500/35 to-indigo-400/15 text-indigo-300 ring-indigo-400/35",
    title: "text-indigo-200",
  },
  {
    card: "border-amber-400/30 bg-amber-950/15",
    bar: "from-amber-400/90 to-amber-400/20",
    icon: "from-amber-500/35 to-amber-400/15 text-amber-300 ring-amber-400/35",
    title: "text-amber-200",
  },
  {
    card: "border-amber-400/25 bg-amber-950/10",
    bar: "from-amber-300/80 to-amber-500/20",
    icon: "from-amber-400/35 to-yellow-400/15 text-amber-200 ring-amber-300/35",
    title: "text-amber-100",
  },
] as const;

const gameplayCardAccents = [
  {
    card: "border-cyan-400/25 bg-cyan-950/20",
    bar: "from-cyan-400/80 to-cyan-400/20",
    title: "text-cyan-200",
  },
  {
    card: "border-blue-400/25 bg-blue-950/20",
    bar: "from-blue-400/80 to-blue-400/20",
    title: "text-blue-200",
  },
  {
    card: "border-violet-400/25 bg-violet-950/20",
    bar: "from-violet-400/80 to-violet-400/20",
    title: "text-violet-200",
  },
] as const;

const rewardStatAccents = [
  "border-cyan-400/20 bg-cyan-500/10 text-cyan-200",
  "border-blue-400/20 bg-blue-500/10 text-blue-200",
  "border-amber-400/25 bg-amber-500/10 text-amber-200",
  "border-violet-400/20 bg-violet-500/10 text-violet-200",
] as const;

const teamMemberAccents: Record<
  string,
  { card: string; bar: string; badge: string; position: string }
> = {
  atlas: {
    card: "border-amber-400/20 bg-amber-950/10",
    bar: "from-amber-400/80 to-amber-400/15",
    badge: "border-amber-400/25 bg-amber-500/10 text-amber-200/80",
    position: "text-amber-300",
  },
  torque: {
    card: "border-cyan-400/20 bg-cyan-950/10",
    bar: "from-cyan-400/80 to-cyan-400/15",
    badge: "border-cyan-400/25 bg-cyan-500/10 text-cyan-200/80",
    position: "text-cyan-300",
  },
  lumen: {
    card: "border-blue-400/20 bg-blue-950/10",
    bar: "from-blue-400/80 to-blue-400/15",
    badge: "border-blue-400/25 bg-blue-500/10 text-blue-200/80",
    position: "text-blue-300",
  },
  nexus: {
    card: "border-indigo-400/25 bg-indigo-950/10",
    bar: "from-indigo-400/80 to-indigo-400/15",
    badge: "border-indigo-400/25 bg-indigo-500/10 text-indigo-200/80",
    position: "text-indigo-300",
  },
};

function AccentCard({
  accent,
  className = "",
  children,
}: {
  accent: { card: string; bar: string };
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`glass-card relative overflow-hidden rounded-2xl transition ${accent.card} ${className}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent.bar}`}
      />
      {children}
    </div>
  );
}

function GameScreenshot({
  src,
  alt,
  priority = false,
  className = "",
  onZoom,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  onZoom?: (image: { src: string; alt: string }) => void;
}) {
  const frame = (
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

  if (!onZoom) return frame;

  return (
    <button
      type="button"
      onClick={() => onZoom({ src, alt })}
      className="block w-full cursor-zoom-in text-left"
      aria-label={alt}
    >
      {frame}
    </button>
  );
}

export function LandingPage() {
  const { t } = useLanguage();
  const lightbox = useImageLightbox();

  return (
    <div className="flex min-h-screen flex-col">
      <ImageLightbox image={lightbox.image} onClose={lightbox.close} />
      <header className="sticky top-0 z-50 border-b border-blue-500/15 bg-[#070d1a]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 py-3 md:hidden">
            <a href="#hero" className="shrink-0 text-lg font-bold tracking-tight">
              <span className="gradient-text">{t.hero.title}</span>
            </a>
            <LanguageSwitcher />
          </div>
          <nav
            aria-label="Main"
            className="grid grid-cols-4 gap-1 border-t border-blue-500/10 pb-2.5 pt-2 md:hidden"
          >
            {navItems.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="rounded-md px-1 py-2 text-center text-[11px] font-medium leading-tight text-blue-50/90 transition-colors hover:bg-blue-500/10 hover:text-amber-200 sm:text-xs"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </nav>

          <div className="hidden items-center justify-between gap-6 py-3.5 md:flex">
            <a href="#hero" className="shrink-0 text-lg font-bold tracking-tight">
              <span className="gradient-text">{t.hero.title}</span>
            </a>
            <nav aria-label="Main" className="flex items-center gap-6 lg:gap-8">
              {navItems.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="whitespace-nowrap text-sm font-medium text-blue-50/90 transition-colors hover:text-amber-200"
                >
                  {t.nav[link.key]}
                </a>
              ))}
            </nav>
            <div className="shrink-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section
          id="hero"
          className="hero-gradient relative overflow-hidden px-6 pb-6 pt-6 md:pb-8 md:pt-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col gap-3 md:gap-4">
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
                    onZoom={lightbox.open}
                  />
                </div>

                <p className="max-w-xl text-base leading-relaxed text-blue-100/80">
                  {t.hero.description}
                </p>
              </div>

              <div className="hidden lg:block">
                <GameScreenshot
                  src="/images/General_page.png"
                  alt={t.hero.imageAlt}
                  priority
                  onZoom={lightbox.open}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="section-gradient px-6 py-8 md:py-10"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl">
              {t.howItWorks.title}
            </h2>
            <p className="mx-auto mb-4 max-w-2xl text-center text-blue-100/70">
              {t.howItWorks.subtitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {t.howItWorks.steps.map((item, index) => {
                const accent = stepCardAccents[index] ?? stepCardAccents[0];
                return (
                <AccentCard key={item.step} accent={accent} className="p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold ring-1 ${accent.icon}`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-mono text-xs text-cyan-400/80">
                      {item.step}
                    </span>
                  </div>
                  <h3 className={`mb-2 text-lg font-semibold ${accent.title}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-blue-100/70">
                    {item.description}
                  </p>
                </AccentCard>
              );
              })}
            </div>
          </div>
        </section>

        <section id="showcase" className="px-6 py-8 md:py-10">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
              {t.showcase.title}
            </h2>
            <p className="mx-auto mb-4 max-w-2xl text-blue-100/70">
              {t.showcase.subtitle}
            </p>
            <GameScreenshot
              src="/images/Other_General_page.png"
              alt={t.showcase.imageAlt}
            />
          </div>
        </section>

        <section id="printer" className="section-gradient px-6 py-8 md:py-10">
          <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2">
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
            <div className="order-1 flex flex-col gap-4 lg:order-2">
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

        <section id="rewards" className="px-6 py-8 md:py-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl">
              {t.rewards.title}
            </h2>
            <p className="mx-auto mb-4 max-w-2xl text-center text-blue-100/70">
              {t.rewards.subtitle}
            </p>

            <div className="glass-card glow-gold relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-amber-400/25 bg-amber-950/10 p-6">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-400/90 to-amber-500/20" />
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
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

              <div className="mb-4 h-2 overflow-hidden rounded-full bg-blue-950/80">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400" />
              </div>

              <p className="mb-3 text-sm text-blue-100/70">
                {t.rewards.contribution}
              </p>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {t.rewards.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`rounded-lg border px-3 py-2.5 text-center ${rewardStatAccents[index] ?? rewardStatAccents[0]}`}
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

        <section id="gameplay" className="section-gradient px-6 py-8 md:py-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {t.gameplay.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {t.gameplay.cards.map((card, index) => {
                const accent = gameplayCardAccents[index] ?? gameplayCardAccents[0];
                return (
                <AccentCard key={card.title} accent={accent} className="p-6">
                  <h3 className={`mb-2 text-xl font-semibold ${accent.title}`}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-blue-100/70">{card.description}</p>
                </AccentCard>
              );
              })}
            </div>
          </div>
        </section>

        <section
          id="brands"
          className="section-gradient px-6 py-8 md:py-10"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl">
              {t.brands.title}
            </h2>
            <p className="mx-auto mb-3 max-w-2xl text-center text-blue-100/75">
              {t.brands.subtitle}
            </p>
            <p className="mx-auto mb-5 max-w-xl text-center font-mono text-sm text-amber-300/90">
              {t.brands.formula}
            </p>
            <BrandsAccordion content={t.brands} />
            <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-blue-100/45">
              {t.brands.disclaimer}
            </p>
          </div>
        </section>

        <section id="team" className="px-6 py-8 md:py-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">
              {t.team.title}
            </h2>
            <p className="mx-auto mb-4 max-w-2xl text-center text-sm text-blue-100/60 md:text-base">
              {t.team.subtitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.team.members.map((member) => {
                const accent =
                  teamMemberAccents[member.id] ?? teamMemberAccents.atlas;
                return (
                <article
                  key={member.id}
                  className={`glass-card relative flex flex-col overflow-hidden rounded-xl transition ${accent.card}`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent.bar}`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      lightbox.open({
                        src: member.avatar,
                        alt: `${member.name} — ${member.position}`,
                      })
                    }
                    className="relative h-44 w-full cursor-zoom-in overflow-hidden border-b border-white/5 bg-slate-950 sm:h-48"
                    aria-label={`${member.name} — ${member.position}`}
                  >
                    <Image
                      src={member.avatar}
                      alt=""
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                    />
                  </button>
                  <div className="flex flex-1 flex-col gap-2 p-3.5">
                    <div>
                      <h3 className="text-base font-bold text-cyan-100">
                        {member.name}
                      </h3>
                      <p className={`mt-0.5 text-sm font-semibold ${accent.position}`}>
                        {member.position}
                      </p>
                      <span
                        className={`mt-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${accent.badge}`}
                      >
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-blue-100/65">
                      {member.description}
                    </p>
                  </div>
                </article>
              );
              })}
            </div>
          </div>
        </section>

        <section id="roadmap" className="section-gradient px-6 py-8 md:py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {t.roadmap.title}
            </h2>
            <ol className="relative flex flex-col gap-0">
              {t.roadmap.phases.map((phase, i) => (
                <li
                  key={phase}
                  className="relative flex gap-5 border-l-2 border-blue-500/30 pb-3 pl-7 last:pb-0"
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
        className="mt-auto border-t border-blue-500/10 bg-[#050a14] px-6 py-5"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
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
