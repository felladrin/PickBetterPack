import ky from "ky";

export const npmApi = ky.create({
  prefixUrl: "https://api.npms.io/v2/",
  timeout: 5 * 60 * 1000,
});
