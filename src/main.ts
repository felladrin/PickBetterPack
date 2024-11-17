import App from "./components/App.svelte";
import halfmoon from "halfmoon";
import { executeAfterPolyfill } from "./functions/executeAfterPolyfill";
import { loadLocale } from "./functions/loadLocale";
import { mount } from "svelte";

executeAfterPolyfill(async () => {
  await loadLocale();
  mount(App, { target: document.getElementById("app") });
  halfmoon.onDOMContentLoaded();
});
