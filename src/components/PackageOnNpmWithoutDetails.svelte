<script lang="ts">
  import { handleImageError } from "../functions/handleImageError";
  import { lazyLoad } from "../constants/lazyLoad";

  $effect(() => lazyLoad.update());

  const { packageName = "npm", open = false } = $props<{
    packageName?: string;
    open?: boolean;
  }>();
</script>

<details class="collapse-panel" {open}>
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
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.npmjs.com/package/${packageName}`}
    >
      <img
        onerror={handleImageError}
        data-src={`https://badgen.net/npm/v/${packageName}`}
        alt="NPM Page"
        class="lazy"
      />
    </a>
  </div>
</details>
