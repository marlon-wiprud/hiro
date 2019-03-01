import * as types from "./spotify.action.types";

const initialState = {
  spotifyInitialized: false
};

function spotifyReducer(state = initialState, action) {
  switch (action.type) {
    case types.SPOTIFY_INITIALIZE_SUCCESS: {
      return Object.assign({}, state, {
        spotifyInitialized: true
      });
    }
    default:
      return state;
  }
}

export default spotifyReducer;
