<script>
  import Fa from "svelte-fa";
  import { faCommentDots, faMoon } from "@fortawesome/free-solid-svg-icons";
  import { faGithub } from "@fortawesome/free-brands-svg-icons";
  import { openWinBox } from "../../functions/openWinBox";
  import halfmoon from "halfmoon";
</script>

<div class="btn-group-vertical btn-group-sm floating-side-buttons" role="group">
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
    data-title="Send Feedback Anonymously"
    aria-label="Send Feedback Anonymously"
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
    data-title="Project on GitHub"
    aria-label="Project on GitHub"
  >
    <Fa icon={faGithub} />
  </a>
  <button
    class="btn"
    type="button"
    on:click={() => halfmoon.toggleDarkMode()}
    data-toggle="tooltip"
    data-placement="right"
    data-title="Toggle Dark Mode"
    aria-label="Toggle Dark Mode"
  >
    <Fa icon={faMoon} />
  </button>
</div>

<style>
  .floating-side-buttons {
    position: fixed;
    left: -2px;
    top: 4em;
    z-index: 1001;
  }

  .floating-side-buttons .btn {
    padding: 4px 7px;
    transition: all 0.2s ease-in-out;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -webkit-appearance: none;
  }
</style>
