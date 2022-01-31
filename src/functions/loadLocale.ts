import { waitLocale } from "svelte-i18n";
import { register, init } from "svelte-i18n";
import getPreferredLocale from "preferred-locale";

export async function loadLocale() {
  const translatedLocales = ["en", "pt", "es"];

  const preferredLocale = getPreferredLocale(
    translatedLocales,
    translatedLocales[0],
    {
      regionLowerCase: true,
      languageOnly: true,
    }
  );

  for (const locale of translatedLocales) {
    register(locale, () => import(`../locales/${locale}.json`));
  }

  init({
    fallbackLocale: translatedLocales[0],
    initialLocale: preferredLocale,
  });

  return waitLocale();
}
