import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";

const HiroInput = props => {
  return (
    <TextInput
      style={styles.hiroInput}
      placeholder={props.prompt}
      onChangeText={text => props.onChange(text)}
      secureTextEntry={props.isSecure}
    />
  );
};

const styles = StyleSheet.create({
  hiroInput: {
    backgroundColor: "#D8D8D8",
    height: 35,
    width: 200,
    borderRadius: 8,
    margin: 5,
    textAlign: "center"
  }
});

export default HiroInput;
