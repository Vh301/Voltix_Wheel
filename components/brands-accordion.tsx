"use client";

import type { ReactNode } from "react";
import type { Translation } from "@/lib/i18n/translations";

type BrandsContent = Translation["brands"];

function Chevron() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5 shrink-0 text-amber-300/70 transition-transform group-open:rotate-180"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function AccordionItem({
  title,
  summary,
  children,
  defaultOpen = false,
}: {
  title: string;
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group glass-card relative overflow-hidden rounded-xl border border-amber-400/15 bg-amber-950/10 open:border-amber-400/30"
      open={defaultOpen}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-400/80 to-amber-500/10" />
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 text-left">
          <h3 className="text-base font-semibold text-amber-100">{title}</h3>
          <p className="mt-1 text-sm text-blue-100/60">{summary}</p>
        </div>
        <Chevron />
      </summary>
      <div className="border-t border-amber-400/10 px-4 pb-4 pt-3">{children}</div>
    </details>
  );
}

export function BrandsAccordion({ content }: { content: BrandsContent }) {
  const { panels } = content;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      <AccordionItem
        title={panels.howItWorks.title}
        summary={panels.howItWorks.summary}
        defaultOpen
      >
        <div className="flex flex-col gap-4">
          {panels.howItWorks.levels.map((level) => (
            <div key={level.name}>
              <p className="text-sm font-semibold text-amber-200">{level.name}</p>
              <p className="mt-1 text-sm text-blue-100/70">{level.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {level.formats.map((format) => (
                  <span
                    key={format}
                    className="rounded-md border border-amber-400/20 bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-100/80"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        title={panels.spots.title}
        summary={panels.spots.summary}
      >
        <ul className="flex flex-col gap-2">
          {panels.spots.items.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm text-blue-100/75 before:shrink-0 before:text-amber-400 before:content-['•']"
            >
              {item}
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem
        title={panels.categories.title}
        summary={panels.categories.summary}
      >
        <div className="flex flex-wrap gap-2">
          {panels.categories.items.map((item) => (
            <span
              key={item}
              className="rounded-md border border-orange-400/20 bg-orange-950/20 px-2.5 py-1.5 text-xs font-medium text-blue-100/80"
            >
              {item}
            </span>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title={panels.rules.title} summary={panels.rules.summary}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-300/80">
              {panels.rules.allowedLabel}
            </p>
            <ul className="flex flex-col gap-1.5">
              {panels.rules.allowed.map((item) => (
                <li
                  key={item}
                  className="text-sm text-blue-100/75 before:mr-2 before:text-emerald-400 before:content-['✓']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-300/70">
              {panels.rules.notAllowedLabel}
            </p>
            <ul className="flex flex-col gap-1.5">
              {panels.rules.notAllowed.map((item) => (
                <li
                  key={item}
                  className="text-sm text-blue-100/75 before:mr-2 before:text-red-400/80 before:content-['✗']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        title={panels.packages.title}
        summary={panels.packages.summary}
      >
        <div className="flex flex-col gap-2.5">
          {panels.packages.items.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-lg border border-amber-400/15 bg-amber-950/15 px-3 py-2.5"
            >
              <p className="text-sm font-semibold text-amber-200">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/20 text-xs font-bold text-amber-100">
                  {pkg.id}
                </span>
                {pkg.name}
              </p>
              <p className="mt-1 pl-8 text-sm text-blue-100/65">{pkg.description}</p>
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}
