import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Feather";
import spotify from "rn-spotify-sdk";

const mapStateToProps = state => {
  return {
    metadata: state.spotifyReducer.metadata
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const PlayerControls = ({
  changePlayStatus,
  playStatusBtn,
  songTitle,
  artist,
  metadata
}) => {
  const skipBack = () => {
    if (metadata.prevTrack !== null) {
      spotify
        .skipToPrevious()
        .then(() => console.log("skip back success"))
        .catch(err => console.log("skip back failure: ", err));
    }
  };

  const skipNext = () => {
    if (metadata.nextTrack !== null) {
      spotify
        .skipToNext()
        .then(() => console.log("skip next success"))
        .catch(err => console.log("skip next error: ", err));
    }
  };
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
