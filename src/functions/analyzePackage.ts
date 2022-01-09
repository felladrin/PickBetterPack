import memoizePromise from "p-memoize";
import { npmsApi } from "../constants/npmsApi";
import { limitNpmsApiCallsConcurrency } from "./limitNpmsApiCallsConcurrency";
import type { PackageResult } from "../types/npms";

export const analyzePackage = memoizePromise((packageName: string) =>
  limitNpmsApiCallsConcurrency(() =>
    npmsApi
      .get(`package/${encodeURIComponent(packageName)}`)
      .json<PackageResult>()
  )
);
