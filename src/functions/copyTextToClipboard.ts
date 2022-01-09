/** @see https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write */
export async function copyTextToClipboard(text: BlobPart) {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  return navigator.clipboard.write(data);
}
