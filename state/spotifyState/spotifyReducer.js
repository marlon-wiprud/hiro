import * as types from "./spotify.action.types";

const initialState = {
  spotifyInitialized: false,
  playStatus: false,
  metadata: {},
  currentPosition: 0
};

function spotifyReducer(state = initialState, action) {
  switch (action.type) {
    case types.SPOTIFY_INITIALIZE_SUCCESS: {
      return Object.assign({}, state, {
        spotifyInitialized: true
      });
    }

    case types.CHANGE_PLAY_STATUS: {
      return Object.assign({}, state, {
        playStatus: action.payload
      });
    }

    case types.SAVE_TRACK_METADATA: {
      return Object.assign({}, state, { metadata: action.payload });
    }

    case types.SAVE_CURRENT_POSITION: {
      return Object.assign({}, state, { currentPosition: action.payload });
    }

    default:
      return state;
  }
}

export default spotifyReducer;
