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
      url: `https://runkit-packages.com/16.x.x/${Date.now()}/${packageName}`,
      title: pupa(getTranslation(TranslationId.ReadmeFromPackage), {
        packageName,
      }),
    })}
>
  {getTranslation(TranslationId.OpenReadme)}
</button>
