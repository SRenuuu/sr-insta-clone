import React from "react";
import "react-native-gesture-handler";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { registerRootComponent } from "expo";

import App from "./App";
import Login from "./src/Login";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#405DE6",
    accent: "#405DE6",
  },
};

const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <Login />
    </PaperProvider>
  );
};

export default Main;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
