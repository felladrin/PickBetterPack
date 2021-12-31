import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  base: "./",
  plugins: [svelte()],
  resolve: {
    alias: {
      winbox: "winbox/src/js/winbox.js",
    },
  },
});
