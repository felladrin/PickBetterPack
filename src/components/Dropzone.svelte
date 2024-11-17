<script lang="ts">
  import { droppedPackageJsonContent } from "../stores/droppedPackageJsonContent";

  let dropZoneDisplayStyle = $state("none");

  function showDropZone() {
    dropZoneDisplayStyle = "block";
  }

  function hideDropZone() {
    dropZoneDisplayStyle = "none";
  }

  function isValidDataTransfer(dataTransfer: DataTransfer) {
    return (
      dataTransfer.items?.length === 1 &&
      dataTransfer.items[0].kind === "file" &&
      dataTransfer.items[0].type.match(/json/)
    );
  }

  function handleDragEnter(dragEvent: DragEvent) {
    if (isValidDataTransfer(dragEvent.dataTransfer)) {
      showDropZone();
    }
  }

  function allowDrag(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(dragEvent: DragEvent) {
    if (isValidDataTransfer(dragEvent.dataTransfer)) {
      dragEvent.preventDefault();

      const reader = new FileReader();
      reader.onload = (event) => {
        droppedPackageJsonContent.set(event.target.result.toString().trim());
      };
      reader.readAsText(dragEvent.dataTransfer.items[0].getAsFile());

      hideDropZone();
    }
  }
</script>

<svelte:window ondragenter={handleDragEnter} ondrop={handleDrop} />

<div
  class="dropzone"
  role="region"
  style="display: {dropZoneDisplayStyle};"
  ondragenter={allowDrag}
  ondragover={allowDrag}
  ondragleave={hideDropZone}
  ondrop={handleDrop}
></div>

<style>
  .dropzone {
    box-sizing: border-box;
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 99999;
    background: rgba(96, 167, 220, 0.8);
    border: 11px dashed #60a7dc;
  }
</style>
