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
  href="https://www.jsdocs.io/package/{packageName}#package-index"
  target="_blank"
  on:click|preventDefault={async ({ currentTarget }) => {
    const packageManifest = await fetchPackage(packageName);

    let url = currentTarget.href;

    if (!packageManifest.types && !packageManifest.typings) {
      try {
        const packageTypesManifest = await fetchPackage(
          `@types/${packageName}`
        );
        if (packageTypesManifest?.name) {
          url = `https://www.jsdocs.io/package/${packageTypesManifest.name}#package-index`;
        }
      } catch {}
    }

    openWinBox({
      url,
      title: `${packageName}'s types`,
    });
  }}
>
  <img
    on:error={handleImageError}
    data-src="https://badgen.net/npm/types/{packageName}"
    alt="Types Availability"
    class="lazy"
  />
</a>
