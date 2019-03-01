import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const HiroButton = props => {
  return (
    <TouchableOpacity
      style={[
        styles.hiroButton,
        {
          borderColor: props.borderColor,
          backgroundColor: props.backgroundColor
        }
      ]}
      title={props.title}
      onPress={props.handleClick}
    >
      <Text style={[styles.hiroButtonTxt, { color: props.color }]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
  x;
};

const styles = StyleSheet.create({
  hiroButton: {
    height: 35,
    width: 200,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    justifyContent: "center"
  },
  hiroButtonTxt: {
    textAlign: "center"
  }
});

export default HiroButton;
