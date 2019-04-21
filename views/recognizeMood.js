import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { RNCamera } from "react-native-camera";
import styles from "../styles/moodStackStyles";
import { withNavigationFocus } from "react-navigation";
import * as moodActions from "../state/moodState/mood.actions";
import { my_ip } from "../vars";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    analyzeMoodSuccess: mood => {
      dispatch(moodActions.analyzeMoodSuccess(mood));
    }
  };
};

class RecognizeMood extends Component {
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.checkFocus = this.checkFocus.bind(this);
    this.analyzeMood = this.analyzeMood.bind(this);
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.3, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.analyzeMood(data.base64);
    } else {
      console.log("=======NO CAMERA=====");
    }
  };

  analyzeMood(img) {
    console.log("======RUNNING=====");
    fetch(`http://${my_ip}:3000/mood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ img })
    })
      .then(res => res.json())
      .then(json => {
        console.log("YOUR MOOD IS: ", json);
        this.props.analyzeMoodSuccess(json.mood);
        this.props.navigation.navigate("ConfirmMood");
      })
      .catch(err => console.log(err));
  }

  checkFocus() {
    if (this.props.isFocused) {
      setTimeout(this.takePicture, 2000);
    }
  }

  render() {
    this.checkFocus();
    return (
      <View style={styles.cameraContainer}>
        <View style={styles.cameraOverlay}>
          <View style={styles.overlayTextContainer}>
            <Text style={styles.cameraText}>
              Hold on one second while I narrow down you vibe...
            </Text>
            <ActivityIndicator size="large" color="#EBBFA" />
          </View>
        </View>
        <RNCamera
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
          mirrorImage={true}
          captureAudio={false}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(RecognizeMood));
