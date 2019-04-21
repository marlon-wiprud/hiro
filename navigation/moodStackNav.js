import { createStackNavigator } from "react-navigation";
import ChooseMood from "../views/chooseMood";
import RecognizeMood from "../views/recognizeMood";
import ConfirmMood from "../views/confirmMood";
import PlayerTabNav from "./playerTabNav";

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
    }
  },
  {
    initialRouteName: "ChooseMood"
  }
);

export default MoodStackNav;
