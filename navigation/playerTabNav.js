import { createBottomTabNavigator } from "react-navigation";
import MusicPlayer from "../views/musicPlayer";
import MoodStackNav from "./moodStackNav.js";
import Favorites from "../views/favorites";

const PlayerTabNav = createBottomTabNavigator(
  {
    MusicPlayer: {
      screen: MusicPlayer,
      navigationOptions: {
        title: "Player"
      }
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: "Favorites"
      }
    }
  },
  {
    initialRouteName: "MusicPlayer"
  }
);

export default PlayerTabNav;
