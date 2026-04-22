import { useState, useCallback, useEffect } from 'react';
import translations, { Language, Translations } from '../locales';

export type { Language };  // ← re-export کن تا از hook هم قابل import باشه

let currentLanguage: Language = 'en';
const listeners: Set<() => void> = new Set();

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  listeners.forEach((cb) => cb());
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function useTranslation() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const cb = () => forceUpdate((n) => n + 1);
    listeners.add(cb);
    return () => { listeners.delete(cb); };
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[currentLanguage];
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, []);

  return { t, language: currentLanguage, setLanguage };
}