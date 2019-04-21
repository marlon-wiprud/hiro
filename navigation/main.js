import React, { Component } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginStackNav from "./loginStackNav";
import MoodStackNav from "./moodStackNav";
import PlayerTabNav from "./playerTabNav";

const MainNav = createSwitchNavigator({
  LoginStackNav: LoginStackNav,
  MoodStackNav: MoodStackNav,
  PlayerTabNav: PlayerTabNav
});

const AppContainer = createAppContainer(MainNav);

class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return <AppContainer />;
  }
}

export default AppContainer;
