import memoizePromise from "p-memoize";
import { npmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const fetchPackage = memoizePromise(async (packageName: string) =>
  limitNpmsApiCallsConcurrency(
    async () =>
      (
        await npmApi
          .get("search", { searchParams: { q: packageName, size: 1 } })
          .json<SearchResponse>()
      ).results[0]
  )
);
