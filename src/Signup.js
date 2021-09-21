import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Caption } from "react-native-paper";

const Signup = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Full Name"
        value={fullName}
        mode="outlined"
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={setEmail}
      />

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
        onPress={() => console.log("Signup clicked")}
      >
        Sign up
      </Button>
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
    fontSize: "0.7em",
    marginTop: "20px",
  },
});

export default Signup;
