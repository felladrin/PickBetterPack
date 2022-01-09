import memoizePromise from "p-memoize";
import { npmsApi } from "../constants/npmsApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const searchPackagesByTerms = memoizePromise(async (terms: string[]) =>
  limitNpmsApiCallsConcurrency(async () =>
    npmsApi
      .get("search", {
        searchParams: { q: `${terms.slice(0, 10).join(" ")} not:deprecated` },
      })
      .json<SearchResponse>()
  )
);
