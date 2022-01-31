<script>
  import Fa from "svelte-fa";
  import {
    faCommentDots,
    faMoon,
    faLanguage,
  } from "@fortawesome/free-solid-svg-icons";
  import { faGithub } from "@fortawesome/free-brands-svg-icons";
  import { openWinBox } from "../../functions/openWinBox";
  import halfmoon from "halfmoon";
  import { t } from "svelte-i18n";
</script>

<div class="btn-group-vertical btn-group-sm floating-side-buttons" role="group">
  <button
    class="btn"
    type="button"
    on:click={() => halfmoon.toggleModal("modal-language")}
    data-toggle="tooltip"
    data-placement="right"
    data-title={$t("languageSelection")}
    aria-label={$t("languageSelection")}
  >
    <Fa icon={faLanguage} />
  </button>
  <button
    class="btn"
    type="button"
    on:click={() =>
      openWinBox({
        url: `https://bit.ly/32VpLfA`,
        title: `Feedback`,
      })}
    data-toggle="tooltip"
    data-placement="right"
    data-title={$t("sendFeedbackAnonymously")}
    aria-label={$t("sendFeedbackAnonymously")}
  >
    <Fa icon={faCommentDots} />
  </button>
  <a
    href="https://git.io/Jy55I"
    target="_blank"
    class="btn"
    role="button"
    data-toggle="tooltip"
    data-placement="right"
    data-title={$t("projectOnGithub")}
    aria-label={$t("projectOnGithub")}
  >
    <Fa icon={faGithub} />
  </a>
  <button
    class="btn"
    type="button"
    on:click={() => halfmoon.toggleDarkMode()}
    data-test-id="toggle-dark-mode-button"
    data-toggle="tooltip"
    data-placement="right"
    data-title={$t("toggleDarkMode")}
    aria-label={$t("toggleDarkMode")}
  >
    <Fa icon={faMoon} />
  </button>
</div>

<style>
  .floating-side-buttons {
    position: fixed;
    left: -2px;
    top: 4em;
    z-index: 1;
  }

  .floating-side-buttons .btn {
    padding: 4px 7px;
    transition: all 0.2s ease-in-out;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -webkit-appearance: none;
  }
</style>
