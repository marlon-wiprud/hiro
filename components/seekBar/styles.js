import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#312C40",
    alignItems: "center",
    width: "100%"
  },
  text: {
    color: "white"
  },
  slider: {
    backgroundColor: "white"
  },
  seekBarContainer: {
    height: 30,
    width: 300
  },
  track: {
    height: 2,
    backgroundColor: "white"
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: "#EDB5FC",
    borderRadius: 10 / 2,
    shadowColor: "#31a4db",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1
  },
  xyz: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  heart: {
    height: 100
  }
});

export default styles;
