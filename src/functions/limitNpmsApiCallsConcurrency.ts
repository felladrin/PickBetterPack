import pLimit from "p-limit";

export const limitNpmsApiCallsConcurrency = pLimit(6);
