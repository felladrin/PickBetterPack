<script>
  import { t } from "svelte-i18n";
  import { openWinBox } from "../../functions/openWinBox";

  export let packageName = "npm";
</script>

<button
  class="btn btn-sm"
  type="button"
  on:click={() =>
    openWinBox({
      url: `https://runkit-packages.com/16.x.x/${Date.now()}/${packageName}`,
      title: $t("readme-from-package", { values: { packageName } }),
    })}
>
  {$t("open-readme")}
</button>
