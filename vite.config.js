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
  server: {
    hmr: {
      clientPort: process.env.GITPOD_WORKSPACE_ID ? 443 : undefined,
    },
  },
});
