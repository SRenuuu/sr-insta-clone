import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Button,
  Caption,
  Appbar,
  TextInput,
  ActivityIndicator,
  DefaultTheme,
} from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import styles from "../assets/styles";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const NewPost = (props) => {
  const handleRefreshCount = props.route.handleRefreshCount;
  const [caption, setCaption] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(0);
  const [isValidated, setIsValidated] = React.useState(false);

  useEffect(() => {
    if (uploadStatus === 1) {
      mainTimer = timer(1);
    }
    return () => {
      clearTimeout(mainTimer);
    };
  }, [uploadStatus]);

  useEffect(() => {
    console.log("NewPost props: ");
    console.log(props);
  }, [props]);

  const timer = (value) => {
    return setTimeout(() => {
      setCaption("");
      setLocation("");
      setPhoto(null);
      setIsPublishing(false);
      setUploadStatus(0);
    }, value * 1000);
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      quality: 0.7,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
      if (!response.didCancel) {
        setPhoto(response);
      }
    });
  };

  const publishPost = () => {
    setIsValidated(true);
    if (caption && location) {
      if (photo) {
        setIsPublishing(true);
        uploadPhotoAndPublishPost();
      } else {
        Toast.show({
          type: "error",
          text1: "No image selected",
          text2: "Please select an image to upload",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid inputs",
        text2: "Please check the input fields",
      });
    }
  };

  const renderButton = () => {
    if (isPublishing) {
      if (uploadStatus === 1) {
        return (
          <View>
            <Avatar.Icon
              size={65}
              icon="check-circle-outline"
              color="green"
              style={{
                backgroundColor: "transparent",
                alignSelf: "center",
              }}
            />
            <Text style={{ fontSize: 18 }}>
              Image uploaded, publishing post...
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <ActivityIndicator
              animating={true}
              color="black"
              size={25}
              style={{ marginTop: 15, marginBottom: 15 }}
            />
            <Text>{(uploadStatus * 100).toFixed(2) + " %"}</Text>
          </View>
        );
      }
    } else {
      return (
        <Button
          style={{
            backgroundColor: "#458eff",
            width: 300,
            marginVertical: 15,
          }}
          contentStyle={{ height: 50 }}
          mode="contained"
          color="white"
          onPress={() => publishPost()}
        >
          <Text style={styles.textPrimaryWhiteBold}>PUBLISH POST</Text>
        </Button>
      );
    }
  };

  const uploadPhotoAndPublishPost = async () => {
    Toast.show({
      type: "info",
      text1: "Uploading image",
    });
    const cloudRef = "/postImages/" + photo.assets[0].fileName;
    const reference = storage().ref(cloudRef);
    // path to existing file on filesystem
    const pathToFile = photo.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);

    const task = reference.putFile(pathToFile);

    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
      setUploadStatus(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes);
    });

    task.then(() => {
      console.log("Image uploaded to the bucket!");
      storage()
        .ref(cloudRef)
        .getDownloadURL()
        .then((url) => {
          console.log(firestore.FieldValue.serverTimestamp());

          firestore()
            .collection("posts")
            .add({
              postCaption: caption,
              postLocation: location,
              postDateTime: firestore.FieldValue.serverTimestamp(),
              postImageURL: url,
              postLikesCount: 0,
              postLikedBy: [],
              uid: firestore().doc("users/" + auth().currentUser.uid),
            })
            .then(() => {
              setIsValidated(false);

              mainTimer = timer(1);

              console.log("Post added!");
              handleRefreshCount();
              Toast.show({
                type: "success",
                text1: "Post published successfully",
              });
            });
        });
    });
  };

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        style={{
          backgroundColor: "white",
          height: 60,
          paddingHorizontal: 22,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 21, fontWeight: "bold" }}>
          New Post
        </Text>
      </Appbar.Header>
      <ScrollView style={styles.scrollViewContainerTop}>
        <Caption
          style={{
            fontSize: 21,
            padding: 10,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Publish a new post
        </Caption>

        <TextInput
          style={styles.newPostTextInput}
          label="Post Caption"
          textContentType="none"
          autoCompleteType="off"
          value={caption}
          onChangeText={setCaption}
          mode="outlined"
          error={isValidated && !caption}
          theme={{ colors: { primary: "#125688" } }}
        />

        <TextInput
          style={styles.newPostTextInput}
          label="Location"
          textContentType="location"
          autoCompleteType="off"
          value={location}
          onChangeText={setLocation}
          mode="outlined"
          error={isValidated && !location}
          theme={{ colors: { primary: "#125688" } }}
        />

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {photo ? (
            <Image
              source={{ uri: photo.assets[0].uri }}
              style={{
                width: 250,
                height: 250,
                marginVertical: 20,
                borderRadius: 10,
              }}
            />
          ) : (
            <Image
              source={{
                uri: "https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png",
              }}
              style={{
                width: 125,
                height: 125,
                marginTop: 5,
                marginBottom: 10,
              }}
            />
          )}

          {!photo ? (
            <Button
              style={{ width: 180, marginBottom: 10 }}
              contentStyle={styles.buttonContent}
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
              <Text style={{ fontWeight: "bold", color: "#777777" }}>
                UPLOAD IMAGE
              </Text>
            </Button>
          ) : (
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                alignItem: "center",
                marginBottom: 10,
              }}
            >
              <Button
                style={{ width: 150, marginHorizontal: 10 }}
                contentStyle={styles.buttonContent}
                mode="outlined"
                onPress={() => handleChoosePhoto()}
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: "#458eff",
                  },
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#777777" }}>
                  CHANGE IMAGE
                </Text>
              </Button>
              <Button
                style={{ width: 150, marginHorizontal: 10 }}
                contentStyle={styles.buttonContent}
                mode="outlined"
                onPress={() => {
                  setPhoto(null);
                }}
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: "#458eff",
                  },
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#777777" }}>
                  REMOVE IMAGE
                </Text>
              </Button>
            </View>
          )}

          <View style={styles.hrContainer}>
            <View style={styles.hr} />
            <View style={styles.hr} />
          </View>

          {renderButton()}
        </View>
      </ScrollView>
    </>
  );
};

export default NewPost;
