import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../styles/moodStackStyles";

const mapStateToProps = state => {
  return {
    chosenMood: state.moodReducer.chosenMood
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class RecognizeMood extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {this.props.chosenMood} huh? Hold that thought while I narrow down
            your mood...
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecognizeMood);
