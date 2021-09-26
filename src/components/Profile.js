import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { Button, Appbar, DefaultTheme } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "../assets/styles";
import Toast from "react-native-toast-message";
import moment from "moment";

const Profile = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchUserData();
    return setUserData([]);
  }, []);

  const fetchUserData = async () => {
    const response = firestore()
      .collection("users")
      .doc(auth().currentUser.uid);
    const data = await response.get();
    if (data) {
      setUserData(data.data());
    }
  };

  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        Toast.show({
          type: "success",
          text1: "User signed out!",
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
          My Profile
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
          {userData ? (
            <Image
              source={{
                uri: userData.imgUrl,
              }}
              style={{
                width: 150,
                height: 150,
                marginTop: 30,
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

          {/* {!photo ? (
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
          )} */}

          <Text style={{ fontSize: 18, lineHeight: 36 }}>
            Full Name :&nbsp;
            <Text style={{ fontWeight: "bold" }}>
              {userData && userData.fullName}
            </Text>
          </Text>

          <Text style={{ fontSize: 18, lineHeight: 36 }}>
            Username :&nbsp;
            <Text style={{ fontWeight: "bold" }}>
              {userData && userData.username}
            </Text>
          </Text>

          <Text style={{ fontSize: 18, lineHeight: 36 }}>
            Email :&nbsp;
            <Text style={{ fontWeight: "bold" }}>
              {userData && userData.email}
            </Text>
          </Text>

          <Text style={{ fontSize: 18, lineHeight: 36 }}>
            Phone :&nbsp;
            <Text style={{ fontWeight: "bold" }}>
              {userData && userData.phone}
            </Text>
          </Text>

          <Text style={{ fontSize: 18, lineHeight: 36 }}>
            Account created :&nbsp;
            <Text style={{ fontWeight: "bold" }}>
              {userData &&
                userData.createdAt &&
                moment(
                  moment(userData.createdAt.seconds * 1000).format(
                    "YYYY-MM-DD HH:mm"
                  ),
                  "YYYY-MM-DD HH:mm"
                ).fromNow()}
            </Text>
          </Text>

          <View style={{ height: 20 }}></View>
          <View style={styles.hrContainer}>
            <View style={styles.hr} />
            <View style={styles.hr} />
          </View>

          <Button
            style={{ width: 180, marginBottom: 10, marginTop: 20 }}
            contentStyle={styles.buttonContent}
            mode="outlined"
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                primary: "#458eff",
              },
            }}
            onPress={() => signOutUser()}
          >
            <Text style={{ fontWeight: "bold", color: "#777777" }}>
              Log out
            </Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
