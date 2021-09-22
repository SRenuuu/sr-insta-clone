import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, TextInput, Caption } from "react-native-paper";
import { NativeRouter, Route, Link } from "react-router-native";
import auth from "@react-native-firebase/auth";
import styles from "./assets/styles";
import Toast from "react-native-toast-message";

const Signup = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const registerUser = () => {
    if (email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("User account created & signed in!");

          Toast.show({
            type: "success",
            text1: "Welcome to Instagram",
            text2: "User account created & signed in!",
          });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Toast.show({
              type: "error",
              text1: "Email already exists",
              text2: "That email address is already in use!",
            });
          }

          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");

            Toast.show({
              type: "error",
              text1: "Invalid email",
              text2: "That email address is invalid!",
            });
          }

          if (error.code === "auth/weak-password") {
            console.log("That email address is invalid!");

            Toast.show({
              type: "info",
              text1: "Invalid password",
              text2: "Password should contain at least 6 characters",
            });
          }

          console.error(error);
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid inputs",
        text2: "Please check your email and password",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Full Name"
        textContentType="name"
        autoCompleteType="name"
        value={fullName}
        mode="outlined"
        onChangeText={setFullName}
        theme={{ colors: { primary: "#125688" } }}
      />

      <TextInput
        style={styles.textInput}
        textContentType="emailAddress"
        autoCompleteType="email"
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={setEmail}
        theme={{ colors: { primary: "#125688" } }}
      />

      <TextInput
        style={styles.textInput}
        label="Username"
        textContentType="username"
        autoCompleteType="username"
        value={username}
        mode="outlined"
        onChangeText={setUsername}
        theme={{ colors: { primary: "#125688" } }}
      />

      <TextInput
        style={styles.textInput}
        label="Password"
        secureTextEntry={true}
        textContentType="newPassword"
        autoCompleteType="password"
        value={password}
        mode="outlined"
        onChangeText={setPassword}
        theme={{ colors: { primary: "#125688" } }}
      />

      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
        onPress={() => registerUser()}
      >
        Sign up
      </Button>
      <View style={styles.hrContainer}>
        <View style={styles.hr} />
        <View>
          <Text style={styles.hrText}>Already have an account?</Text>
        </View>
        <View style={styles.hr} />
      </View>

      <Link
        to="/"
        component={TouchableOpacity}
        activeOpacity={0.8}
        style={styles.touchable}
      >
        <Text style={styles.textPrimary}>Log in</Text>
      </Link>
    </View>
  );
};

export default Signup;
