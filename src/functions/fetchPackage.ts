import memoizePromise from "p-memoize";
import { npmsApi } from "../constants/npmsApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const fetchPackage = memoizePromise(async (packageName: string) =>
  limitNpmsApiCallsConcurrency(
    async () =>
      (
        await npmsApi
          .get("search", { searchParams: { q: packageName, size: 1 } })
          .json<SearchResponse>()
      ).results[0]
  )
);
