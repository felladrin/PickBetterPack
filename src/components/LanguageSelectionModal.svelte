<script>
  import { locale, locales, t } from "svelte-i18n";
  import ISO6391 from "iso-639-1";
</script>

<div class="modal" id="modal-language" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <h5 class="modal-title">{$t("languageSelection")}</h5>
      <select class="form-control" bind:value={$locale}>
        {#each $locales as localeCode}
          <option value={localeCode}>{ISO6391.getNativeName(localeCode)}</option
          >
        {/each}
      </select>
      <div class="text-right mt-20">
        <button class="btn" data-toggle="modal" data-target="modal-language">
          {$t("close")}
        </button>
      </div>
    </div>
  </div>
</div>
