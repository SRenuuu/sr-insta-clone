import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { Link } from "react-router-native";
import styles from "../assets/styles";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log("Received user info");
    if (userInfo) {
      console.log(userInfo);
    }

    return () => {
      setUserInfo(null);
    };
  }, [userInfo]);

  const loginUser = () => {
    setIsValidated(true);
    setIsLoading(true);

    if (username && password) {
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
          console.log("User signed in sucessfully!");
          setUsername("");
          setPassword("");

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

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      // setUserInfo(userInfo);

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const googleUser = auth().signInWithCredential(googleCredential);

      return googleUser;
    } catch (error) {
      setIsLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Toast.show({
          type: "error",
          text1: "Sign in cancelled",
          text2: "User cancelled the Google sign in process",
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Toast.show({
          type: "info",
          text1: "Process in progress",
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Toast.show({
          type: "error",
          text1: "Google Play Services not available",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Oops, that didn't work. Please try again.",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 25 }}>
        <Image
          source={require("../assets/images/instagram-text-logo.png")}
          style={{ height: 52, width: 180 }}
        />
      </View>
      <TextInput
        style={styles.textInput}
        label="Email address"
        value={username}
        mode="outlined"
        error={isValidated && !username}
        onChangeText={setUsername}
        textContentType="emailAddress"
        autoCompleteType="email"
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
        textContentType="password"
        autoCompleteType="password"
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

      <View
        style={{
          marginTop: 5,
          marginBottom: 10,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <GoogleSigninButton
          style={{ width: 192, height: 50 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
          disabled={isLoading}
        />
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
      <View style={styles.hrContainer}>
        <View style={styles.hr} />
        <View>{/* <Text style={styles.hrText}>OR</Text> */}</View>
        <View style={styles.hr} />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Link
          to="/signup"
          disabled={isLoading}
          component={TouchableOpacity}
          activeOpacity={0.8}
          style={styles.touchable}
        >
          <Text style={styles.textPrimary}>Register</Text>
        </Link>
      </View>
    </View>
  );
};

export default Login;
