<script>
  import Fa from "svelte-fa";
  import { faNpm } from "@fortawesome/free-brands-svg-icons";

  export let packageName = "npm";
</script>

<a
  href="https://www.npmjs.com/package/{packageName}"
  target="_blank"
  class="btn btn-sm"
  role="button"
>
  <Fa icon={faNpm} size="2x" />
</a>
