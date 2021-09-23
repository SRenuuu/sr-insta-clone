import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  Button,
  TextInput,
  Caption,
  ActivityIndicator,
} from "react-native-paper";
import { NativeRouter, Route, Link } from "react-router-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "./assets/styles";
import Toast from "react-native-toast-message";

const Signup = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isValidated, setIsValidated] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = () => {
    setIsLoading(true);
    setIsValidated(true);

    if (fullName && email && username && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
          // Write user data to DB
          firestore()
            .collection("users")
            .doc(userAuth.user.uid)
            .set({
              fullName: fullName,
              username: username,
              email: email,
              phone: phone,
              imgUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              createdAt: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              console.log("User data added to DB");
            });

          Toast.show({
            type: "success",
            text1: "Welcome to Instagram",
            text2: "User account created & signed in!",
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
          } else if (error.code === "auth/weak-password") {
            Toast.show({
              type: "info",
              text1: "Invalid password",
              text2: "Password should contain at least 6 characters",
            });
          } else if (error.code === "auth/email-already-in-use") {
            Toast.show({
              type: "error",
              text1: "Email already exists",
              text2: "The email address you entered is already in use",
            });
          } else {
            console.log(error);
            Toast.show({
              type: "error",
              text1: "Oops! That didn't work",
              text2: "Something went wrong, please try again!",
            });
          }
        });
    } else {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Invalid inputs",
        text2: "Please fill in all required details",
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
      <TextInput
        style={styles.textInput}
        label="Full Name"
        textContentType="name"
        autoCompleteType="name"
        value={fullName}
        mode="outlined"
        error={isValidated && !fullName}
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
        error={isValidated && !email}
        onChangeText={setEmail}
        theme={{ colors: { primary: "#125688" } }}
      />

      <TextInput
        style={styles.textInput}
        textContentType="telephoneNumber"
        autoCompleteType="tel"
        label="Phone"
        value={phone}
        mode="outlined"
        error={isValidated && !phone}
        onChangeText={setPhone}
        theme={{ colors: { primary: "#125688" } }}
      />

      <Caption style={styles.caption}>Pick a username and password</Caption>

      <TextInput
        style={styles.textInput}
        label="Username"
        textContentType="username"
        autoCompleteType="username"
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
        textContentType="newPassword"
        autoCompleteType="password"
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
          onPress={() => registerUser()}
        >
          <Text style={styles.textPrimaryWhite}>Register</Text>
        </Button>
      )}

      <View style={{ height: 20 }}></View>
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
