export type PackageCollected = {
  metadata: Package & {
    repository: Repository;
    license: string;
    releases: Range[];
    hasSelectiveFiles?: boolean;
    hasTestScript?: boolean;
    readme?: string;
    deprecated?: string;
    dependencies?: Dependencies;
    devDependencies?: Dependencies;
    peerDependencies?: Dependencies;
    bundledDependencies?: Dependencies;
    optionalDependencies?: Dependencies;
  };
  npm: {
    downloads: Range[];
    dependentsCount: number;
    starsCount: number;
  };
  github: {
    homepage: string;
    starsCount: number;
    forksCount: number;
    subscribersCount: number;
    issues: {
      count: number;
      openCount: number;
      distribution: {
        "3600": number;
        "10800": number;
        "32400": number;
        "97200": number;
        "291600": number;
        "874800": number;
        "2624400": number;
        "7873200": number;
        "23619600": number;
        "70858800": number;
        "212576400": number;
      };
      isDisabled: false;
      forkOf?: string;
    };
    contributors: GitHubContributor[];
    commits: Range[];
    statuses?: GitHubStatus[];
  };
  source: {
    files: {
      readmeSize: number;
      testsSize: number;
      hasChangelog?: boolean;
      hasNpmIgnore?: boolean;
      hasShrinkwrap?: boolean;
    };
    badges?: Badge[];
    linters?: string[];
    outdatedDependencies?:
      | {
          [name: string]: {
            required: string;
            warn?: {
              code: string;
            };
            stable?: string;
            latest?: string;
          };
        }
      | boolean;
    vulnerabilities?: unknown[] | boolean;
    coverage?: number;
  };
};

export type PackageEvaluation = {
  quality: {
    carefulness: number;
    tests: number;
    health: number;
    branding: number;
  };
  popularity: {
    communityInterest: number;
    downloadsCount: number;
    downloadsAcceleration: number;
    dependentsCount: number;
  };
  maintenance: {
    releasesFrequency: number;
    commitsFrequency: number;
    openIssues: number;
    issuesDistribution: number;
  };
};

export type PackageResult = {
  analyzedAt: string;
  collected: PackageCollected;
  evaluation: PackageEvaluation;
  score: Score;
};

export type PackagesResponse = {
  [name: string]: PackageResult;
};

export type SearchQuery = {
  terms?: string | string[];
} & SearchQueryQualifiers;

export type SearchResponse = {
  total: number;
  results: SearchResult[];
};

export type SearchResult = {
  package: Package;
  score: Score;
  searchScore: number;
};

export type SuggestionsResponse = SuggestionsResult[];

export type SuggestionsResult = {
  package: Package;
  score: Score;
  searchScore: number;
  highlight: string;
};

export type Package = {
  name: string;
  scope: string | "unscoped";
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
  author?: Person;
  publisher: Person;
  maintainers: Person[];
};

export type Person = {
  username: string;
  email: string;
};

export type Score = {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
};
