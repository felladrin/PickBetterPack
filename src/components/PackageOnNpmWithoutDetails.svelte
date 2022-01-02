<script>
  import { handleImageError } from "../functions/handleImageError";
  import { afterUpdate } from "svelte";
  import { lazyLoad } from "../constants/lazyLoad";

  afterUpdate(() => lazyLoad.update());

  export let packageName = "npm";
</script>

<details class="collapse-panel">
  <summary class="collapse-header">
    <div class="container-fluid">
      <div class="row">
        <div class="col text-left text-truncate d-inline-block w-200">
          <strong>{packageName}</strong>
        </div>
      </div>
    </div>
  </summary>
  <div class="collapse-content">
    <a target="_blank" href={`https://www.npmjs.com/package/${packageName}`}>
      <img
        on:error={handleImageError}
        data-src={`https://badgen.net/npm/v/${packageName}`}
        alt="NPM Page"
        class="lazy"
      />
    </a>
  </div>
</details>
