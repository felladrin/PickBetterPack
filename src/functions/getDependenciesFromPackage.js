/** @param {{}} packageObject */
export function getDependenciesFromPackage(packageObject) {
  return Object.keys(packageObject)
    .filter((property) => property.toLowerCase().includes("dependencies"))
    .reduce(
      (result, dependenciesProperty) => ({
        ...result,
        [dependenciesProperty]: Object.keys(
          packageObject[dependenciesProperty]
        ),
      }),
      {}
    );
}
