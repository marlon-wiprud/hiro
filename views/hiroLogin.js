import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import HiroInput from "../components/hiroInput";
import HiroButton from "../components/hiroButton";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

class HiroLogin extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    console.log("HANDLING CLICK");
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.hiroLogo}
          source={require("../assets/hiro_vertical_logo.png")}
        />
        <View>
          <HiroInput prompt="Username (not active)" />
          <HiroInput prompt="Password (not active)" />
        </View>
        <View>
          <HiroButton
            title="Login"
            color="#EDB5FC"
            borderColor="#EDB5FC"
            handleClick={this.handleClick}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("CreateAccount")}
          style={styles.bottomBanner}
        >
          <Text style={styles.bannerText}>
            Need an account?
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
