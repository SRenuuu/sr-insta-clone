import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import {
  Button,
  TextInput,
  Caption,
  ActivityIndicator,
  Appbar,
  DefaultTheme,
} from "react-native-paper";
import { Link } from "react-router-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import styles from "../assets/styles";
import Toast from "react-native-toast-message";
import * as ImagePicker from "react-native-image-picker";

const Signup = () => {
  const [photo, setPhoto] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);

  const uploadFile = async (pathToFile) => {
    // uploads file
    await reference.putFile(pathToFile);
  };

  const registerUserAndUploadPhoto = async () => {
    Toast.show({
      type: "info",
      text1: "Creating profile",
    });

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        // auth()
        //   .currentUser.updateProfile({
        //     username: username,
        //   })
        //   .then(() => {
        //     console.log("Details updated in Firebase Authentication");
        //   });

        Toast.show({
          type: "info",
          text1: "Uploading photo",
        });
        // Upload photo to cloud storage
        const cloudRef = "/userPhotos/" + photo.assets[0].fileName;
        const reference = storage().ref(cloudRef);
        // path to existing file on filesystem
        const pathToFile = photo.assets[0].uri;

        uploadFile(pathToFile);

        const task = reference.putFile(pathToFile);

        task.then(() => {
          console.log("Image uploaded to the bucket!");

          // Get photo URL
          storage()
            .ref(cloudRef)
            .getDownloadURL()
            .then((url) => {
              // Write user data to DB
              firestore()
                .collection("users")
                .doc(userAuth.user.uid)
                .set({
                  fullName: fullName,
                  username: username,
                  email: email,
                  phone: phone,
                  imgUrl: url,
                  createdAt: firestore.FieldValue.serverTimestamp(),
                  myNetwork: [],
                })
                .then(() => {
                  console.log("User data added to DB");
                  Toast.show({
                    type: "success",
                    text1: "Welcome to Instagram",
                    text2: "User account created & signed in!",
                  });
                });
            });
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
  };

  const onClickRegister = () => {
    setIsValidated(true);

    if (fullName && email && username && password) {
      if (photo) {
        setIsLoading(true);
        registerUserAndUploadPhoto();
      } else {
        Toast.show({
          type: "error",
          text1: "No photo selected",
          text2: "Please select a photo to upload",
        });
      }
    } else {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Invalid inputs",
        text2: "Please fill in all required details",
      });
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      quality: 0.6,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
      if (!response.didCancel) {
        setPhoto(response);
      }
    });
  };

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        style={{
          backgroundColor: "white",
          height: 60,
          paddingHorizontal: 0,
        }}
      >
        <Link to="/" component={TouchableOpacity}>
          <Appbar.BackAction />
        </Link>
        <Text style={{ textAlign: "left", fontSize: 21, fontWeight: "bold" }}>
          Sign up
        </Text>
      </Appbar.Header>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContainerContent}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 15,
          }}
        >
          {photo ? (
            <Image
              source={{
                uri: photo.assets[0].uri,
              }}
              style={{
                width: 150,
                height: 150,
                marginTop: 20,
                marginBottom: 30,
                borderRadius: 75,
              }}
            />
          ) : (
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/sr-insta-clone.appspot.com/o/assets%2Fuser.png?alt=media&token=8951e2f0-3d1a-45f0-9ae0-ae5091bd9f81",
              }}
              style={{
                width: 100,
                height: 100,
                marginTop: 15,
                marginBottom: 25,
              }}
            />
          )}

          {!photo ? (
            <Button
              style={{ marginBottom: 10 }}
              mode="outlined"
              theme={{
                ...DefaultTheme,
                colors: {
                  ...DefaultTheme.colors,
                  primary: "#458eff",
                },
              }}
              onPress={() => handleChoosePhoto()}
            >
              <Text
                style={{ fontWeight: "bold", color: "#777777", fontSize: 13 }}
              >
                UPLOAD PHOTO
              </Text>
            </Button>
          ) : (
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                alignItem: "center",
                marginBottom: 5,
              }}
            >
              <Button
                style={{ marginBottom: 10, marginHorizontal: 15 }}
                mode="outlined"
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: "#458eff",
                  },
                }}
                onPress={() => handleChoosePhoto()}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#777777", fontSize: 13 }}
                >
                  CHANGE PHOTO
                </Text>
              </Button>
              <Button
                style={{ marginBottom: 10, marginHorizontal: 15 }}
                mode="outlined"
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: "#458eff",
                  },
                }}
                onPress={() => {
                  setPhoto(null);
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#777777", fontSize: 13 }}
                >
                  REMOVE PHOTO
                </Text>
              </Button>
            </View>
          )}
        </View>
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
            onPress={() => onClickRegister()}
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
      </ScrollView>
    </>
  );
};

export default Signup;
