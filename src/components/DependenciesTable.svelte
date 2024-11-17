<script lang="ts">
  import PackageOnNpmWithoutDetails from "./PackageOnNpmWithoutDetails.svelte";
  import PackageLoadingProgressBar from "./PackageLoadingProgressBar.svelte";
  import NoSimilarPackagesSummary from "./NoSimilarPackagesSummary.svelte";
  import PackageDetails from "./PackageDetails.svelte";
  import { dependenciesFromPackage } from "../stores/dependenciesFromPackage";
  import { getSimilarPackagesNames } from "../functions/getSimilarPackagesNames";
  import { fetchPackage } from "../functions/fetchPackage";
  import { t } from "svelte-i18n";

  const similarPackagesToDisplayPerBatch = 6;
  const openedSimilarPackages = new Map<
    import("../types/npms").SearchResult,
    boolean
  >();
  const dependencyPerSimilarPackagesDisplayedMap = $state({});
</script>

{#if Object.keys($dependenciesFromPackage).length > 0}
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th class="text-center">{$t("installed")}</th>
          <th class="text-center">{$t("similar")}</th>
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
                        {@html $t("dependencyNotFoundOnNpm", {
                          values: { dependencyName },
                        })}
                      </summary>
                    {:else if packageResult.hasOwnProperty("error")}
                      <PackageOnNpmWithoutDetails
                        packageName={dependencyName}
                        open={true}
                      />
                    {:else}
                      <PackageDetails
                        packageSearchResult={packageResult}
                        open={true}
                      />
                    {/if}
                  {:catch}
                    <PackageOnNpmWithoutDetails
                      packageName={dependencyName}
                      open={true}
                    />
                  {/await}
                </td>
                <td>
                  {#await getSimilarPackagesNames(dependencyName)}
                    <PackageLoadingProgressBar />
                  {:then searchResult}
                    <div class="collapse-group">
                      {#each searchResult.slice(0, dependencyPerSimilarPackagesDisplayedMap[dependencyName] ?? similarPackagesToDisplayPerBatch) as similarPackageName}
                        {#await fetchPackage(similarPackageName)}
                          <summary class="collapse-header">
                            <strong>{similarPackageName}</strong>
                          </summary>
                        {:then packageInfo}
                          <PackageDetails
                            packageSearchResult={packageInfo}
                            open={openedSimilarPackages.get(packageInfo) ??
                              false}
                            onTogglePanel={(wasClosedWhenToggled) =>
                              openedSimilarPackages.set(
                                packageInfo,
                                wasClosedWhenToggled
                              )}
                          />
                        {/await}
                      {:else}
                        <NoSimilarPackagesSummary />
                      {/each}
                    </div>
                    {#if (dependencyPerSimilarPackagesDisplayedMap[dependencyName] ?? similarPackagesToDisplayPerBatch) < searchResult.length}
                      <button
                        class="btn btn-sm btn-block"
                        type="button"
                        onclick={() =>
                          (dependencyPerSimilarPackagesDisplayedMap[
                            dependencyName
                          ] =
                            (dependencyPerSimilarPackagesDisplayedMap[
                              dependencyName
                            ] ?? similarPackagesToDisplayPerBatch) +
                            similarPackagesToDisplayPerBatch)}
                      >
                        {$t("showMore")}
                      </button>
                    {/if}
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

<style>
  td {
    width: 50%;
  }
</style>
