import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../styles/moodStackStyles";
import * as moodActions from "../state/moodState/mood.actions";
import HiroButton from "../components/hiroButton";

const mapStateToProps = state => {
  return {
    analyzedMood: state.moodReducer.analyzedMood
  };
};

const mapDispatchToProps = dispatch => {
  return {
    analyzeMood: img => {
      dispatch(moodActions.analyzeMood(img));
    }
  };
};

class ConfirmMood extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> How did I do?</Text>
        <HiroButton
          title={this.props.analyzedMood}
          color="#EDB5FC"
          borderColor="#EDB5FC"
          handleClick={() => this.props.navigation.navigate("MusicPlayer")}
        />
        <HiroButton
          title="Try Again"
          color="#EDB5FC"
          borderColor="#EDB5FC"
          handleClick={() => this.props.navigation.navigate("RecognizeMood")}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmMood);
