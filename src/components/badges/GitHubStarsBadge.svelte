<script>
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../../constants/lazyLoad";
  import parseGitHubUrl from "github-url-to-object";

  export let gitHubUrl = "https://github.com/user/repo";
  const { user, repo } = parseGitHubUrl(gitHubUrl);
  const repositoryId = `${user}/${repo}`.toLowerCase();

  afterUpdate(() => lazyLoad.update());
</script>

<a
  href={`https://api.star-history.com/svg?repos=${repositoryId}&type=Date`}
  target="_blank"
  rel="noreferrer"
  on:click|preventDefault={({ currentTarget }) =>
    openWinBox({
      url: currentTarget.href,
      title: `${repositoryId}'s star history`,
    })}
>
  <img
    on:error={handleImageError}
    data-src="https://img.shields.io/github/stars/{repositoryId}.svg?style=flat"
    alt="Stars on GitHub"
    class="lazy"
  />
</a>
