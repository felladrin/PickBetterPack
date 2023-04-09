import { extractKeywords } from "./extractKeywords";
import { fetchPackage } from "./fetchPackage";
import { searchPackagesByKeywords } from "./searchPackagesByKeywords";
import { searchPackagesByTerms } from "./searchPackagesByTerms";
import type { SearchResult } from "../types/npms";

export async function getSimilarPackages(packageName = "") {
  const packageSearchResult = await fetchPackage(packageName);

  if (!packageSearchResult?.package) return [];

  let keywords = [];

  if (packageSearchResult.package.keywords?.length > 0) {
    keywords = extractKeywords(packageSearchResult.package.keywords.join(" "));
  }

  const keywordsSearchResult = await Promise.all(
    keywords.map((keyword) => searchPackagesByKeywords([keyword]))
  );

  const keywordToSearchResultMap = new Map();

  keywords.forEach((keyword, index) => {
    keywordToSearchResultMap.set(keyword, keywordsSearchResult[index]);
  });

  const hasEnoughScore = (result: SearchResult) => result.score.final >= 0.21;

  const mostRelevantKeywordsResults = keywordsSearchResult
    .filter(
      (result) =>
        result.total >= 5 &&
        hasEnoughScore(result.objects[result.objects.length - 1])
    )
    .sort((a, b) => a.total - b.total)
    .slice(0, 3);

  keywords = keywords.filter((keyword) =>
    mostRelevantKeywordsResults.includes(keywordToSearchResultMap.get(keyword))
  );

  const packageDescription = packageSearchResult.package.description ?? "";

  const hasValidDescription = (
    result: SearchResult,
    prohibitedPackageDescription: string
  ) => {
    const description = result.package.description ?? "";

    const packageDescriptionIsNotEmpty = description.trim().length > 0;

    const prohibitedDescriptionStartCharacters = ["[!", "![", "<"];

    const packageDescriptionDoesNotStartWithProhibitedCharacters =
      packageDescriptionIsNotEmpty &&
      prohibitedDescriptionStartCharacters.every(
        (characters) => !packageDescription.startsWith(characters)
      );

    return (
      description !== prohibitedPackageDescription &&
      packageDescriptionDoesNotStartWithProhibitedCharacters
    );
  };

  let extractedTerms = [] as string[];

  if (hasValidDescription(packageSearchResult, "")) {
    extractedTerms = extractKeywords(packageDescription);
  }

  const extractedTermsCombinations = [];

  if (extractedTerms.length > 1) {
    for (let index = 1; index < extractedTerms.length; index++) {
      extractedTermsCombinations.push([
        extractedTerms[index - 1],
        extractedTerms[index],
      ]);
    }
  }

  if (extractedTerms.length > 2) {
    for (let index = 2; index < extractedTerms.length; index++) {
      extractedTermsCombinations.push([
        extractedTerms[index - 2],
        extractedTerms[index - 1],
        extractedTerms[index],
      ]);
    }
  }

  const keywordsCombinations = [];

  if (keywords.length > 1) {
    for (let i = 0; i < keywords.length - 1; i++) {
      for (let j = i + 1; j < keywords.length; j++) {
        const firstKeyword = keywords[i];
        const secondKeyword = keywords[j];
        keywordsCombinations.push([firstKeyword, secondKeyword]);
      }
    }
  } else if (keywords.length === 1) {
    keywordsCombinations.push([keywords[0]]);
  }

  const packageNameSearchResponse = searchPackagesByTerms([packageName]);

  const packageKeywordsSearchResponses = keywordsCombinations.map(
    (keywordsCombination) => searchPackagesByKeywords(keywordsCombination)
  );

  const packageDescriptionSearchResponse =
    searchPackagesByTerms(extractedTerms);

  let searchResponses = await Promise.all([
    packageNameSearchResponse,
    packageDescriptionSearchResponse,
    ...packageKeywordsSearchResponses,
  ]);

  const extractedTermsSearchResponses = (
    await Promise.all(
      extractedTermsCombinations.map((terms) => searchPackagesByTerms(terms))
    )
  )
    .sort((a, b) => b.total - a.total)
    .slice(0, searchResponses.length + 3);

  searchResponses = [...searchResponses, ...extractedTermsSearchResponses];

  const mergedSearchResults = searchResponses
    .filter((result) => result.total >= 5)
    .reduce<SearchResult[]>(
      (results, current) => [...results, ...(current.objects ?? [])],
      []
    );

  const hasValidName = (
    result: SearchResult,
    prohibitedPackageName: string
  ) => {
    const name = result.package.name;
    const isNotRelatedToTheProhibitedPackage = !new RegExp(
      `[.-/]${prohibitedPackageName}[.-/]`
    ).test(name);

    return name !== prohibitedPackageName && isNotRelatedToTheProhibitedPackage;
  };

  const filteredSearchResults = mergedSearchResults
    .filter(
      (result) =>
        hasEnoughScore(result) &&
        hasValidName(result, packageName) &&
        hasValidDescription(result, packageDescription)
    )
    .sort((a, b) => b.searchScore - a.searchScore);

  const packageNamePerCountMap = filteredSearchResults.reduce((acc, cur) => {
    const { name } = cur.package;
    acc[name] = acc[name] ? acc[name] + 1 : 1;
    return acc;
  }, {});

  return Object.keys(packageNamePerCountMap)
    .map((name) => ({
      ...filteredSearchResults.find((result) => result.package.name === name),
      frequency: packageNamePerCountMap[name],
    }))
    .filter(
      (currentResult, currentResultIndex, results) =>
        results.findIndex(
          (result) =>
            result.package.description === currentResult.package.description
        ) === currentResultIndex
    )
    .sort((a, b) => b.frequency - a.frequency);
}
