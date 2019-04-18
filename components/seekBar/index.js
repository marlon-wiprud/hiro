import React from "react";
import { View, Text } from "react-native";
import Slider from "react-native-slider";
import styles from "./styles";
import spotify from "rn-spotify-sdk";
import { saveCurrentPosition } from "../../state/spotifyState/spotify.actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    saveCurrentPosition: position => dispatch(saveCurrentPosition(position))
  };
};

function pad(n, width, z = 0) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const elapsedFunc = position => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2)
];

const remainingFunc = (currentPosition, trackLength) => {
  const duration = trackLength - currentPosition;
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor((duration / 60 - minutes) * 0.6 * 100);

  if (minutes.toString().length === 1) minutes = "0" + minutes.toString();
  if (seconds.toString().length === 1) seconds = "0" + seconds.toString();

  return minutes + ":" + seconds;
};

const SeekBar = ({ trackLength, currentPosition, saveCurrentPosition }) => {
  const elapsed = elapsedFunc(currentPosition);
  const remaining = remainingFunc(currentPosition, trackLength);

  const onSeek = position => {
    const floored = Math.floor(position);
    spotify.seek(floored).then(() => saveCurrentPosition(floored));
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.xyz}>
          <Text style={styles.text}>{elapsed[0] + ":" + elapsed[1]}</Text>
        </View>
        <View style={styles.xyz}>
          <Slider
            maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
            onSlidingComplete={onSeek}
            value={currentPosition}
            minimumTrackTintColor="#EDB5FC"
            maximumTrackTintColor="white"
            style={styles.seekBarContainer}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            thumbTouchSize={{ width: 50, height: 40 }}
          />
        </View>
        <View style={styles.xyz}>
          <Text style={[styles.text]}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeekBar);
