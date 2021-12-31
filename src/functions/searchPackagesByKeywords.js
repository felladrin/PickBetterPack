import memoizePromise from "p-memoize";
import { npmsApi } from "../constants/npmsApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";

export const searchPackagesByKeywords = memoizePromise(
  /**
   * @param {string[]} keywords
   * @returns {Promise<import("../types/npms").SearchResponse>}
   */
  async (keywords) =>
    limitNpmsApiCallsConcurrency(async () =>
      npmsApi
        .get("search", {
          searchParams: {
            q: "keywords:" + keywords.slice(0, 10).join(","),
          },
        })
        .json()
    )
);
