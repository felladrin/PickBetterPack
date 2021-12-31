<script>
  import LicenseBadge from "./badges/LicenseBadge.svelte";
  import MonthlyDownloadsBadge from "./badges/MonthlyDownloadsBadge.svelte";
  import TypesAvailabilityBadge from "./badges/TypesAvailabilityBadge.svelte";
  import ExploreFilesButton from "./buttons/ExploreFilesButton.svelte";
  import OpenReadmeButton from "./buttons/OpenReadmeButton.svelte";
  import { dependenciesFromPackage } from "../stores/dependenciesFromPackage";
  import formatToRelativeTime from "s-ago";
  import halfmoon from "halfmoon";
  import { copyTextToClipboard } from "../functions/copyTextToClipboard";
  import { getSimilarPackagesNames } from "../functions/getSimilarPackagesNames";
  import { fetchPackage } from "../functions/fetchPackage";
  import { handleImageError } from "../functions/handleImageError";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../constants/lazyLoad";
  import HomeButton from "./buttons/HomeButton.svelte";
  import RepositoryButton from "./buttons/RepositoryButton.svelte";
  import NpmButton from "./buttons/NpmButton.svelte";
  import RunkitButton from "./buttons/RunKitButton.svelte";

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

{#if Object.keys($dependenciesFromPackage).length > 0}
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th class="text-center">Installed</th>
          <th class="text-center">Similar</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.keys($dependenciesFromPackage) as key}
          {#each $dependenciesFromPackage[key] as dependencyName}
            {#if dependencyName.length > 0 && !dependencyName.startsWith("@types/")}
              <tr>
                <td>
                  {#await fetchPackage(dependencyName)}
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-animated"
                        role="progressbar"
                        style={`width: 100%`}
                      />
                    </div>
                  {:then packageResult}
                    {#if packageResult.hasOwnProperty("error")}
                      <details class="collapse-panel">
                        <summary class="collapse-header">
                          <div class="container-fluid">
                            <div class="row">
                              <div
                                class="col text-left text-truncate d-inline-block w-200"
                              >
                                <strong>{dependencyName}</strong>
                              </div>
                            </div>
                          </div></summary
                        >
                        <div class="collapse-content">
                          <a
                            target="_blank"
                            href={`https://www.npmjs.com/package/${dependencyName}`}
                          >
                            <img
                              on:error={handleImageError}
                              data-src={`https://badgen.net/npm/v/${dependencyName}`}
                              alt="NPM Page"
                              class="lazy"
                            />
                          </a>
                        </div>
                      </details>
                    {:else if !packageResult}
                      <summary class="collapse-header">
                        <strong>{dependencyName}</strong> was not found on NPM.
                      </summary>
                    {:else}
                      <details class="collapse-panel">
                        <summary class="collapse-header">
                          <div class="container-fluid">
                            <div class="row">
                              <div
                                class="col text-left text-truncate d-inline-block w-200"
                              >
                                <strong>{packageResult.package.name}</strong>
                                <span class="text-muted">
                                  {packageResult.package.version}
                                </span>
                                <br />
                                <span class="text-muted">
                                  {packageResult.package.description}
                                </span>
                              </div>
                              <div class="col text-right">
                                <span class="text-muted">
                                  {formatToRelativeTime(
                                    new Date(packageResult.package.date)
                                  )}
                                </span>
                                <br />
                                <span class="text-muted">
                                  {#if packageResult.package.links.repository && /github/i.test(packageResult.package.links.repository)}
                                    <img
                                      on:error={handleImageError}
                                      data-src={getGithubContributorsImageUrl(
                                        packageResult.package.links.repository,
                                        3
                                      )}
                                      alt="Contributors"
                                      class="mr-5 lazy"
                                      height="14"
                                    />
                                  {:else}
                                    by {packageResult.package.publisher
                                      .username}
                                  {/if}
                                </span>
                              </div>
                            </div>
                          </div>
                        </summary>
                        <div class="collapse-content">
                          <div class="container-fluid">
                            <div class="row">
                              <div class="col text-center">
                                <MonthlyDownloadsBadge
                                  packageName={packageResult.package.name}
                                />
                                <LicenseBadge
                                  packageName={packageResult.package.name}
                                />
                                <br />
                                <a
                                  target="_blank"
                                  href={`https://snyk.io/test/npm/${packageResult.package.name}`}
                                >
                                  <img
                                    on:error={handleImageError}
                                    data-src={`https://snyk.io/test/npm/${packageResult.package.name}/badge.svg`}
                                    alt="Known Vulnerabilities"
                                    class="lazy"
                                  />
                                </a>
                                <TypesAvailabilityBadge
                                  packageName={packageResult.package.name}
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col d-flex justify-content-center">
                                <p class="w-300 text-wrap text-center">
                                  {#if packageResult.package.links.repository && /github/i.test(packageResult.package.links.repository)}
                                    <a
                                      href={getGithubContributorsPageUrl(
                                        packageResult.package.links.repository
                                      )}
                                      target="_blank"
                                      class="text-decoration-none"
                                    >
                                      <img
                                        on:error={handleImageError}
                                        data-src={getGithubContributorsImageUrl(
                                          packageResult.package.links
                                            .repository,
                                          12
                                        )}
                                        alt="Contributors"
                                        class="lazy img-fluid"
                                        style="max-height: 32px;"
                                      />
                                    </a>
                                    <br />
                                  {/if}
                                  {packageResult.package.description}
                                </p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col d-flex justify-content-center">
                                <NpmButton
                                  packageName={packageResult.package.name}
                                />
                                <span class="ml-10" />
                                {#if packageResult.package.links.homepage && !packageResult.package.links.homepage.includes(packageResult.package.links.repository ?? "#readme")}
                                  <HomeButton
                                    href={packageResult.package.links.homepage}
                                  />
                                  <span class="ml-10" />
                                {/if}
                                {#if packageResult.package.links.repository}
                                  <RepositoryButton
                                    href={packageResult.package.links
                                      .repository}
                                  />
                                  <span class="ml-10" />
                                {/if}
                                <RunkitButton
                                  packageName={packageResult.package.name}
                                />
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
                                    value={`npm i ${packageResult.package.name}`}
                                    on:click={({ currentTarget }) => {
                                      currentTarget.select();
                                      if (navigator.clipboard) {
                                        copyTextToClipboard(
                                          currentTarget.value
                                        );
                                      } else {
                                        currentTarget.setSelectionRange?.(
                                          0,
                                          currentTarget.value.length
                                        );
                                        document.execCommand("copy");
                                      }
                                      halfmoon.initStickyAlert({
                                        title: "Copied to clipboard!",
                                        content: currentTarget.value,
                                      });
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
                                <OpenReadmeButton
                                  packageName={packageResult.package.name}
                                />
                                <span class="ml-10" />
                                <ExploreFilesButton
                                  packageName={packageResult.package.name}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </details>
                    {/if}
                  {:catch}
                    <details class="collapse-panel">
                      <summary class="collapse-header">
                        <div class="container-fluid">
                          <div class="row">
                            <div
                              class="col text-left text-truncate d-inline-block w-200"
                            >
                              <strong>{dependencyName}</strong>
                            </div>
                          </div>
                        </div></summary
                      >
                      <div class="collapse-content">
                        <a
                          target="_blank"
                          href={`https://www.npmjs.com/package/${dependencyName}`}
                        >
                          <img
                            on:error={handleImageError}
                            data-src={`https://badgen.net/npm/v/${dependencyName}`}
                            alt="NPM Page"
                            class="lazy"
                          />
                        </a>
                      </div>
                    </details>
                  {/await}
                </td>
                <td>
                  {#await getSimilarPackagesNames(dependencyName)}
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-animated"
                        role="progressbar"
                        style={`width: 100%`}
                      />
                    </div>
                  {:then searchResult}
                    <div class="collapse-group">
                      {#each searchResult.slice(0, 5) as similarPackageName}
                        {#await fetchPackage(similarPackageName)}
                          <summary class="collapse-header">
                            <strong>{similarPackageName}</strong>
                          </summary>
                        {:then packageInfo}
                          <details class="collapse-panel">
                            <summary class="collapse-header">
                              <div class="container-fluid">
                                <div class="row">
                                  <div
                                    class="col text-left text-truncate d-inline-block w-200"
                                  >
                                    <strong>{packageInfo.package.name}</strong>
                                    <span class="text-muted">
                                      {packageInfo.package.version}
                                    </span>
                                    <br />
                                    <span class="text-muted">
                                      {packageInfo.package.description}
                                    </span>
                                  </div>
                                  <div class="col text-right">
                                    <span class="text-muted">
                                      {formatToRelativeTime(
                                        new Date(packageInfo.package.date)
                                      )}
                                    </span>
                                    <br />
                                    <span class="text-muted">
                                      {#if packageInfo.package.links.repository && /github/i.test(packageInfo.package.links.repository)}
                                        <img
                                          on:error={handleImageError}
                                          data-src={getGithubContributorsImageUrl(
                                            packageInfo.package.links
                                              .repository,
                                            3
                                          )}
                                          alt="Contributors"
                                          class="mr-5 lazy"
                                          height="14"
                                        />
                                      {:else}
                                        by {packageInfo.package.publisher
                                          .username}
                                      {/if}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </summary>
                            <div class="collapse-content">
                              <div class="container-fluid">
                                <div class="row">
                                  <div class="col text-center">
                                    <MonthlyDownloadsBadge
                                      packageName={packageInfo.package.name}
                                    />
                                    <LicenseBadge
                                      packageName={packageInfo.package.name}
                                    />
                                    <br />
                                    <a
                                      target="_blank"
                                      href={`https://snyk.io/test/npm/${packageInfo.package.name}`}
                                    >
                                      <img
                                        on:error={handleImageError}
                                        data-src={`https://snyk.io/test/npm/${packageInfo.package.name}/badge.svg`}
                                        alt="Known Vulnerabilities"
                                        class="lazy"
                                      />
                                    </a>
                                    <TypesAvailabilityBadge
                                      packageName={packageInfo.package.name}
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div
                                    class="col d-flex justify-content-center"
                                  >
                                    <p class="w-300 text-wrap text-center">
                                      {#if packageInfo.package.links.repository && /github/i.test(packageInfo.package.links.repository)}
                                        <a
                                          href={getGithubContributorsPageUrl(
                                            packageInfo.package.links.repository
                                          )}
                                          target="_blank"
                                          class="text-decoration-none"
                                        >
                                          <img
                                            on:error={handleImageError}
                                            data-src={getGithubContributorsImageUrl(
                                              packageInfo.package.links
                                                .repository,
                                              12
                                            )}
                                            alt="Contributors"
                                            class="lazy img-fluid"
                                            style="max-height: 32px;"
                                          />
                                        </a>
                                        <br />
                                      {/if}
                                      {packageInfo.package.description}
                                    </p>
                                  </div>
                                </div>
                                <div class="row">
                                  <div
                                    class="col d-flex justify-content-center"
                                  >
                                    <NpmButton
                                      packageName={packageInfo.package.name}
                                    />
                                    <span class="ml-10" />
                                    {#if packageInfo.package.links.homepage && !packageInfo.package.links.homepage.includes(packageInfo.package.links.repository ?? "#readme")}
                                      <HomeButton
                                        href={packageInfo.package.links
                                          .homepage}
                                      />
                                      <span class="ml-10" />
                                    {/if}
                                    {#if packageInfo.package.links.repository}
                                      <RepositoryButton
                                        href={packageInfo.package.links
                                          .repository}
                                      />
                                      <span class="ml-10" />
                                    {/if}
                                    <RunkitButton
                                      packageName={packageInfo.package.name}
                                    />
                                  </div>
                                </div>
                                <div class="row mt-10">
                                  <div
                                    class="col d-flex justify-content-center"
                                  >
                                    <div class="input-group w-200">
                                      <div class="input-group-prepend">
                                        <span class="input-group-text">
                                          >
                                        </span>
                                      </div>
                                      <input
                                        type="text"
                                        class="form-control"
                                        value={`npm i ${packageInfo.package.name}`}
                                        on:click={({ currentTarget }) => {
                                          currentTarget.select();
                                          if (navigator.clipboard) {
                                            copyTextToClipboard(
                                              currentTarget.value
                                            );
                                          } else {
                                            currentTarget.setSelectionRange?.(
                                              0,
                                              currentTarget.value.length
                                            );
                                            document.execCommand("copy");
                                          }
                                          halfmoon.initStickyAlert({
                                            title: "Copied to clipboard!",
                                            content: currentTarget.value,
                                          });
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
                                  <div
                                    class="col d-flex justify-content-center"
                                  >
                                    <OpenReadmeButton
                                      packageName={packageInfo.package.name}
                                    />
                                    <span class="ml-10" />
                                    <ExploreFilesButton
                                      packageName={packageInfo.package.name}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </details>
                        {/await}
                      {:else}
                        <summary class="collapse-header">
                          No similar packages found.
                        </summary>
                      {/each}
                    </div>
                  {:catch}
                    <summary class="collapse-header">
                      No similar packages found.
                    </summary>
                  {/await}
                </td>
              </tr>
            {/if}
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
{/if}
