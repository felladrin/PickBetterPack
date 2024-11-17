<script lang="ts">
  import { openWinBox } from "../../functions/openWinBox";
  import Fa from "svelte-fa";
  import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

  const { packageName = "npm" } = $props<{
    packageName?: string;
  }>();
</script>

<a
  href="https://npm.runkit.com/{packageName}"
  target="_blank"
  rel="noreferrer"
  class="btn btn-sm"
  role="button"
  onclick={(event) => {
    event.preventDefault();

    openWinBox({
      url: event.currentTarget.href,
      title: `Try ${packageName}`,
    });
  }}
>
  <Fa icon={faPlayCircle} />
</a>
