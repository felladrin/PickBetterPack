<script>
  import Fa from "svelte-fa";
  import {
    faCommentDots,
    faMoon,
    faGlobe,
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
    data-title={$t("language-selection")}
    aria-label={$t("language-selection")}
  >
    <Fa icon={faGlobe} />
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
    data-title={$t("send-feedback-anonymously")}
    aria-label={$t("send-feedback-anonymously")}
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
    data-title={$t("project-on-git-hub")}
    aria-label={$t("project-on-git-hub")}
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
    data-title={$t("toggle-dark-mode")}
    aria-label={$t("toggle-dark-mode")}
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
