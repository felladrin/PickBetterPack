import App from "./components/App.svelte";
import halfmoon from "halfmoon";
import { loadLocale } from "./functions/loadLocale";
import { mount } from "svelte";

(async () => {
  await loadLocale();
  mount(App, { target: document.getElementById("app") });
  halfmoon.onDOMContentLoaded();
})();
