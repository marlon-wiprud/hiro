import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    justifyContent: "space-between"
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
  },
  iconContainer: {
    paddingRight: 8,
    height: "100%",
    alignItems: "center"
  },
  texContainer: {
    paddingLeft: 8
  }
});

export default styles;
