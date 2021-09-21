import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Caption } from "react-native-paper";
import { NativeRouter, Route, Link } from "react-router-native";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Username"
        value={username}
        mode="outlined"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.textInput}
        label="Password"
        secureTextEntry="true"
        value={password}
        mode="outlined"
        onChangeText={setPassword}
      />

      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Log in
      </Button>
      <Caption style={styles.caption}>OR</Caption>
      <Link to="/signup" underlayColor="#f0f4f7">
        <Button
          style={styles.button}
          contentStyle={styles.buttonContent}
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          Register
        </Button>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "30px",
  },
  textInput: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
  },

  button: {
    marginTop: "20px",
    width: "100%",
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContent: {
    height: "50px",
  },
  caption: {
    fontSize: "0.75em",
    marginTop: "20px",
  },
});

export default Login;
