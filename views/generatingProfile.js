import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "../state/userState/user.actions";

const mapStateToProps = state => {
  return {
    uid: state.userReducer.uid,
    firstname: state.userReducer.firstname,
    lastname: state.userReducer.lastname,
    genreArr: state.userReducer.genreArr,
    favoriteArtist: state.userReducer.favoriteArtist,
    loggedIn: state.userReducer.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class GeneratingProfile extends Component {
  constructor(props) {
    super(props);
  }

  // TO DO: show loading animation while account creation finishes
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.firstname}</Text>
        <Text>{this.props.lastname}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312C40",
    borderWidth: 3
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  spotifyLoginBtn: {
    backgroundColor: "#00FD05"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneratingProfile);
