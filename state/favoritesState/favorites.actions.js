import * as types from "./types";

export const saveFavorites = favorites => ({
  type: types.SAVE_FAVORITES,
  payload: favorites
});

export const saveIdx = idx => ({
  type: types.SAVE_IDX,
  payload: idx
});

export const toggleFavoritesMode = () => ({
  type: types.TOGGLE_FAVORITES_MODE
});
