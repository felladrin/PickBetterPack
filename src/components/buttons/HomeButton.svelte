<script lang="ts">
  import Fa from "svelte-fa";
  import { faHome } from "@fortawesome/free-solid-svg-icons";

  const { href = "#" } = $props<{
    href?: string;
  }>();
</script>

<a {href} target="_blank" rel="noreferrer" class="btn btn-sm" role="button">
  <Fa icon={faHome} />
</a>
