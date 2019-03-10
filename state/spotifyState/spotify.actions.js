import * as types from "./spotify.action.types";
import Spotify from "rn-spotify-sdk";

export const initialize = dispatch => {
  return dispatch => {

    Spotify.isInitializedAsync().then(isInitialized => {
      if(!isInitialized){

      const spotOptions = {
        clientID: "6c6c570a51934f5089fb42c893f56a3c",
        redirectURL: "hiro-auth://callback",
        scopes: [
          "user-read-private",
          "playlist-read",
          "playlist-read-private",
          "streaming"
        ]
      };

      Spotify.initialize(spotOptions).then(loggedIn => {
        console.log('spotify initialize then', loggedIn)
        dispatch(spotifyInitSuccess());
        if (loggedIn) {
          dispatch(spotifyInitSuccess());
        } 
      });
      }
    });
  };
};

export const spotifyInitSuccess = () => ({
  type: types.SPOTIFY_INITIALIZE_SUCCESS
});

export const logout = dispatch => {
  return dispatch => {
    Spotify.logout().then(() => {
      console.log("LOGGED OUT");
    });
  };
};
