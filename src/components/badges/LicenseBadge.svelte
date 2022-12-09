<script lang="ts">
  import { analyzePackage } from "../../functions/analyzePackage";
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../../constants/lazyLoad";
  import { t } from "svelte-i18n";

  export let packageName = "npm";

  afterUpdate(() => lazyLoad.update());

  async function handleClick({
    currentTarget,
  }: {
    currentTarget: EventTarget & HTMLAnchorElement;
  }) {
    const openDefaultLicensesPage = () => {
      openWinBox({
        url: currentTarget.href,
        title: $t("licenses"),
      });
    }

    try {
      const { default: packageLicenseTypes } = await import(
        "package-license-types"
      );

      const packageAnalysis = await analyzePackage(packageName);

      const licenses = packageLicenseTypes(packageAnalysis);

      if (licenses.length === 0) {
        openDefaultLicensesPage();
      } else {
        licenses.forEach((licenseName) => {
          openWinBox({
            url: `https://spdx.org/licenses/${licenseName}.html#licenseText`,
            title: $t("licenseName", { values: { licenseName } }),
          });
        });
      }
    } catch {
      openDefaultLicensesPage();
    }
  }
</script>

<a
  href="https://spdx.org/licenses"
  title={$t("clickToReadAboutLicense")}
  target="_blank"
  rel="noreferrer"
  on:click|preventDefault={handleClick}
>
  <img
    on:error={handleImageError}
    data-src="https://badgen.net/npm/license/{packageName}"
    alt={$t("license")}
    class="lazy"
  />
</a>
