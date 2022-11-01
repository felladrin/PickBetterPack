<script>
  import { openWinBox } from "../../functions/openWinBox";
  import Fa from "svelte-fa";
  import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

  export let packageName = "npm";
</script>

<a
  href="https://npm.runkit.com/{packageName}"
  target="_blank"
  rel="noreferrer"
  class="btn btn-sm"
  role="button"
  on:click|preventDefault={({ currentTarget }) =>
    openWinBox({
      url: currentTarget.href,
      title: `Try ${packageName}`,
    })}
>
  <Fa icon={faPlayCircle} />
</a>
