import memoizePromise from "p-memoize";
import { npmsApi } from "../constants/npmsApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";

export const fetchPackage = memoizePromise(async (packageName = "") =>
  limitNpmsApiCallsConcurrency(async () => {
    /** @type {import("../types/npms").SearchResponse} */
    const packageManifest = await npmsApi
      .get(`search`, {
        searchParams: {
          q: packageName,
          size: 1,
        },
      })
      .json();
    return packageManifest.results[0];
  })
);
