import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";

const Favorite = ({ fav, playTrack, idx }) => {
  // console.log("FAVROTEI --------", fav);
  const albumcoverarturl = fav.albumcoverarturl;
  const albumname = fav.albumname;
  const artistname = fav.artistname;
  const name = fav.name;
  return (
    <TouchableOpacity style={styles.container} onPress={playTrack}>
      <Image source={{ uri: albumcoverarturl }} style={styles.image} />
      <View>
        <Text style={styles.songTitle}>{name}</Text>
        <Text style={styles.text}>
          {artistname} - {albumname}
        </Text>
      </View>
      <View style={{ JustifySelf: "flex-end" }}>
        <Icon name="star" size={15} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default Favorite;
