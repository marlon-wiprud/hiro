import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import spotify from "rn-spotify-sdk";
import * as spotifyActions from "../state/spotifyState/spotify.actions";
import * as userActions from "../state/userState/user.actions";

const mapStateToProps = state => {
  return {
    email: state.userReducer.email,
    password: state.userReducer.password,
    firstname: state.userReducer.firstname,
    lastname: state.userReducer.lastname,
    genreArr: state.userReducer.genreArr,
    favoriteArtist: state.userReducer.favoriteArtist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    spotifyInitialize: () => {
      dispatch(spotifyActions.initialize());
    },
    registerFirebase: (email, password) => {
      dispatch(userActions.registerFirebase(email, password));
    },
    userRegistration: data => {
      dispatch(userActions.userRegistration(data));
    }
  };
};

class SpotifyAuth extends Component {
  constructor(props) {
    super(props);
    this.spotifyLogin = this.spotifyLogin.bind(this);
    props.spotifyInitialize();
  }

  spotifyLogin(email, password) {
    // always enable showDialog in production
    // {showDialog: true}
    spotify.login().then(isloggedIn => {
      if (isloggedIn) {
        this.props.userRegistration({
          email,
          password,
          firstname: this.props.firstname,
          lastname: this.props.lastname,
          genreArr: this.props.genreArr,
          favoriteArtist: this.props.favoriteArtist
        });
        this.props.navigation.navigate("GeneratingProfile");
      } else {
        console.log("Spotify not logged in", isloggedIn);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Log in with Spotify</Text>
        <Button
          style={styles.spotifyLoginBtn}
          title="Authorize Spotify!"
          onPress={() =>
            this.spotifyLogin(this.props.email, this.props.password)
          }
        />
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
)(SpotifyAuth);
