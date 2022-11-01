<script>
  import Fa from "svelte-fa";
  import { faHome } from "@fortawesome/free-solid-svg-icons";

  export let href = "#";
</script>

<a {href} target="_blank" rel="noreferrer" class="btn btn-sm" role="button">
  <Fa icon={faHome} />
</a>
