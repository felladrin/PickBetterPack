import packageJson from "../../package.json";

export function logConsoleBadge() {
  const repositoryShortLink = "https://git.io/Jy55I";
  
  if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    const consoleCss = {
      separator: "background: #603515; padding:5px 0;",
      text: "color: #9d6432; background: #030307; padding:5px 0;",
    };
    console.log(
      ...[
        `\n %c %c PickBetterPack ${packageJson.version} %c %c ${repositoryShortLink} %c \n`,
        consoleCss.separator,
        consoleCss.text,
        consoleCss.separator,
        consoleCss.text,
        consoleCss.separator,
      ]
    );
  } else if (console) {
    console.log(`PickBetterPack ${packageJson.version} | ${repositoryShortLink}`);
  }
}
