import getPreferredLocale from "preferred-locale";

const translatedLocales = ["en", "pt", "es"] as const;

const preferredLocale = getPreferredLocale(
  translatedLocales as unknown as string[],
  translatedLocales[0],
  {
    regionLowerCase: true,
    languageOnly: true,
  }
);

type TranslationStrings = {
  [K in typeof translatedLocales[number]]: string;
};

export enum TranslationId {
  AppDescription,
  Installed,
  Similar,
  ShowMore,
  SendFeedbackAnonymously,
  ProjectOnGitHub,
  ToggleDarkMode,
  CopiedToClipboard,
  NoSimilarPackagesFound,
  TourTitle,
  TourIntro,
  LicenseName,
  Licenses,
  License,
  ClickToReadAboutLicense,
  OpenReadme,
  ReadmeFromPackage,
  ExploreFiles,
  FilesFromPackage,
}

const translations: Record<TranslationId, TranslationStrings> = {
  [TranslationId.AppDescription]: {
    en: "Discover similar packages from your <em>package.json</em> dependencies.",
    pt: "Descubra pacotes semelhantes às dependências do seu <em>package.json</em>.",
    es: "Descubra paquetes similares a las dependencias de su <em>package.json</em>.",
  },
  [TranslationId.Installed]: {
    en: "Installed",
    pt: "Instalado",
    es: "Instalado",
  },
  [TranslationId.Similar]: {
    en: "Similar",
    pt: "Semelhante",
    es: "Semejante",
  },
  [TranslationId.ShowMore]: {
    en: "Show More",
    pt: "Mostrar Mais",
    es: "Mostrar más",
  },
  [TranslationId.SendFeedbackAnonymously]: {
    en: "Send Feedback Anonymously",
    pt: "Enviar Comentários Anonimamente",
    es: "Enviar Comentarios Anónimamente",
  },
  [TranslationId.ProjectOnGitHub]: {
    en: "Project on GitHub",
    pt: "Projeto no GitHub",
    es: "Proyecto en GitHub",
  },
  [TranslationId.ToggleDarkMode]: {
    en: "Toggle Dark Mode",
    pt: "Alternar Modo Escuro",
    es: "Alternar Modo Oscuro",
  },
  [TranslationId.CopiedToClipboard]: {
    en: "Copied to clipboard!",
    pt: "Copiado para a área de transferência!",
    es: "¡Copiado al portapapeles!",
  },
  [TranslationId.NoSimilarPackagesFound]: {
    en: "No similar packages found.",
    pt: "Nenhum pacote semelhante encontrado.",
    es: "No se encontraron paquetes similares.",
  },
  [TranslationId.TourTitle]: {
    en: "Your package.json",
    pt: "Seu package.json",
    es: "Su paquete.json",
  },
  [TranslationId.TourIntro]: {
    en: "Paste or drop here your package.json to get suggestions for each dependency!",
    pt: "Cole ou solte aqui seu package.json para obter sugestões para cada dependência!",
    es: "¡Pegue o suelte aquí su paquete.json para obtener sugerencias para cada dependencia!",
  },
  [TranslationId.LicenseName]: {
    en: "{{licenseName}} License",
    pt: "Licença {{licenseName}}",
    es: "Licencia {{licenseName}}",
  },
  [TranslationId.Licenses]: {
    en: "Licenses",
    pt: "Licenças",
    es: "Licencias",
  },
  [TranslationId.License]: {
    en: "License",
    pt: "Licença",
    es: "Licencia",
  },
  [TranslationId.ClickToReadAboutLicense]: {
    en: "Click to read about this license",
    pt: "Clique para ler sobre esta licença",
    es: "Haga clic para leer sobre esta licencia",
  },
  [TranslationId.OpenReadme]: {
    en: "Open Readme",
    pt: "Abrir Leiame",
    es: "Abrir Léame",
  },
  [TranslationId.ReadmeFromPackage]: {
    en: "{{packageName}}'s readme",
    pt: "Leiame de {{packageName}}",
    es: "Léame de {{packageName}}",
  },
  [TranslationId.ExploreFiles]: {
    en: "Explore Files",
    pt: "Explorar Arquivos",
    es: "Explorar Archivos",
  },
  [TranslationId.FilesFromPackage]: {
    en: "{{packageName}}'s files",
    pt: "Arquivos de {{packageName}}",
    es: "Archivos de {{packageName}}",
  },
};

export function getTranslation(translationId: TranslationId) {
  return translations[translationId][preferredLocale];
}
