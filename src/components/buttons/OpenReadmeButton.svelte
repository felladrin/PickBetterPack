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
      url: `https://runkit-packages.com/16.x.x/${Date.now()}/${packageName}`,
      title: $t("readmeFromPackage", { values: { packageName } }),
    })}
>
  {$t("openReadme")}
</button>
