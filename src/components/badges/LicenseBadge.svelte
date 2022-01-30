<script lang="ts">
  import { analyzePackage } from "../../functions/analyzePackage";
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../../constants/lazyLoad";
  import { getTranslation, TranslationId } from "../../modules/translations";
  import pupa from "pupa";

  export let packageName = "npm";

  afterUpdate(() => lazyLoad.update());

  async function handleClick({
    currentTarget,
  }: {
    currentTarget: EventTarget & HTMLAnchorElement;
  }) {
    try {
      const { default: packageLicenseTypes } = await import(
        "package-license-types"
      );

      const packageAnalysis = await analyzePackage(packageName);

      const licenses = packageLicenseTypes(packageAnalysis.collected.metadata);

      if (licenses.length === 0) throw new Error();

      licenses.forEach((licenseName) => {
        openWinBox({
          url: `https://spdx.org/licenses/${licenseName}.html#licenseText`,
          title: pupa(getTranslation(TranslationId.LicenseName), {
            licenseName,
          }),
        });
      });
    } catch {
      openWinBox({
        url: currentTarget.href,
        title: getTranslation(TranslationId.Licenses),
      });
    }
  }
</script>

<a
  href="https://spdx.org/licenses"
  title={getTranslation(TranslationId.ClickToReadAboutLicense)}
  target="_blank"
  on:click|preventDefault={handleClick}
>
  <img
    on:error={handleImageError}
    data-src="https://badgen.net/npm/license/{packageName}"
    alt={getTranslation(TranslationId.License)}
    class="lazy"
  />
</a>
