import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  bottomPlayerContainer: {
    backgroundColor: "#312C40",
    width: "100%",
    alignItems: "center"
  },
  playerControlContainer: {
    flexDirection: "row"
  },
  playerControls: {
    margin: 10
  },
  abc: {
    width: "100%",
    alignItems: "center"
  },
  songTitle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  artist: {
    color: "white",
    textAlign: "center"
  },
  seekBarContainer: {
    height: 30,
    width: "70%"
  },
  track: {
    height: 2,
    backgroundColor: "#303030"
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: "#31a4db",
    borderRadius: 10 / 2,
    shadowColor: "#31a4db",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1
  }
});

export default styles;
