import uniqueRandomArray from "unique-random-array";
import randomItem from "random-item";
import { topNpmKeywords } from "../constants/topNpmKeywords";
import { fetchPackage } from "./fetchPackage";
import { npmApi } from "../constants/npmApi";
import type { SearchResponse } from "../types/npms";

const getRandomKeyword = uniqueRandomArray(topNpmKeywords);

export async function getRandomPackage() {
  const searchResponse = await npmApi
    .get("search", {
      searchParams: {
        q: `keywords:${getRandomKeyword()},${getRandomKeyword()}`,
        size: 3,
      },
    })
    .json<SearchResponse>();

  const packageResult = await fetchPackage(
    randomItem(searchResponse.results).package.name
  );

  return packageResult.package;
}
