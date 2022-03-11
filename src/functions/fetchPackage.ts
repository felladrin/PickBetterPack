import memoizePromise from "p-memoize";
import { yarnNpmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { SearchResponse } from "../types/npms";

export const fetchPackage = memoizePromise(async (packageName: string) =>
  limitNpmsApiCallsConcurrency(
    async () =>
      (
        await yarnNpmApi
          .get("-/v1/search", {
            searchParams: {
              text: packageName,
              size: 1,
            },
          })
          .json<SearchResponse>()
      ).objects[0]
  )
);
