import spotify from "rn-spotify-sdk";
// unused
export const searchPlaylist = name => {
  return new Promise(resolve, reject => {
    spotify
      .search(name, ["playlist"])
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

//unused
export const playURI = uri => {
  return new Promise((resolve, reject) => {
    // const playlistURI = data.playlists.items[0].uri;
    spotify
      .playURI(uri, 0, 0)
      .then(data => {
        resolve(data);
        // this.props.changePlayStatus(true);
      })
      .catch(err => reject(err));
  });
};
