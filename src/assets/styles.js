import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  hrContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  hr: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "black",
  },

  hrText: {
    marginHorizontal: 10,
    textAlign: "center",
    color: "#90949c",
    marginTop: 0,
  },

  textInput: {
    height: 45,
    marginBottom: 10,
    borderLeftColor: "black",
  },

  touchable: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    height: 45,
    justifyContent: "center",
  },

  caption: {
    marginVertical: 20,
    fontSize: 14,
    textAlign: "center",
  },

  textPrimary: {
    fontSize: 14,
    textTransform: "none",
  },

  textPrimaryWhite: {
    fontSize: 14,
    textTransform: "none",
    color: "white",
  },

  textSecondary: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
    color: "#90949c",
    textTransform: "none",
  },

  textLink: {
    color: "#125688",
    fontWeight: "bold",
  },

  button: {
    marginTop: 10,
    marginBottom: 12,
    backgroundColor: "#458eff",
  },

  buttonContent: {
    height: 45,
    justifyContent: "center",
  },

  textLink: {
    color: "#125688",
  },

  postCard: {},
});

export default Styles;
