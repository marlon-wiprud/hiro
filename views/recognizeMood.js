import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { RNCamera } from "react-native-camera";
import styles from "../styles/moodStackStyles";
import * as moodActions from '../state/moodState/mood.actions'
const mapStateToProps = state => {
  return {
    analyzedMood: state.moodReducer.analyzedMood
  }
};

const mapDispatchToProps = dispatch => {
  return {
    analyzeMood: img => {
      dispatch(moodActions.analyzeMood(img))
    }
  };
};

class RecognizeMood extends Component {
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this)
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.3, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.props.analyzeMood(data.base64)
      this.setState({
        photoSrc: data.uri
      })
    } else {
      console.log("=======NO CAMERA=====");
    }
  };

  componentDidMount(){
    // setTimeout(this.takePicture,2500)
  }

  render() {
 
    return (
      <View style={styles.cameraContainer}>
        <View style={styles.cameraOverlay}>
          <View style = {styles.overlayTextContainer} > 
          <Text style={styles.cameraText}>
            Hold on one second while I narrow down you vibe...
          </Text>
          <ActivityIndicator size="large" color="#EBBFA" />
          <Text style = {{color: "red", fontSize: 30}}>{this.props.analyzedMood}</Text>
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
)(RecognizeMood);
