import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/i18n/en/translation.json';
import ja_JP from '@/i18n/ja_JP/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    returnEmptyString: false,
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources: {
      en: {
        translation: en,
      },
      ja_JP: {
        translation: ja_JP,
      },
    },
  })
  .catch((e) => {
    devlog.error(e);
  });

export default i18n;
