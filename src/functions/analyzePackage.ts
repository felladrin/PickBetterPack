import memoizePromise from "p-memoize";
import { npmApi } from "../constants/npmApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { PackageResult } from "../types/npms";

export const analyzePackage = memoizePromise((packageName: string) =>
  limitNpmsApiCallsConcurrency(() =>
    npmApi
      .get(`package/${encodeURIComponent(packageName)}/latest`)
      .json<PackageResult["collected"]>()
  )
);
