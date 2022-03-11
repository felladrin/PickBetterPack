import memoizePromise from "p-memoize";
import { cloudflareNpmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { PackageResult } from "../types/npms";

export const analyzePackage = memoizePromise((packageName: string) =>
  limitNpmsApiCallsConcurrency(() =>
    cloudflareNpmApi
      .get(`${encodeURIComponent(packageName)}/latest`)
      .json<PackageResult["collected"]>()
  )
);
