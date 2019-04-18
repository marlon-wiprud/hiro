import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
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
  }

  spotifyLogin(email, password) {
    // always enable showDialog in production
    // {showDialog: true}
    spotify.login({ showDialog: true }).then(isloggedIn => {
      console.log("is logged in: ", isloggedIn);
      if (isloggedIn) {
        spotify
          .getSessionAsync()
          .then(result => console.log("GET SESSION: ", result));
        this.props.navigation.navigate("MoodStackNav");
      } else {
        console.log("Spotify not logged in", isloggedIn);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.hiroLogo}
          source={require("../assets/hiro_vertical_logo.png")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Authorize your{" "}
            <Text style={{ color: "white" }}>Spotify Premium</Text> account to
            help <Text style={{ color: "white" }}>Hiro</Text> provide you with
            the{" "}
            <Text style={{ color: "white" }}>
              best listening experience possible
            </Text>
            .
          </Text>
        </View>
        <Button
          style={styles.spotifyLoginBtn}
          title="Authorize Spotify!"
          onPress={() => this.spotifyLogin()}
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
  hiroLogo: {
    width: 100,
    height: 100
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
  },
  text: {
    textAlign: "center",
    color: "#ACACAC"
  },
  textContainer: {
    width: "60%"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyAuth);
