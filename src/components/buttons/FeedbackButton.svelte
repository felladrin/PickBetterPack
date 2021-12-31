<script>
  import { openWinBox } from "../../functions/openWinBox";
</script>

<button
  class="btn btn-sm feedback"
  aria-label="Send feedback"
  type="button"
  on:click={() =>
    openWinBox({
      url: `https://felladrin.typeform.com/to/S3VBDdJz`,
      title: `Feedback`,
    })}
>
  Feedback
</button>

<style>
  button.feedback {
    position: fixed;
    bottom: -2px;
    left: 3em;
    padding: 4px 7px;
    z-index: 1001;
    transition: all 0.2s ease-in-out;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -webkit-appearance: none;
  }
</style>
