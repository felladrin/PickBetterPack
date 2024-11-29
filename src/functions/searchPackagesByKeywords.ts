import memoizePromise from "p-memoize";
import { npmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const searchPackagesByKeywords = memoizePromise(
  async (keywords: string[]) =>
    limitNpmsApiCallsConcurrency(async () =>
      npmApi
        .get("search", {
          searchParams: {
            q: `keywords:${keywords.slice(0, 10).join(",")} not:deprecated`,
          },
        })
        .json<SearchResponse>()
    )
);
