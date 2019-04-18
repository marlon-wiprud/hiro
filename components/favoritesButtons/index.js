import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export const Shuffle = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="shuffle" size={25} color="#E8B1F7" />
    </TouchableOpacity>
  );
};

export const Play = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="controller-play" size={25} color="#E8B1F7" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E8B1F7",
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#372E40"
  }
});
