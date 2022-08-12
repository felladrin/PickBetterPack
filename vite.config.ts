import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import hash from "helper-git-hash";
import { execSync } from "node:child_process";

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
  server: (() => {
    try {
      const port = 5173;
      const gitpodPortUrl = execSync(`gp url ${port}`).toString().trim();
      return {
        strictPort: true,
        port,
        hmr: {
          protocol: "wss",
          host: new URL(gitpodPortUrl).hostname,
          clientPort: 443,
        },
      };
    } catch {}
  })(),
});
