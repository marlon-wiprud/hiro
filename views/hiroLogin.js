import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import HiroInput from "../components/hiroInput";
import HiroButton from "../components/hiroButton";
import firebase from "react-native-firebase";
import * as userActions from "../state/userState/user.actions";
import * as spotifyActions from "../state/spotifyState/spotify.actions";
import { getFavorites } from "../api/favorites";
import { saveFavorites } from "../state/favoritesState/favorites.actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    firebaseLoginSuccess: uid => {
      dispatch(userActions.firebaseLoginSuccess(uid));
    },
    spotifyInitialize: () => {
      dispatch(spotifyActions.initialize());
    },
    saveFavorites: favorites => {
      dispatch(saveFavorites(favorites));
    }
  };
};

class HiroLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "test@gmail.com",
      password: "aaaaaa"
    };
    props.spotifyInitialize();

    this.firebaseLogin = this.firebaseLogin.bind(this);
  }

  handleClick() {
    console.log("HANDLING CLICK");
  }

  firebaseLogin(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        console.log(userData.user.uid);
        this.props.firebaseLoginSuccess(userData.user.uid);
        getFavorites(userData.user.uid).then(res => {
          this.props.saveFavorites(res);
          this.props.navigation.navigate("MoodStackNav");
        });
        // this.props.navigation.navigate("SpotifyAuth");
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.hiroLogo}
          source={require("../assets/hiro_vertical_logo.png")}
        />
        <View>
          <HiroInput
            prompt="E-mail"
            onChange={text => this.setState({ email: text })}
          />
          <HiroInput
            prompt="Password"
            onChange={text => this.setState({ password: text })}
            isSecure={true}
          />
        </View>
        <View>
          <HiroButton
            title="Login"
            color="#EDB5FC"
            borderColor="#EDB5FC"
            handleClick={() =>
              this.firebaseLogin(this.state.email, this.state.password)
            }
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("CreateAccount")}
          style={styles.bottomBanner}
        >
          <Text style={styles.bannerText}>
            Need an account?{" "}
            <Text style={{ color: "white" }}>Register now.</Text>
          </Text>
        </TouchableOpacity>
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
  bottomBanner: {
    backgroundColor: "#695E89",
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    height: 70
  },
  bannerText: {
    textAlign: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HiroLogin);
