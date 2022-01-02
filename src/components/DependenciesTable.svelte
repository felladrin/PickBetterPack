<script>
  import PackageOnNpmWithoutDetails from "./PackageOnNpmWithoutDetails.svelte";
  import PackageLoadingProgressBar from "./PackageLoadingProgressBar.svelte";
  import NoSimilarPackagesSummary from "./NoSimilarPackagesSummary.svelte";
  import PackageDetails from "./PackageDetails.svelte";
  import { dependenciesFromPackage } from "../stores/dependenciesFromPackage";
  import { getSimilarPackagesNames } from "../functions/getSimilarPackagesNames";
  import { fetchPackage } from "../functions/fetchPackage";
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
                    <PackageLoadingProgressBar />
                  {:then packageResult}
                    {#if !packageResult}
                      <summary class="collapse-header">
                        <strong>{dependencyName}</strong> was not found on NPM.
                      </summary>
                    {:else if packageResult.hasOwnProperty("error")}
                      <PackageOnNpmWithoutDetails
                        packageName={dependencyName}
                      />
                    {:else}
                      <PackageDetails packageSearchResult={packageResult} />
                    {/if}
                  {:catch}
                    <PackageOnNpmWithoutDetails packageName={dependencyName} />
                  {/await}
                </td>
                <td>
                  {#await getSimilarPackagesNames(dependencyName)}
                    <PackageLoadingProgressBar />
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
                        <NoSimilarPackagesSummary />
                      {/each}
                    </div>
                  {:catch}
                    <NoSimilarPackagesSummary />
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
