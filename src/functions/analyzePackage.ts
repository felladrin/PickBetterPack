import memoizePromise from "p-memoize";
import { yarnNpmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { PackageResult } from "../types/npms";

export const analyzePackage = memoizePromise((packageName: string) =>
  limitNpmsApiCallsConcurrency(() =>
    yarnNpmApi
      .get(`${encodeURIComponent(packageName)}/latest`)
      .json<PackageResult["collected"]>()
  )
);
