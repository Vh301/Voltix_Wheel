"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  type Locale,
  type Translation,
  translations,
} from "@/lib/i18n/translations";

const STORAGE_KEY = "voltix-wheel-locale";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "ru" ? "ru" : "en";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Locale {
  return readStoredLocale();
}

function getServerSnapshot(): Locale {
  return "en";
}

type LanguageContextValue = {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    notify();
  }, []);

  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
  }, [locale, t.meta.title]);

  const value = useMemo(
    () => ({ locale, t, setLocale }),
    [locale, t, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
