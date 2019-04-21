import * as types from "./types";

const initialState = {
  favorites: [],
  favoritesLookup: {},
  favoritesIdx: null,
  favoritesMode: false,
  shuffleList: [],
  shuffleMode: false
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

    case types.SAVE_SHUFFLE_LIST: {
      return Object.assign({}, state, { shuffleList: action.payload });
    }

    case types.TOGGLE_SHUFFLE_MODE: {
      return Object.assign({}, state, { shuffleMode: !state.shuffleMode });
    }

    default:
      return state;
  }
}

export default spotifyReducer;
