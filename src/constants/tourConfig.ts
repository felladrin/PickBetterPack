import { getTranslation, TranslationId } from "../modules/translations";

export const tourConfig = {
  title: getTranslation(TranslationId.TourTitle),
  intro: getTranslation(TranslationId.TourIntro),
  position: "bottom",
};
