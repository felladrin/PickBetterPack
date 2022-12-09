<script>
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
  rel="noreferrer"
  on:click|preventDefault={({ currentTarget }) => {
    openWinBox({ url: currentTarget.href, title: `${packageName}'s types` });
  }}
>
  <img
    on:error={handleImageError}
    data-src="https://badgen.net/npm/types/{packageName}"
    alt="Types Availability"
    class="lazy"
  />
</a>
