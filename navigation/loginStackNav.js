import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SpotifyAuth from "../views/spotifyAuth";
import CreateAccount from "../views/createAccount";
import HiroLogin from "../views/hiroLogin";
import CreateUserPref from "../views/createUserPref";
import GeneratingProfile from "../views/generatingProfile";

const LoginStackNav = createStackNavigator(
  {
    HiroLogin: {
      screen: HiroLogin,
      navigationOptions: {
        header: null
      }
    },
    CreateAccount: {
      screen: CreateAccount
    },
    CreateUserPref: {
      screen: CreateUserPref
    },
    SpotifyAuth: {
      screen: SpotifyAuth,
      navigationOptions: {
        header: null
      }
    },
    GeneratingProfile: {
      screen: GeneratingProfile,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "HiroLogin"
  }
);

const AppContainer = createAppContainer(LoginStackNav);

class LoginNav extends Component {
  constructor() {
    super();
  }

  render() {
    return <AppContainer />;
  }
}

export default LoginNav;
