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
  href="https://npmcharts.com/compare/{packageName}?minimal=true"
  target="_blank"
  rel="noreferrer"
  onclick={(event) => {
    event.preventDefault();

    openWinBox({
      url: event.currentTarget.href,
      title: `${packageName}'s downloads chart`,
    });
  }}
>
  <img
    onerror={handleImageError}
    data-src="https://badgen.net/npm/dm/{packageName}"
    alt="Monthly Downloads"
    class="lazy"
  />
</a>
