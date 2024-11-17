<script lang="ts">
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { lazyLoad } from "../../constants/lazyLoad";

  const { packageName = "npm" } = $props<{
    packageName?: string;
  }>();

  $effect(() => lazyLoad.update());
</script>

<a
  href="https://www.jsdocs.io/package/{packageName}#package-index"
  target="_blank"
  rel="noreferrer"
  onclick={(event) => {
    event.preventDefault();

    openWinBox({
      url: event.currentTarget.href,
      title: `${packageName}'s types`,
    });
  }}
>
  <img
    onerror={handleImageError}
    data-src="https://badgen.net/npm/types/{packageName}"
    alt="Types Availability"
    class="lazy"
  />
</a>
