import { writable } from "svelte/store";

export const dependenciesFromPackage = writable<Record<string, string[]>>({});
