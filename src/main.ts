import App from "./components/App.svelte";
import halfmoon from "halfmoon";
import { executeAfterPolyfill } from "./functions/executeAfterPolyfill";
import { loadLocale } from "./functions/loadLocale";

executeAfterPolyfill(async () => {
  await loadLocale();
  new App({ target: document.getElementById("app") });
  halfmoon.onDOMContentLoaded();
});
