import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import spotify from "rn-spotify-sdk";
import {
  changePlayStatus,
  saveTrackMetadata,
  saveCurrentPosition
} from "../state/spotifyState/spotify.actions";
import styles from "../styles/musicPlayerStyles";
import AntIcon from "react-native-vector-icons/AntDesign";
import MusicPlayerArt from "../components/musicPlayerArt";
import SeekBar from "../components/seekBar";
import { addFavorite } from "../api/favorites";
import { saveFavorites } from "../state/favoritesState/favorites.actions";
import DefaultController from "../components/playerControls";
import FavoritesController from "../components/playerControls/favoritesController";
const mapStateToProps = state => {
  return {
    playStatus: state.spotifyReducer.playStatus,
    uid: state.userReducer.uid,
    favoritesLookup: state.favoritesReducer.favoritesLookup,
    currentPosition: state.spotifyReducer.currentPosition,
    favoritesMode: state.favoritesReducer.favoritesMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePlayStatus: status => {
      dispatch(changePlayStatus(status));
    },
    saveTrackMetadata: metadata => {
      dispatch(saveTrackMetadata(metadata));
    },
    saveCurrentPosition: position => {
      dispatch(saveCurrentPosition(position));
    },
    saveFavorites: favorites => dispatch(saveFavorites(favorites))
  };
};

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: null,
      albumArt: "",
      artist: "",
      songTitle: "",
      album: "",
      duration: 0,
      playStatusBtn: "play",
      interval: null
    };
  }

  componentDidMount() {
    spotify
      .search("We're The Light That Travels Into Space", ["playlist"])
      .then(data => {
        const playlistURI = data.playlists.items[0].uri;
        spotify
          .playURI(playlistURI, 0, 0)
          .then(() => {
            // changes global play status (true || false)
            this.props.changePlayStatus(true);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log("SPOTIFY SEARCH ERROR", err));

    spotify.on("play", res => {
      if (res.metadata.currentTrack) {
        track = res.metadata.currentTrack;
        this.setState({
          albumArt: track.albumCoverArtURL,
          artist: track.artistName,
          songTitle: track.name,
          album: track.albumName,
          duration: track.duration,
          playStatusBtn: "pause",
          track: track
        });

        // save current, previous, and next track metadata globally
        this.props.saveTrackMetadata(res.metadata);

        this.startCursor();
      }
    });

    // TODO: reset current position when track restarts
    // TODO: only give favorite controller when in favorites mode

    spotify.on("metadataChange", res => {
      track = res.metadata.currentTrack;
      if (track !== null) {
        this.setState({
          albumArt: track.albumCoverArtURL,
          artist: track.artistName,
          songTitle: track.name,
          album: track.albumName,
          duration: track.duration,
          playStatusBtn: "pause",
          track: track
        });
        this.props.saveCurrentPosition(0);
        this.props.saveTrackMetadata(res.metadata);
      }
    });

    spotify.on("pause", res => {
      this.setState({
        playStatusBtn: "play"
      });
      this.stopCursor();
    });

    spotify.on("contextChange", res => {
      // console.log("===CONTEXT CHANGE===>", res.metadata);
    });
  }

  skipBack = () => {
    if (this.state.metadata.prevTrack !== null) {
      spotify
        .skipToPrevious()
        .then(() => console.log("skip back success"))
        .catch(err => console.log("skip back failure: ", err));
    }
  };

  skipNext = () => {
    if (this.state.metadata.nextTrack !== null) {
      spotify
        .skipToNext()
        .then(() => console.log("skip next success"))
        .catch(err => console.log("skip next error: ", err));
    }
  };

  // pauses / plays song locally
  changePlayStatus = () => {
    spotify
      .setPlaying(!this.props.playStatus)
      .then(() => {
        // changes global play status (true || false)
        this.props.changePlayStatus(!this.props.playStatus);
      })
      .catch(err => console.log("pause error: ", err));
  };

  startCursor = () => {
    const interval = setInterval(() => {
      this.props.saveCurrentPosition(this.props.currentPosition + 1);
    }, 1000);

    this.setState({ interval });
  };

  stopCursor = () => {
    clearInterval(this.state.interval);
    const currentPosition = this.props.currentPosition;
    this.props.saveCurrentPosition(currentPosition);
  };

  favoriteTrack(data, uid) {
    // TODO: toggle heart on click
    addFavorite(data, uid).then(update => this.props.saveFavorites(update));
  }

  render() {
    let heart = null;
    let PlayerControls = DefaultController;
    if (this.state.track) {
      const uri = this.state.track.uri;
      //render favorites controller
      if (this.props.favoritesMode) PlayerControls = FavoritesController;

      //render correct heart and favorite functionality
      if (this.props.favoritesLookup[uri]) {
        heart = <AntIcon name="heart" color="white" size={50} />;
      } else {
        heart = (
          <AntIcon
            name="hearto"
            color="white"
            size={50}
            onPress={() =>
              this.favoriteTrack(
                {
                  albumCoverArtURL: this.state.track.albumCoverArtURL,
                  duration: this.state.track.duration,
                  albumUri: this.state.track.albumUri,
                  albumName: this.state.track.albumName,
                  artistUri: this.state.track.artistUri,
                  artistName: this.state.track.artistName,
                  uri: this.state.track.uri,
                  name: this.state.track.name
                },
                this.props.uid
              )
            }
          />
        );
      }
    }

    return (
      <View style={styles.container}>
        <MusicPlayerArt albumArt={this.state.albumArt} />
        <SeekBar
          trackLength={this.state.duration}
          currentPosition={this.props.currentPosition}
        />
        <PlayerControls
          changePlayStatus={this.changePlayStatus}
          playStatusBtn={this.state.playStatusBtn}
          songTitle={this.state.songTitle}
          artist={this.state.artist}
        />
        <View
          style={{
            backgroundColor: "#312C40",
            height: 50,
            width: "100%",
            alignItems: "center"
          }}
        >
          {heart}
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPlayer);
