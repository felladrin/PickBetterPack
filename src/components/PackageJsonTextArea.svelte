<script>
  import { getDependenciesFromPackage } from "../functions/getDependenciesFromPackage";
  import { dependenciesFromPackage } from "../stores/dependenciesFromPackage";
  import { onMount } from "svelte";
  import introJs from "intro.js";
  import { droppedPackageJsonContent } from "../stores/droppedPackageJsonContent";
  import getHashFromString from "djb2a";
  import { packageJsonTemplate } from "../constants/packageJsonTemplate";
  import { tourConfig } from "../constants/tourConfig";
  import stripJsonComments from "strip-json-comments";
  import { getRandomPackage } from "../functions/getRandomPackage";

  let packageJsonAsString = JSON.stringify(packageJsonTemplate, null, 2);

  let hasError = false;

  let packageJsonAsObject = {};

  onMount(async () => {
    let packageJsonHash = getHashFromString(packageJsonAsString);

    const hasUserChangedPackageJson = () =>
      getHashFromString(packageJsonAsString) !== packageJsonHash;

    const randomPackage1 = await getRandomPackage();

    if (hasUserChangedPackageJson()) return;

    packageJsonAsString = JSON.stringify(
      {
        ...packageJsonTemplate,
        dependencies: {
          [randomPackage1.name]: randomPackage1.version,
        },
      },
      null,
      2
    );

    packageJsonHash = getHashFromString(packageJsonAsString);

    const randomPackage2 = await getRandomPackage();

    if (hasUserChangedPackageJson()) return;

    packageJsonAsString = JSON.stringify(
      {
        ...packageJsonTemplate,
        dependencies: {
          [randomPackage1.name]: randomPackage1.version,
          [randomPackage2.name]: randomPackage2.version,
        },
      },
      null,
      2
    );
  });

  onMount(() => {
    setTimeout(() => {
      const localStorageKey = "hasDisplayedPickBetterPackTour";
      const tourConfigHash = getHashFromString(
        JSON.stringify(tourConfig)
      ).toString();
      if (window.localStorage?.getItem(localStorageKey) !== tourConfigHash) {
        introJs()
          .setOptions({ showBullets: false })
          .oncomplete(() => {
            window.localStorage?.setItem(localStorageKey, tourConfigHash);
          })
          .start();
      }
    }, 1500);
  });

  droppedPackageJsonContent.subscribe((content) => {
    if (content.length > 0) packageJsonAsString = content;
  });

  $: {
    try {
      packageJsonAsObject = JSON.parse(stripJsonComments(packageJsonAsString));
      dependenciesFromPackage.set(
        getDependenciesFromPackage(packageJsonAsObject)
      );
      hasError = false;
    } catch {
      hasError = true;
    }
  }
</script>

<textarea
  bind:value={packageJsonAsString}
  class="form-control h-full"
  class:is-invalid={hasError}
  autocomplete="off"
  autocorrect="off"
  autocapitalize="off"
  spellcheck="false"
  data-gramm="false"
  wrap="off"
  data-title={tourConfig.title}
  data-intro={tourConfig.intro}
  data-position={tourConfig.position}
  data-test-id="package-json-textarea"
/>

<style>
  textarea {
    font-family: "Courier New", Courier, monospace;
    resize: none;
  }
</style>
