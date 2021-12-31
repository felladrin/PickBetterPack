import App from "./components/App.svelte";
import halfmoon from "halfmoon";
import { logConsoleBadge } from "./functions/logConsoleBadge";
import { executeAfterPolyfill } from "./functions/executeAfterPolyfill";

executeAfterPolyfill(() => {
  logConsoleBadge();
  new App({ target: document.getElementById("app") });
  halfmoon.onDOMContentLoaded();
});
