<script>
  import PackageDetails from "./PackageDetails.svelte";
  import { dependenciesFromPackage } from "../stores/dependenciesFromPackage";
  import { getSimilarPackagesNames } from "../functions/getSimilarPackagesNames";
  import { fetchPackage } from "../functions/fetchPackage";
  import { handleImageError } from "../functions/handleImageError";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../constants/lazyLoad";

  afterUpdate(() => lazyLoad.update());
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
                          </div>
                        </summary>
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
                      <PackageDetails packageSearchResult={packageResult} />
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
                        </div>
                      </summary>
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
                          <PackageDetails packageSearchResult={packageInfo} />
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
