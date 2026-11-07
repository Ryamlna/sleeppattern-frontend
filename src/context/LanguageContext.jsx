import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'sleeppattern-lang';
const LOCALES = { id: 'id-ID', en: 'en-US' };

function translate(lang, key, vars) {
  let text = translations[lang]?.[key] ?? translations.id[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([name, value]) => {
      text = text.split(`{${name}}`).join(String(value));
    });
  }
  return text;
}

const LanguageContext = createContext({
  lang: 'id',
  locale: LOCALES.id,
  setLang: () => {},
  toggleLang: () => {},
  t: (key, vars) => translate('id', key, vars),
});

function readSavedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
  } catch {
    /* localStorage bisa tidak tersedia (mode privat) */
  }
  return 'id'; // bahasa bawaan
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readSavedLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* abaikan */
    }
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => setLang(lang === 'id' ? 'en' : 'id'), [lang, setLang]);
  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);

  const value = useMemo(
    () => ({ lang, locale: LOCALES[lang], setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
