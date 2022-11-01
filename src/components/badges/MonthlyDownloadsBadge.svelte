<script>
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../../constants/lazyLoad";

  export let packageName = "npm";

  afterUpdate(() => lazyLoad.update());
</script>

<a
  href="https://npmcharts.com/compare/{packageName}?minimal=true"
  target="_blank"
  rel="noreferrer"
  on:click|preventDefault={({ currentTarget }) =>
    openWinBox({
      url: currentTarget.href,
      title: `${packageName}'s downloads chart`,
    })}
>
  <img
    on:error={handleImageError}
    data-src="https://badgen.net/npm/dm/{packageName}"
    alt="Monthly Downloads"
    class="lazy"
  />
</a>
