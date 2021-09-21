import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Login from "./src/Login";
import Signup from "./src/Signup";

const App = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
});

export default App;
