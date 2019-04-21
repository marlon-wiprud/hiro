import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../seekBar/styles";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          name="heart"
          size={20}
          color="white"
          onPress={() => navigation.navigate("moodStackNav")}
        />
      </View>
      <View>
        <Icon name="heart" size={20} color="white" />
      </View>
      <View>
        <Icon name="heart" size={20} color="white" />
      </View>
    </View>
  );
};

export default NavBar;
