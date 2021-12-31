<script>
  import { openWinBox } from "../../functions/openWinBox";

  export let packageName = "npm";
</script>

<button
  class="btn btn-sm"
  type="button"
  on:click={() =>
    openWinBox({
      url: `https://www.runpkg.com/?${packageName}/`,
      title: `${packageName}'s files`,
    })}
>
  Explore Files
</button>
