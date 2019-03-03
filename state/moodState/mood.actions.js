import * as types from "./mood.action.types";

export const saveMood = mood => ({
  type: types.SAVE_MOOD,
  payload: mood
});
