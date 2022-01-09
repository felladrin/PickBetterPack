export function loadScript(src: string, callback: () => void) {
  const scriptElement = document.createElement("script");
  scriptElement.src = src;
  scriptElement.onload = callback;
  scriptElement.onerror = callback;
  document.head.appendChild(scriptElement);
}
