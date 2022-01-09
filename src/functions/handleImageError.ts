import { hideElement } from "./hideElement";

export function handleImageError(
  event: Event & { currentTarget: EventTarget & HTMLElement }
) {
  hideElement(event.currentTarget);
}
