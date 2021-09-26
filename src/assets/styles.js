import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignContent: "center",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },

  containerFluid: {
    backgroundColor: "white",
    flex: 1,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },

  containerTop: {
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: "white",
    textAlign: "center",
    flex: 1,
  },

  scrollViewContainerTop: {
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: "white",
    textAlign: "center",
    flex: 1,
  },

  scrollView: {
    backgroundColor: "white",
  },

  scrollViewContainer: {
    backgroundColor: "white",
    textAlign: "center",
    alignContent: "center",

    flex: 1,
  },

  postCaption: {
    color: "black",
  },

  scrollViewContainerContent: {
    justifyContent: "center",
    marginHorizontal: 30,
    paddingBottom: 40,
  },

  hrContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  hr: {
    flex: 1,
    height: 0.6,
    backgroundColor: "#777777",
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
    backgroundColor: "white",
    color: "black",
  },

  newPostTextInput: {
    height: 50,
    marginVertical: 8,
    backgroundColor: "white",
    color: "black",
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
  },

  textPrimaryWhite: {
    fontSize: 14,
    color: "white",
  },

  textPrimaryWhiteSmall: {
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 14,
    color: "white",
  },

  textPrimaryBlackSmall: {
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 14,
    color: "black",
  },

  textPrimaryWhiteBold: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },

  textPrimaryBlue: {
    fontSize: 14,
    color: "#90949c",
  },

  textSecondary: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 12,
    color: "#90949c",
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

  buttonSmall: {
    margin: 6,
    padding: 0,
    backgroundColor: "#458eff",
  },

  buttonSmallOutline: {
    margin: 6,
    padding: 0,
    backgroundColor: "white",
  },

  buttonContent: {
    height: 45,
    justifyContent: "center",
  },

  buttonSmallContent: {
    height: 35,
    justifyContent: "center",
  },

  textLink: {
    color: "#125688",
  },

  postCard: {
    backgroundColor: "white",
    borderRadius: 0,
    margin: 0,
  },

  userCard: {
    backgroundColor: "white",
    borderRadius: 0,
    marginVertical: 1,
    paddingHorizontal: 10,
  },
});

export default Styles;
