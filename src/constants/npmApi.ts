import ky from "ky";

export const yarnNpmApi = ky.create({
  prefixUrl: "https://registry.yarnpkg.com/",
  timeout: 5 * 60 * 1000,
});
