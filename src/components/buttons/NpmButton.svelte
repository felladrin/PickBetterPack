<script lang="ts">
  import Fa from "svelte-fa";
  import { faNpm } from "@fortawesome/free-brands-svg-icons";

  const { packageName = "npm" } = $props<{
    packageName?: string;
  }>();
</script>

<a
  href="https://www.npmjs.com/package/{packageName}"
  target="_blank"
  rel="noreferrer"
  class="btn btn-sm"
  role="button"
>
  <Fa icon={faNpm} size="2x" />
</a>
