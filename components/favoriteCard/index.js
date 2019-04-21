import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";

const Favorite = ({ fav, playTrack, unfavorite }) => {
  const albumcoverarturl = fav.albumcoverarturl;
  const albumname = fav.albumname;
  const artistname = fav.artistname;
  const name = fav.name;
  return (
    <TouchableOpacity style={styles.container} onPress={playTrack}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: albumcoverarturl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.songTitle}>{name}</Text>
          <Text style={styles.text}>
            {artistname} - {albumname}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="heart" size={20} color="white" onPress={unfavorite} />
      </View>
    </TouchableOpacity>
  );
};

export default Favorite;
