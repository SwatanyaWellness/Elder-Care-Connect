import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  tNested: (key: string) => Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
  tNested: () => ({}),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string): string => {
    const dict = translations[lang] as Record<string, unknown>;
    const val = dict[key];
    if (typeof val === 'string') return val;
    const en = translations['en'] as Record<string, unknown>;
    const fallback = en[key];
    if (typeof fallback === 'string') return fallback;
    return key;
  };

  const tNested = (key: string): Record<string, string> => {
    const dict = translations[lang] as Record<string, unknown>;
    const val = dict[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) return val as Record<string, string>;
    const en = translations['en'] as Record<string, unknown>;
    const fallback = en[key];
    if (fallback && typeof fallback === 'object' && !Array.isArray(fallback)) return fallback as Record<string, string>;
    return {};
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tNested }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
