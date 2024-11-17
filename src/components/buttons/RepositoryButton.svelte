<script lang="ts">
  import Fa from "svelte-fa";
  import {
    faGitAlt,
    faGithub,
    faGitlab,
  } from "@fortawesome/free-brands-svg-icons";

  const { href = "#" } = $props<{
    href?: string;
  }>();
</script>

<a {href} target="_blank" rel="noreferrer" class="btn btn-sm" role="button">
  {#if /github/i.test(href)}
    <Fa icon={faGithub} />
  {:else if /gitlab/i.test(href)}
    <Fa icon={faGitlab} />
  {:else}
    <Fa icon={faGitAlt} />
  {/if}
</a>
