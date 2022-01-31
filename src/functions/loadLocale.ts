import { waitLocale, register, init } from "svelte-i18n";
import getPreferredLocale from "preferred-locale";

const localeLoader = import.meta.glob("../locales/*.json");

export async function loadLocale() {
  const translatedLocales = Object.keys(localeLoader).map(
    (localePath) =>
      localePath.match(new RegExp("../locales/(?<locale>.*).json")).groups
        .locale
  );

  translatedLocales.forEach((locale) =>
    register(locale, localeLoader[`../locales/${locale}.json`])
  );

  const fallbackLocale = "en";

  const initialLocale = getPreferredLocale(translatedLocales, fallbackLocale, {
    regionLowerCase: true,
    languageOnly: true,
  });

  init({ fallbackLocale, initialLocale });

  return waitLocale();
}
