import { createBottomTabNavigator } from "react-navigation";
import MusicPlayer from "../views/musicPlayer";
import MoodStackNav from "../navigation/moodStackNav";
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
    // MoodStackNav: {
    //   screen: MoodStackNav,
    //   navigationOptions: {
    //     title: "Home"
    //   }
    // }
  },
  {
    initialRouteName: "MusicPlayer"
  }
);

export default PlayerTabNav;
