import App from "./components/App.svelte";
import halfmoon from "halfmoon";
import { executeAfterPolyfill } from "./functions/executeAfterPolyfill";

executeAfterPolyfill(() => {
  new App({ target: document.getElementById("app") });
  halfmoon.onDOMContentLoaded();
});
