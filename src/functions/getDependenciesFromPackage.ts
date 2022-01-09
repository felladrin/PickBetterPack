export function getDependenciesFromPackage(packageObject: Record<string, any>) {
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
