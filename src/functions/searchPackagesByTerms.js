import memoizePromise from "p-memoize";
import { npmsApi } from "../constants/npmsApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";

export const searchPackagesByTerms = memoizePromise(
  /**
   * @param {string[]} terms
   * @returns {Promise<import("../types/npms").SearchResponse>}
   */
  async (terms) =>
    limitNpmsApiCallsConcurrency(async () =>
      npmsApi
        .get(`search`, {
          searchParams: {
            q: terms.slice(0, 10).join(" "),
          },
        })
        .json()
    )
);
