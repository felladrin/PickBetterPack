<script>
  import { fetchPackage } from "../../functions/fetchPackage";
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../../constants/lazyLoad";

  export let packageName = "npm";

  afterUpdate(() => lazyLoad.update());
</script>

<a
  href="https://spdx.org/licenses"
  title="Click to read about this license"
  target="_blank"
  on:click|preventDefault={async ({ currentTarget }) => {
    try {
      const { default: packageLicenseTypes } = await import(
        "package-license-types"
      );

      const packageManifest = await fetchPackage(packageName);

      /** @type string[] */
      const licenses = packageLicenseTypes(packageManifest);

      if (licenses.length === 0) throw new Error();

      licenses.forEach((license) => {
        openWinBox({
          url: `https://spdx.org/licenses/${license}.html#licenseText`,
          title: `${license} License`,
        });
      });
    } catch {
      openWinBox({
        url: currentTarget.href,
        title: "Licenses",
      });
    }
  }}
>
  <img
    on:error={handleImageError}
    data-src="https://badgen.net/npm/license/{packageName}"
    alt="License"
    class="lazy"
  />
</a>
