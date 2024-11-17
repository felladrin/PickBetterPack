<script lang="ts">
  import { analyzePackage } from "../../functions/analyzePackage";
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { lazyLoad } from "../../constants/lazyLoad";
  import { t } from "svelte-i18n";

  const { packageName = "npm" } = $props<{
    packageName?: string;
  }>();

  $effect(() => lazyLoad.update());

  async function handleClick(event: MouseEvent) {
    event.preventDefault();

    const currentTarget = event.currentTarget as HTMLAnchorElement;

    const openDefaultLicensesPage = () => {
      openWinBox({
        url: currentTarget.href,
        title: $t("licenses"),
      });
    };

    try {
      const { default: packageLicenseTypes } = await import(
        "package-license-types"
      );

      const packageAnalysis = await analyzePackage(packageName);

      const licenses = packageLicenseTypes(packageAnalysis);

      if (licenses.length === 0) {
        openDefaultLicensesPage();
      } else {
        for (const licenseName of licenses) {
          openWinBox({
            url: `https://spdx.org/licenses/${licenseName}.html#licenseText`,
            title: $t("licenseName", { values: { licenseName } }),
          });
        }
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
  onclick={handleClick}
>
  <img
    onerror={handleImageError}
    data-src="https://badgen.net/npm/license/{packageName}"
    alt={$t("license")}
    class="lazy"
  />
</a>
