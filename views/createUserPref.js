import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import HiroInput from "../components/hiroInput";
import HiroButton from "../components/hiroButton";
import * as userActions from "../state/userState/user.actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserPref: userPref => {
      dispatch(userActions.saveUserPref(userPref));
    }
  };
};

class CreateUserPref extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre1: "",
      genre2: "",
      genre3: "",
      favoriteArtist: ""
    };
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    const userPref = {
      genre1: this.state.genre1,
      genre2: this.state.genre2,
      genre3: this.state.genre3,
      favoriteArtist: this.state.favoriteArtist
    };
    this.props.saveUserPref(userPref);
    this.props.navigation.navigate("SpotifyAuth");
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.hiroLogo}
          source={require("../assets/hiro_vertical_logo.png")}
        />
        <Text>Help me get to know you better!</Text>
        <HiroInput
          prompt="Favorite genre #1?"
          onChange={text => this.setState({ genre1: text })}
        />
        <HiroInput
          prompt="Favorite genre #2?"
          onChange={text => this.setState({ genre2: text })}
        />
        <HiroInput
          prompt="Favorite genre #3?"
          onChange={text => this.setState({ genre3: text })}
        />
        <HiroInput
          prompt="Favorite artist?"
          onChange={text => this.setState({ favoriteArtist: text })}
        />
        <HiroButton
          title="One more step!"
          color="#EDB5FC"
          borderColor="#EDB5FC"
          handleClick={this.handleNext}
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserPref);
