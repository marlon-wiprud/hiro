import { createStackNavigator } from "react-navigation";
import SpotifyAuth from "../views/spotifyAuth";
import CreateAccount from "../views/createAccount";
import HiroLogin from "../views/hiroLogin";
import CreateUserPref from "../views/createUserPref";
import MoodStackNav from "./moodStackNav";

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
    }
  },
  {
    initialRouteName: "HiroLogin"
    // initialRouteName: "MoodStackNav"
  }
);

export default LoginStackNav;
