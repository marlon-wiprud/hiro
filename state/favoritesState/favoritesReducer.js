import * as types from "./types";

const initialState = {
  favorites: [],
  favoritesLookup: {},
  favoritesIdx: null,
  favoritesMode: false
};

function spotifyReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_FAVORITES: {
      return Object.assign({}, state, {
        favorites: action.payload.favsArray,
        favoritesLookup: action.payload.favsDictionary
      });
    }
    case types.SAVE_IDX: {
      return Object.assign({}, state, { favoritesIdx: action.payload });
    }

    case types.TOGGLE_FAVORITES_MODE: {
      return Object.assign({}, state, { favoritesMode: !state.favoritesMode });
    }

    default:
      return state;
  }
}

export default spotifyReducer;
