import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import hash from "helper-git-hash";

export default defineConfig({
  base: "./",
  plugins: [svelte()],
  resolve: {
    alias: {
      winbox: "winbox/src/js/winbox.js",
    },
  },
  define: {
    "process.env.BUILD_DATE_TIME": Date.now(),
    "process.env.COMMIT_SHORT_HASH": JSON.stringify(hash({ short: true })),
  },
  server: {
    hmr: {
      clientPort: process.env.GITPOD_WORKSPACE_ID ? 443 : undefined,
    },
  },
});
