import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { RNCamera } from "react-native-camera";
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

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log("=====DATA URI======", data.uri);
    } else {
      console.log("=======NO CAMERA=====");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {this.props.chosenMood} huh? Hold that thought while I narrow down
            your mood...
          </Text>
        </View>
        <RNCamera
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
          mirrorImage={true}
          captureAudio={false}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <Button onPress={this.takePicture} title="TAKE PICTURE" />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecognizeMood);
