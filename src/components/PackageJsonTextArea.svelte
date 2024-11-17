<script lang="ts">
  import { run } from 'svelte/legacy';

  import { getDependenciesFromPackage } from "../functions/getDependenciesFromPackage";
  import { dependenciesFromPackage } from "../stores/dependenciesFromPackage";
  import { onMount } from "svelte";
  import Shepherd from 'shepherd.js';
  import { droppedPackageJsonContent } from "../stores/droppedPackageJsonContent";
  import getHashFromString from "djb2a";
  import { packageJsonTemplate } from "../constants/packageJsonTemplate";
  import { t } from "svelte-i18n";
  import stripJsonComments from "strip-json-comments";
  import { getRandomPackage } from "../functions/getRandomPackage";

  let packageJsonAsString = $state(JSON.stringify(packageJsonTemplate, null, 2));

  let hasError = $state();

  let packageJsonAsObject = $state({});

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
        JSON.stringify([$t("tourTitle"), $t("tourIntro")])
      ).toString();
      if (window.localStorage?.getItem(localStorageKey) !== tourConfigHash) {
        const tour = new Shepherd.Tour({
          useModalOverlay: true,
          exitOnEsc: true,
          defaultStepOptions: {
            scrollTo: true
          },
        });

        tour.addStep({
          id: 'package-json-textarea',
          title: $t("tourTitle"),
          text: $t("tourIntro"),
          attachTo: {
            element: '[data-test-id=package-json-textarea]',
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Ok',
              action: tour.complete
            }
          ],
        });

        tour.on("complete", () => {
          window.localStorage?.setItem(localStorageKey, tourConfigHash);
        })

        tour.start();
      }
    }, 1500);
  });

  droppedPackageJsonContent.subscribe((content) => {
    if (content.length > 0) packageJsonAsString = content;
  });

  run(() => {
    try {
      packageJsonAsObject = JSON.parse(stripJsonComments(packageJsonAsString));
      dependenciesFromPackage.set(
        getDependenciesFromPackage(packageJsonAsObject)
      );
      hasError = false;
    } catch {
      hasError = true;
    }
  });
</script>

<textarea
  bind:value={packageJsonAsString}
  class="form-control h-full"
  class:is-invalid={hasError}
  autocomplete="off"
  autocapitalize="off"
  spellcheck="false"
  data-gramm="false"
  wrap="soft"
  data-title={$t("tourTitle")}
  data-intro={$t("tourIntro")}
  data-test-id="package-json-textarea"></textarea>

<style>
  textarea {
    font-family: "Courier New", Courier, monospace;
    resize: none;
  }
</style>
