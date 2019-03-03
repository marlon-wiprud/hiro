import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../styles/moodStackStyles";
import * as moodActions from "../state/moodState/mood.actions";

import HiroButton from "../components/hiroButton";

const mapStateToProps = state => {
  return {
    firstname: state.userReducer.firstname
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveMood: mood => {
      dispatch(moodActions.saveMood(mood));
    }
  };
};

class ChooseMood extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(mood) {
    this.props.saveMood(mood);
    this.props.navigation.navigate("RecognizeMood");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Welcome back {this.props.firstname}, How are you feeling today?
          </Text>
        </View>
        <View>
          <HiroButton
            title="Great!"
            color="#F8E71C"
            borderColor="#F8E71C"
            backgroundColor="#453E3C"
            handleClick={() => this.handleClick("Great")}
          />
          <HiroButton
            title="Can't Complain."
            color="#7ED321"
            borderColor="#7ED321"
            backgroundColor="#393C3C"
            handleClick={() => this.handleClick("Can't Complain")}
          />
          <HiroButton
            title="Meh."
            color="#4A90E2"
            borderColor="#4A90E2"
            backgroundColor="#333550"
            handleClick={() => this.handleClick("Meh")}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseMood);
