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
  href="https://bundlephobia.com/package/{packageName}"
  target="_blank"
  rel="noreferrer"
  onclick={(event) => {
    event.preventDefault();

    openWinBox({
      url: event.currentTarget.href,
        title: `${packageName}'s bundle size`,
    })}}
>
  <img
    onerror={handleImageError}
    data-src="https://img.shields.io/bundlephobia/minzip/{packageName}?color=success&label=size&style=flat"
    alt="Bundle Size"
    class="lazy"
  />
</a>
