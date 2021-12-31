<script>
  import { droppedPackageJsonContent } from "../stores/droppedPackageJsonContent";

  let dropZoneDisplayStyle = "none";

  function showDropZone() {
    dropZoneDisplayStyle = "block";
  }

  function hideDropZone() {
    dropZoneDisplayStyle = "none";
  }

  /** @param {DataTransfer} dataTransfer */
  function isValidDataTransfer(dataTransfer) {
    return (
      dataTransfer.items?.length === 1 &&
      dataTransfer.items[0].kind === "file" &&
      dataTransfer.items[0].type.match(/json/)
    );
  }

  /** @param {DragEvent} dragEvent */
  function handleDragEnter(dragEvent) {
    if (isValidDataTransfer(dragEvent.dataTransfer)) {
      showDropZone();
    }
  }

  /** @param {DragEvent} dragEvent */
  function allowDrag(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = "copy";
  }

  /** @param {DragEvent} dragEvent */
  function handleDrop(dragEvent) {
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

<svelte:window on:dragenter={handleDragEnter} on:drop={handleDrop} />

<div
  class="dropzone"
  style="display: {dropZoneDisplayStyle};"
  on:dragenter={allowDrag}
  on:dragover={allowDrag}
  on:dragleave={hideDropZone}
  on:drop={handleDrop}
/>

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
