import { loadScript } from "./loadScript";

export function executeAfterPolyfill(callback: () => void) {
  loadScript("https://polyfill.io/v3/polyfill.min.js", callback);
}
