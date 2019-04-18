import { createStackNavigator } from "react-navigation";
import ChooseMood from "../views/chooseMood";
import RecognizeMood from "../views/recognizeMood";
import ConfirmMood from "../views/confirmMood";
import MusicPlayer from "../views/musicPlayer";
import PlayerTabNav from "../navigation/playerTabNav";

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
    },
    ConfirmMood: {
      screen: ConfirmMood,
      navigationOptions: {
        header: null
      }
    },
    PlayerTabNav: {
      screen: PlayerTabNav,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "PlayerTabNav"
  }
);

export default MoodStackNav;
