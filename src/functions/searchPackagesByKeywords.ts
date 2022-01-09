import memoizePromise from "p-memoize";
import { npmsApi } from "../constants/npmsApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const searchPackagesByKeywords = memoizePromise(
  async (keywords: string[]) =>
    limitNpmsApiCallsConcurrency(async () =>
      npmsApi
        .get("search", {
          searchParams: {
            q: `keywords:${keywords.slice(0, 10).join(",")} not:deprecated`,
          },
        })
        .json<SearchResponse>()
    )
);
