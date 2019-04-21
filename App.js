import React, { Component } from "react";
import MainNav from "./navigation/main";
import { Provider } from "react-redux";
import store from "./state/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNav />
      </Provider>
    );
  }
}

export default App;
