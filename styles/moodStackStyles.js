import React, { Component } from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312C40",
  },
  cameraContainer:{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
  
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'purple'
  },
  hiroLogo: {
    width: 100,
    height: 100
  },
  text: {
    textAlign: "center",
    color: "#ACACAC"
  },
  textContainer: {
    width: "60%"
  },
  cameraOverlay: {
    width: "100%",
    height: "100%",
    borderWidth: 3,
    zIndex: 2,
    position:"absolute",
    color: "black",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#312C40",
    opacity: 0.8
    },
  cameraText:{
    color: "white",
    textAlign: "center",
    margin: 10
  },
  overlayTextContainer: {
    width: '60%'
  }
});

export default styles;
