export function translate(locale, translations) {
  return translations[locale] || translations["zh"];
}
