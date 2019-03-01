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
    saveCreateAccForm: userData => {
      dispatch(userActions.saveCreateAccForm(userData));
    }
  };
};

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      retype_password: "",
      errorMessage: ""
    };
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    // TO DO:  more form validation before allowing user to go to next screen
    const email = this.state.email;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const password = this.state.password;
    const retypePassword = this.state.retype_password;

    const userData = { email, firstname, lastname, password, retypePassword };

    if (password === retypePassword) {
      this.props.saveCreateAccForm(userData);
      this.props.navigation.navigate("CreateUserPref");
    } else {
      this.setState({
        errorMessage: "Passwords must match!",
        password: "",
        retype_password: ""
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.hiroLogo}
          source={require("../assets/hiro_vertical_logo.png")}
        />
        <Text>
          Say hello to Hiro, the worlds firt white-glove music discovery
          platform
        </Text>
        <Text>{this.state.errorMessage}</Text>
        <HiroInput
          prompt="email"
          onChange={text => this.setState({ email: text })}
        />
        <HiroInput
          prompt="firstname"
          onChange={text => this.setState({ firstname: text })}
        />
        <HiroInput
          prompt="lastname"
          onChange={text => this.setState({ lastname: text })}
        />
        <HiroInput
          prompt="password"
          onChange={text => this.setState({ password: text })}
          isSecure={true}
        />
        <HiroInput
          prompt="re-type password"
          onChange={text => this.setState({ retype_password: text })}
          isSecure={true}
        />
        <HiroButton
          title="Next"
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
)(CreateAccount);
