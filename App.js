import React, { Component } from "react";
import LoginNav from "./navigation/loginStackNav";
import { Provider } from "react-redux";
import store from "./state/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginNav />
      </Provider>
    );
  }
}

export default App;
