import { languages } from '@excalidraw/excalidraw';
import { Language } from '@excalidraw/excalidraw/types/i18n';

// Reference:
// https://github.com/excalidraw/excalidraw/blob/e57dc405fa575a330110699ee762dce5918e9e04/src/i18n.ts#L20
const LangCodes = [
  'en',
  'ar-SA',
  'bg-BG',
  'ca-ES',
  'cs-CZ',
  'de-DE',
  'el-GR',
  'es-ES',
  'eu-ES',
  'fa-IR',
  'fi-FI',
  'fr-FR',
  'gl-ES',
  'he-IL',
  'hi-IN',
  'hu-HU',
  'id-ID',
  'it-IT',
  'ja-JP',
  'kab-KA',
  'kk-KZ',
  'ko-KR',
  'ku-TR',
  'lt-LT',
  'lv-LV',
  'my-MM',
  'nb-NO',
  'nl-NL',
  'nn-NO',
  'oc-FR',
  'pa-IN',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'ru-RU',
  'sk-SK',
  'sv-SE',
  'sl-SI',
  'tr-TR',
  'uk-UA',
  'zh-CN',
  'zh-TW',
  'vi-VN',
  'mr-IN',
] as const;

export type LangCode = (typeof LangCodes)[number];

export type Languages = {
  [key in LangCode]: Language;
}[];

export const Languages = languages
  .map((lang) => (LangCodes.includes(lang.code as LangCode) ? lang : undefined))
  .filter((item) => item !== undefined)
  .map((langCode) => ({
    langCode: languages.find((lang) => lang.code === langCode?.code),
  }));
