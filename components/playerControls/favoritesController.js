import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { saveIdx } from "../../state/favoritesState/favorites.actions";
import { saveCurrentPosition } from "../../state/spotifyState/spotify.actions";

import spotify from "rn-spotify-sdk";

const mapStateToProps = state => {
  return {
    metadata: state.spotifyReducer.metadata,
    favoritesIdx: state.favoritesReducer.favoritesIdx,
    favorites: state.favoritesReducer.favorites,
    favoritesMode: state.favoritesReducer.favoritesMode,
    shuffleMode: state.favoritesReducer.shuffleMode,
    shuffleList: state.favoritesReducer.shuffleList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveIdx: idx => {
      dispatch(saveIdx(idx));
    },
    saveCurrentPosition: position => {
      dispatch(saveCurrentPosition(position));
    }
  };
};

const PlayerControls = ({
  changePlayStatus,
  playStatusBtn,
  songTitle,
  artist,
  favorites,
  favoritesIdx,
  saveIdx,
  saveCurrentPosition,
  favoritesMode,
  shuffleList,
  shuffleMode
}) => {
  const skipBack = () => {
    if (shuffleMode) {
      // get next value from shuffle list by decrementing the saved index
      // account for value at decremented index evaluating to 0 (false negative)
      if (shuffleList[favoritesIdx - 1] || favorites[favoritesIdx - 1] === 0) {
        const shuffleIdx = shuffleList[favoritesIdx - 1];
        const uri = favorites[shuffleIdx].uri;
        console.log("===NEXT TRACK===>", favorites[shuffleIdx]);
        // play next track in shuffle list and save the index of the track
        spotify.playURI(uri, 0, 0).then(() => {
          saveIdx(favoritesIdx - 1);
        });
      } else {
        this.seek(0);
      }
    } else {
      if (favorites[favoritesIdx - 1]) {
        const uri = favorites[favoritesIdx - 1].uri;
        spotify.playURI(uri, 0, 0).then(data => {
          saveIdx(favoritesIdx - 1);
        });
      } else {
        this.seek(0);
      }
    }
  };

  seek = num => {
    spotify
      .seek(num)
      .then(() => saveCurrentPosition(0))
      .catch(err => console.log(err));
  };

  const skipNext = () => {
    if (shuffleMode) {
      // get next value from shuffle list by incrementing the saved index + 1
      // account for value at index equating to 0 (will produce false negative and halt the next action)
      if (
        shuffleList[favoritesIdx + 1] ||
        shuffleList[favoritesIdx + 1] === 0
      ) {
        const shuffleIdx = shuffleList[favoritesIdx + 1];
        const uri = favorites[shuffleIdx].uri;
        // play next track in shuffle list and save the index of the track
        spotify.playURI(uri, 0, 0).then(() => {
          saveIdx(favoritesIdx + 1);
        });
      }
    } else {
      if (favorites[favoritesIdx + 1]) {
        const uri = favorites[favoritesIdx + 1].uri;
        spotify.playURI(uri, 0, 0).then(data => {
          saveIdx(favoritesIdx + 1);
        });
      }
    }
  };

  // TODO: only run skipNext if in favorites mode
  spotify.on("trackDelivered", res => {
    if (favoritesMode) skipNext();
  });

  return (
    <View style={styles.bottomPlayerContainer}>
      <View style={styles.abc}>
        <View>
          <Text style={styles.songTitle}>{songTitle}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
      </View>
      <View style={styles.playerControlContainer}>
        <Icon
          style={styles.playerControls}
          name="skip-back"
          size={30}
          color="white"
          onPress={skipBack}
        />
        <Icon
          style={styles.playerControls}
          name={playStatusBtn}
          size={30}
          color="white"
          onPress={changePlayStatus}
        />
        <Icon
          style={styles.playerControls}
          name="skip-forward"
          size={30}
          color="white"
          onPress={skipNext}
        />
      </View>
    </View>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerControls);
