import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import {
  Button,
  TextInput,
  Caption,
  ActivityIndicator,
} from "react-native-paper";
import { NativeRouter, Route, Link } from "react-router-native";
import styles from "./assets/styles";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isValidated, setIsValidated] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = () => {
    setIsValidated(true);
    setIsLoading(true);

    if (username && password) {
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
          console.log("User signed in sucessfully!");

          Toast.show({
            type: "success",
            text1: "Welcome to Instagram",
            text2: "User signed in sucessfully",
          });
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === "auth/invalid-email") {
            Toast.show({
              type: "info",
              text1: "Invalid email",
              text2: "The email address you entered is invalid",
            });
          }

          if (error.code === "auth/user-not-found") {
            Toast.show({
              type: "error",
              text1: "User not found",
            });
          }

          if (error.code === "auth/wrong-password") {
            Toast.show({
              type: "error",
              text1: "Wrong password",
              text2: "The password you entered is incorrect",
            });

            setPassword("");
          }

          if (error.code === "auth/too-many-requests") {
            Toast.show({
              type: "error",
              text1: "Too many requests",
              text2: "User login suspended, please try again later",
            });

            setPassword("");
          }

          console.error(error);
        });
    } else {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Invalid inputs",
        text2: "Please check the input fields",
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#fafafa"
        barStyle="dark-content"
      />
      <View style={{ alignItems: "center", marginBottom: 25 }}>
        <Image
          source={require("./assets/images/instagram-text-logo.png")}
          style={{ height: 52, width: 180 }}
        />
      </View>
      <TextInput
        style={styles.textInput}
        label="Username"
        value={username}
        mode="outlined"
        error={isValidated && !username}
        onChangeText={setUsername}
        theme={{ colors: { primary: "#125688" } }}
      />
      <TextInput
        style={styles.textInput}
        label="Password"
        secureTextEntry={true}
        value={password}
        mode="outlined"
        error={isValidated && !password}
        onChangeText={setPassword}
        theme={{ colors: { primary: "#125688" } }}
      />
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#458eff"
          size={32}
          style={{ marginTop: 17, marginBottom: 18 }}
        />
      ) : (
        <Button
          style={styles.button}
          contentStyle={styles.buttonContent}
          mode="contained"
          onPress={() => loginUser()}
        >
          <Text style={styles.textPrimaryWhite}>Log in</Text>
        </Button>
      )}
      <Text style={styles.textSecondary}>
        Forgotten your login details?
        <Text style={styles.textLink}> Get help with logging in.</Text>
      </Text>
      <View style={styles.hrContainer}>
        <View style={styles.hr} />
        <View>
          <Text style={styles.hrText}>OR</Text>
        </View>
        <View style={styles.hr} />
      </View>
      {/* <Link to="/signup" underlayColor="#f0f4f7">
        <Button
          style={styles.button}
          contentStyle={styles.buttonContent}
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          Register
        </Button>
      </Link> */}
      <Link
        to="/signup"
        component={TouchableOpacity}
        activeOpacity={0.8}
        style={styles.touchable}
      >
        <Text style={styles.textPrimary}>Register</Text>
      </Link>
    </View>
  );
};

export default Login;
