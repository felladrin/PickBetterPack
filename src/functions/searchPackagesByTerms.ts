import memoizePromise from "p-memoize";
import { yarnNpmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const searchPackagesByTerms = memoizePromise(async (terms: string[]) =>
  limitNpmsApiCallsConcurrency(async () =>
    yarnNpmApi
      .get("-/v1/search", {
        searchParams: {
          text: `${terms.slice(0, 10).join(" ")}`,
        },
      })
      .json<SearchResponse>()
  )
);
