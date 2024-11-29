import memoizePromise from "p-memoize";
import { npmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const searchPackagesByTerms = memoizePromise(async (terms: string[]) =>
  limitNpmsApiCallsConcurrency(async () =>
    npmApi
      .get("search", {
        searchParams: { q: `${terms.slice(0, 10).join(" ")} not:deprecated` },
      })
      .json<SearchResponse>()
  )
);
