<script>
  import PackageJsonTextArea from "./PackageJsonTextArea.svelte";
  import DependenciesTable from "./DependenciesTable.svelte";
  import Dropzone from "./Dropzone.svelte";
  import FloatingSideButtons from "./buttons/FloatingSideButtons.svelte";
  import SelectLocaleModal from "./LanguageSelectionModal.svelte";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../constants/lazyLoad";
  import { t } from "svelte-i18n";

  afterUpdate(() => lazyLoad.update());
</script>

<Dropzone />
<div class="page-wrapper">
  <div class="sticky-alerts" />
  <div class="content-wrapper">
    <div class="container-fluid">
      <div class="container-fluid">
        <div class="row m-20">
          <div class="col-md">
            <div class="content text-center">
              <a
                href={import.meta.env.BASE_URL}
                title="PickBetterPack · Commit {process.env
                  .COMMIT_SHORT_HASH} · {new Date(
                  process.env.BUILD_DATE_TIME
                ).toLocaleString()}"
              >
                <img
                  data-src="/images/logo-light-mode.png"
                  alt="PickBetterPack Logo"
                  class="img-fluid hidden-dm lazy"
                  data-test-id="logo-light-mode"
                />
                <img
                  data-src="/images/logo-dark-mode.png"
                  alt="PickBetterPack Logo"
                  class="img-fluid hidden-lm lazy"
                  data-test-id="logo-dark-mode"
                />
              </a>
              <div>
                <span>
                  {@html $t("app-description")}
                </span>
              </div>
            </div>
          </div>
          <div class="col-md">
            <PackageJsonTextArea />
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row m-20">
          <div class="col-md">
            <DependenciesTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<SelectLocaleModal />
<FloatingSideButtons />
