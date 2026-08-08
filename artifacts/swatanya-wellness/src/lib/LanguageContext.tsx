import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Language } from './translations';

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
    const val = translations[lang][key as keyof typeof translations.en];
    if (typeof val === 'string') return val;
    const fallback = translations.en[key as keyof typeof translations.en];
    if (typeof fallback === 'string') return fallback;
    return key;
  };

  const tNested = (key: string): Record<string, string> => {
    const val = translations[lang][key as keyof typeof translations.en];
    if (val && typeof val === 'object' && !Array.isArray(val)) return val as Record<string, string>;
    const fallback = translations.en[key as keyof typeof translations.en];
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
