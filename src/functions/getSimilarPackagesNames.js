import memoizePromise from "p-memoize";
import { getSimilarPackages } from "./getSimilarPackages";

export const getSimilarPackagesNames = memoizePromise(async (packageName = "") => {
  const similarPackagesDetails = await getSimilarPackages(packageName);
  return similarPackagesDetails.map(
    (packageDetails) => packageDetails.package.name
  );
});
