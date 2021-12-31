import { writable } from "svelte/store";

/** @type import("svelte/store").Writable<Record<string, string[]>> */
export const dependenciesFromPackage = writable({});
