import memoizePromise from "p-memoize";
import { yarnNpmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const searchPackagesByKeywords = memoizePromise(
  async (keywords: string[]) =>
    limitNpmsApiCallsConcurrency(async () =>
      yarnNpmApi
        .get("-/v1/search", {
          searchParams: {
            text: `keywords:${keywords.slice(0, 10).join(",")}`,
          },
        })
        .json<SearchResponse>()
    )
);
