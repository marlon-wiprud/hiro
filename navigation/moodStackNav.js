import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import ChooseMood from "../views/chooseMood";
import RecognizeMood from "../views/recognizeMood";

const MoodStackNav = createStackNavigator(
  {
    ChooseMood: {
      screen: ChooseMood,
      navigationOptions: {
        header: null
      }
    },
    RecognizeMood: {
      screen: RecognizeMood,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "ChooseMood"
  }
);

export default MoodStackNav;
