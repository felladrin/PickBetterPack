<script lang="ts">
  import { t } from "svelte-i18n";
  import { openWinBox } from "../../functions/openWinBox";

  const { packageName = "npm" } = $props<{
    packageName?: string;
  }>();
</script>

<button
  class="btn btn-sm"
  type="button"
  onclick={() =>
    openWinBox({
      url: `https://www.runpkg.com/?${packageName}/`,
      title: $t("filesFromPackage", { values: { packageName } }),
    })}
>
  {$t("exploreFiles")}
</button>
