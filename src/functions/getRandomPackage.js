import uniqueRandomArray from "unique-random-array";
import randomItem from "random-item";
import { topNpmKeywords } from "../constants/topNpmKeywords";
import { fetchPackage } from "./fetchPackage";
import { npmsApi } from "../constants/npmsApi";

const getRandomKeyword = uniqueRandomArray(topNpmKeywords);

export async function getRandomPackage() {
  /** @type {import("../types/npms").SearchResponse} */
  const searchResponse = await npmsApi
    .get(`search`, {
      searchParams: {
        q: `keywords:${getRandomKeyword()},${getRandomKeyword()}`,
        size: 3,
      },
    })
    .json();

  const packageResult = await fetchPackage(
    randomItem(searchResponse.results).package.name
  );

  return packageResult.package;
}
