import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: 48,
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 2
  },
  image: {
    height: "100%",
    aspectRatio: 1
  },
  songTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  text: {
    color: "white",
    fontSize: 12
  }
});

export default styles;
