import uniqueRandomArray from "unique-random-array";
import randomItem from "random-item";
import { topNpmKeywords } from "../constants/topNpmKeywords";
import { fetchPackage } from "./fetchPackage";
import { yarnNpmApi } from "../constants/npmApi";
import type { SearchResponse } from "../types/npms";

const getRandomKeyword = uniqueRandomArray(topNpmKeywords);

export async function getRandomPackage() {
  const searchResponse = await yarnNpmApi
    .get("-/v1/search", {
      searchParams: {
        text: `keywords:${getRandomKeyword()},${getRandomKeyword()}`,
        size: 3,
      },
    })
    .json<SearchResponse>();

  const packageResult = await fetchPackage(
    randomItem(searchResponse.objects).package.name
  );

  return packageResult.package;
}
