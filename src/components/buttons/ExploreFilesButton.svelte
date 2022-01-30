<script>
  import pupa from "pupa";
  import { openWinBox } from "../../functions/openWinBox";
  import { getTranslation, TranslationId } from "../../modules/translations";

  export let packageName = "npm";
</script>

<button
  class="btn btn-sm"
  type="button"
  on:click={() =>
    openWinBox({
      url: `https://www.runpkg.com/?${packageName}/`,
      title: pupa(getTranslation(TranslationId.FilesFromPackage), {
        packageName,
      }),
    })}
>
  {getTranslation(TranslationId.ExploreFiles)}
</button>
