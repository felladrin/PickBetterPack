/**
 * @param {string} src
 * @param {() => void} callback
 */
export function loadScript(src, callback) {
  const scriptElement = document.createElement("script");
  scriptElement.src = src;
  scriptElement.onload = callback;
  scriptElement.onerror = callback;
  document.head.appendChild(scriptElement);
}
