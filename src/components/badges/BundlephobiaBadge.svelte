<script>
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../../constants/lazyLoad";

  export let packageName = "npm";

  afterUpdate(() => lazyLoad.update());
</script>

<a
  href="https://bundlephobia.com/package/{packageName}"
  target="_blank"
  rel="noreferrer"
  on:click|preventDefault={({ currentTarget }) =>
    openWinBox({
      url: currentTarget.href,
      title: `${packageName}'s bundle size`,
    })}
>
  <img
    on:error={handleImageError}
    data-src="https://img.shields.io/bundlephobia/minzip/{packageName}?color=success&label=size&style=flat"
    alt="Bundle Size"
    class="lazy"
  />
</a>
