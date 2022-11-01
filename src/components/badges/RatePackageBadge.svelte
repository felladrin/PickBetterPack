<script>
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../../constants/lazyLoad";

  export let packageName = "npm";

  afterUpdate(() => lazyLoad.update());
</script>

<a
  href="https://openbase.com/js/{packageName}/reviews?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge"
  target="_blank"
  rel="noreferrer"
  on:click|preventDefault={({ currentTarget }) =>
    openWinBox({
      url: currentTarget.href,
      title: `${packageName}'s reviews`,
    })}
>
  <img
    on:error={handleImageError}
    data-src="https://badges.openbase.com/js/rating/{packageName}.svg"
    alt="Rating on Openbase"
    class="lazy"
  />
</a>
