import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import HiroInput from "../components/hiroInput";
import HiroButton from "../components/hiroButton";
import * as userActions from "../state/userState/user.actions";
import firebase from "react-native-firebase";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    saveCreateAccForm: userData => {
      dispatch(userActions.saveCreateAccForm(userData));
    },
    registerFirebaseSuccess: uid => {
      dispatch(userActions.registerFirebaseSuccess(uid));
    },
    registerHiroUser: data => {
      dispatch(userActions.registerHiroUser(data));
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
    const email = this.state.email;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const password = this.state.password;
    const retypePassword = this.state.retype_password;

    this.setState({
      errorMessage: ""
    });

    const userData = { email, firstname, lastname, password, retypePassword };
    if (password !== retypePassword) {
      this.setState({
        errorMessage: "Passwords must match!",
        password: "",
        retype_password: ""
      });
    } else if (password.length < 6) {
      this.setState({
        errorMessage: "Password must be atleast 6 characters",
        password: "",
        retype_password: ""
      });
    } else {
      this.props.saveCreateAccForm(userData);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userData => {
          const uid = userData.user.uid;
          this.props.registerFirebaseSuccess(uid);
          console.log("====FIREBASE UID ====", uid);

          this.props.registerHiroUser({
            uid,
            firstname,
            lastname
          });

          this.props.navigation.navigate("CreateUserPref");
        })
        .catch(err => {
          console.log("===FIREBASE ERROR====", err);
          if ((err.code = "auth/email-already-in-use")) {
            this.setState({
              errorMessage: "Email already in use",
              email: "",
              password: "",
              retype_password: ""
            });
          }
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
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Hi there,<Text style={{ color: "white" }}> Im Hiro</Text>, the
            worlds first{" "}
            <Text style={{ color: "white" }}>white-glove music discovery</Text>{" "}
            platform that curates music for you based on your{" "}
            <Text style={{ color: "white" }}>real-time mood</Text>. Finding your
            vibe just got a whole lot easier.
          </Text>
        </View>
        <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
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
          value={this.state.password}
          isSecure={true}
        />
        <HiroInput
          prompt="re-type password"
          onChange={text => this.setState({ retype_password: text })}
          value={this.state.retype_password}
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
)(CreateAccount);
