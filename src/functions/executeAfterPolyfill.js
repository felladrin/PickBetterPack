import { loadScript } from "./loadScript";

/** @param {() => void} callback */
export function executeAfterPolyfill(callback) {
  loadScript("https://polyfill.io/v3/polyfill.min.js", callback);
}
