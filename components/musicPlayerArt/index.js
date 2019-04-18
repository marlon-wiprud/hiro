import React from "react";
import { View, Image, ImageBackground } from "react-native";
import styles from "./styles";

const MusicPlayerArt = props => {
  return (
    <View style={styles.albumArtContainer}>
      <ImageBackground
        style={styles.blurredAlbumArt}
        source={{ uri: props.albumArt }}
        blurRadius={8}
      >
        <Image style={styles.albumArt} source={{ uri: props.albumArt }} />
      </ImageBackground>
    </View>
  );
};

export default MusicPlayerArt;
