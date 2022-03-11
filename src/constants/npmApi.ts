import ky from "ky";

/**
 * Yarn NPM Registry has no rate-limiter,
 * but has an issue with CORS when querying a package.
 */
export const yarnNpmApi = ky.create({
  prefixUrl: "https://registry.yarnpkg.com/",
  timeout: 5 * 60 * 1000,
});

/**
 * Cloudflare NPM Registry has CORS enabled on all endpoints,
 * but has a rate-limiter, so it can't be used for the similar packages search.
 */
export const cloudflareNpmApi = ky.create({
  prefixUrl: "https://registry.npmjs.cf/",
  timeout: 5 * 60 * 1000,
});
