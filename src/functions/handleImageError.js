import { hideElement } from "./hideElement";

/** @param {Event & {currentTarget: EventTarget & HTMLElement; }} event */
export function handleImageError(event) {
  hideElement(event.currentTarget);
}
