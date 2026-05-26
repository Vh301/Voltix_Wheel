"use client";

import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/lib/i18n/translations";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  const options: Locale[] = ["en", "ru"];

  return (
    <div
      className="flex items-center rounded-full border border-blue-400/25 bg-blue-500/10 p-0.5"
      role="group"
      aria-label={t.language.switchLabel}
    >
      {options.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`min-w-[2.25rem] rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
              active
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm"
                : "text-blue-100/60 hover:text-amber-200"
            }`}
            aria-pressed={active}
          >
            {t.language[code]}
          </button>
        );
      })}
    </div>
  );
}
