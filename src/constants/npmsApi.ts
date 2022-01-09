import ky from "ky";

export const npmsApi = ky.create({
  prefixUrl: "https://api.npms.io/v2",
  timeout: 5 * 60 * 1000,
});
