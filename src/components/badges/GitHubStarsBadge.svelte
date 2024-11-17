<script lang="ts">
  import { handleImageError } from "../../functions/handleImageError";
  import { openWinBox } from "../../functions/openWinBox";
  import { lazyLoad } from "../../constants/lazyLoad";
  import parseGitHubUrl from "github-url-to-object";

  const { gitHubUrl = "https://github.com/user/repo" } = $props<{
    gitHubUrl?: string;
  }>();
  const { user, repo } = parseGitHubUrl(gitHubUrl);
  const repositoryId = `${user}/${repo}`.toLowerCase();

  $effect(() => lazyLoad.update());
</script>

<a
  href={`https://api.star-history.com/svg?repos=${repositoryId}&type=Date`}
  target="_blank"
  rel="noreferrer"
  onclick={(event) => {
    event.preventDefault();

    openWinBox({
      url: event.currentTarget.href,
      title: `${repositoryId}'s star history`,
    });
  }}
>
  <img
    onerror={handleImageError}
    data-src="https://img.shields.io/github/stars/{repositoryId}.svg?style=flat"
    alt="Stars on GitHub"
    class="lazy"
  />
</a>
