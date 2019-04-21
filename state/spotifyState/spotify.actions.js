import * as types from "./spotify.action.types";
import Spotify from "rn-spotify-sdk";
import { my_ip } from "../../vars";

export const initialize = dispatch => {
  return dispatch => {
    Spotify.isInitializedAsync().then(isInitialized => {
      if (!isInitialized) {
        const spotOptions = {
          clientID: "6c6c570a51934f5089fb42c893f56a3c",
          sessionUserDefaultsKey: "SpotifySession",
          redirectURL: "hiro-auth://callback",
          tokenSwapURL: `http://${my_ip}:3000/swap`,
          tokenRefreshURL: `http://${my_ip}:3000/refresh`,
          sessionUserDefaultsKey: "spotifySession",
          scopes: [
            "user-read-private",
            "playlist-read",
            "playlist-read-private",
            "streaming"
          ]
        };

        Spotify.initialize(spotOptions).then(loggedIn => {
          console.log("spotify initialize then", loggedIn);
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

export const changePlayStatus = bool => ({
  type: types.CHANGE_PLAY_STATUS,
  payload: bool
});

export const playPlaylist = name => {
  return dispatch => {
    spotify
      .search(name, ["playlist"])
      .then(data => {
        const playlistURI = data.playlists.items[0].uri;
        spotify
          .playURI(playlistURI, 0, 0)
          .then(() => {
            dispatch(changePlayStatus(true));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log("SPOTIFY SEARCH ERROR", err));
  };
};

export const saveTrackMetadata = metadata => ({
  type: types.SAVE_TRACK_METADATA,
  payload: metadata
});

export const saveCurrentPosition = position => ({
  type: types.SAVE_CURRENT_POSITION,
  payload: position
});
