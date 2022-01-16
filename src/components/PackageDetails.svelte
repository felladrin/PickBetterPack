<script lang="ts">
  import LicenseBadge from "./badges/LicenseBadge.svelte";
  import MonthlyDownloadsBadge from "./badges/MonthlyDownloadsBadge.svelte";
  import TypesAvailabilityBadge from "./badges/TypesAvailabilityBadge.svelte";
  import ExploreFilesButton from "./buttons/ExploreFilesButton.svelte";
  import OpenReadmeButton from "./buttons/OpenReadmeButton.svelte";
  import formatToRelativeTime from "s-ago";
  import halfmoon from "halfmoon";
  import { copyTextToClipboard } from "../functions/copyTextToClipboard";
  import { handleImageError } from "../functions/handleImageError";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../constants/lazyLoad";
  import HomeButton from "./buttons/HomeButton.svelte";
  import RepositoryButton from "./buttons/RepositoryButton.svelte";
  import NpmButton from "./buttons/NpmButton.svelte";
  import RunkitButton from "./buttons/RunKitButton.svelte";
  import type { SearchResult } from "../types/npms";

  export let packageSearchResult: SearchResult;

  afterUpdate(() => lazyLoad.update());

  function getGithubContributorsImageUrl(repositoryUrl = "", maxImages = 0) {
    const matches = repositoryUrl.match(
      "^(https|git)(://|@)([^/:]+)[/:]([^/:]+)/(.+)"
    );
    const owner = matches[4];
    const repo = matches[5];
    let url = `https://contrib.rocks/image?repo=${owner}/${repo}`;
    if (maxImages > 0) {
      url = url.concat(`&max=${maxImages}`);
    }
    return url;
  }

  function getGithubContributorsPageUrl(repositoryUrl = "") {
    const matches = repositoryUrl.match(
      "^(https|git)(://|@)([^/:]+)[/:]([^/:]+)/(.+)"
    );
    const owner = matches[4];
    const repo = matches[5];
    return `https://github.com/${owner}/${repo}/graphs/contributors`;
  }
</script>

<details class="collapse-panel" data-test-id="package-details">
  <summary class="collapse-header">
    <div class="container-fluid">
      <div class="row">
        <div class="col text-truncate d-inline-block w-300">
          <strong>{packageSearchResult.package.name}</strong>
          <span class="text-muted">
            {packageSearchResult.package.description}
          </span>
        </div>
      </div>
    </div>
  </summary>
  <div class="collapse-content">
    <div class="container w-300">
      <div class="row">
        <div class="col text-center">
          <MonthlyDownloadsBadge
            packageName={packageSearchResult.package.name}
          />
          <LicenseBadge packageName={packageSearchResult.package.name} /> <br />
          <a
            target="_blank"
            href={`https://snyk.io/test/npm/${packageSearchResult.package.name}`}
          >
            <img
              on:error={handleImageError}
              data-src={`https://snyk.io/test/npm/${packageSearchResult.package.name}/badge.svg`}
              alt="Known Vulnerabilities"
              class="lazy"
            />
          </a>
          <TypesAvailabilityBadge
            packageName={packageSearchResult.package.name}
          />
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <p class="text-wrap text-center">
            {#if packageSearchResult.package.links.repository && /github/i.test(packageSearchResult.package.links.repository)}
              <a
                href={getGithubContributorsPageUrl(
                  packageSearchResult.package.links.repository
                )}
                target="_blank"
                class="text-decoration-none"
              >
                <img
                  on:error={handleImageError}
                  data-src={getGithubContributorsImageUrl(
                    packageSearchResult.package.links.repository,
                    12
                  )}
                  alt="Contributors"
                  class="lazy img-fluid"
                  style="max-height: 32px;"
                />
              </a>
              <br />
            {/if}
            {packageSearchResult.package.description}
            <br />
            <span class="badge-group mt-5" role="group">
              <a
                href="https://www.npmjs.com/package/{packageSearchResult.package
                  .name}?activeTab=versions"
                target="_blank"
                class="badge badge-pill"
                >v{packageSearchResult.package.version}
              </a>
              <a
                href="https://www.npmjs.com/package/{packageSearchResult.package
                  .name}?activeTab=versions"
                target="_blank"
                class="badge badge-pill"
                >{formatToRelativeTime(
                  new Date(packageSearchResult.package.date)
                )}
              </a>
            </span>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <NpmButton packageName={packageSearchResult.package.name} />
          <span class="ml-10" />
          {#if packageSearchResult.package.links.homepage && !packageSearchResult.package.links.homepage.includes(packageSearchResult.package.links.repository ?? "#readme")}
            <HomeButton href={packageSearchResult.package.links.homepage} />
            <span class="ml-10" />
          {/if}
          {#if packageSearchResult.package.links.repository}
            <RepositoryButton
              href={packageSearchResult.package.links.repository}
            />
            <span class="ml-10" />
          {/if}
          <RunkitButton packageName={packageSearchResult.package.name} />
        </div>
      </div>
      <div class="row mt-10">
        <div class="col d-flex justify-content-center">
          <div class="input-group w-200">
            <div class="input-group-prepend">
              <span class="input-group-text"> > </span>
            </div>
            <input
              type="text"
              class="form-control"
              value={`npm i ${packageSearchResult.package.name}`}
              on:click={({ currentTarget }) => {
                currentTarget.select();
                if (navigator.clipboard) {
                  copyTextToClipboard(currentTarget.value);
                  halfmoon.initStickyAlert({
                    title: "Copied to clipboard!",
                    content: currentTarget.value,
                  });
                }
              }}
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              data-gramm="false"
            />
          </div>
        </div>
      </div>
      <div class="row mt-10">
        <div class="col d-flex justify-content-center">
          <OpenReadmeButton packageName={packageSearchResult.package.name} />
          <span class="ml-10" />
          <ExploreFilesButton packageName={packageSearchResult.package.name} />
        </div>
      </div>
    </div>
  </div>
</details>
