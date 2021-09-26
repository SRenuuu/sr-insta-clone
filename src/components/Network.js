import React, { useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
// import { NavigationContainer } from "@react-navigation/native";
import storage, { firebase } from "@react-native-firebase/storage";
import styles from "../assets/styles";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import UserListItem from "./UserListItem";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// const Tab = createMaterialTopTabNavigator();

// const MyNetwork = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>My Network</Text>
//     </View>
//   );
// };

// const AddToNetwork = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       {allUsers.map((user) => {
//         <Text>My Network</Text>;
//       })}
//     </View>
//   );
// };

const Network = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [myNetwork, setMyNetwork] = useState([]);

  useEffect(() => {
    firestore()
      .collection("users")
      .orderBy("fullName", "asc")
      .get()
      .then((querySnapshot) => {
        let myUserData = querySnapshot.docs.find((user) => {
          return user.id === auth().currentUser.uid;
        });
        setMyNetwork(myUserData.data().myNetwork);
        setAllUsers(querySnapshot.docs);
      });
  }, []);

  useEffect(() => {
    console.log("===");
    console.log(myNetwork);
  }, [myNetwork]);

  const handleFollowClick = (uid) => {
    let temp = myNetwork;
    temp.push(uid);
    setMyNetwork(temp);

    firestore()
      .doc("users/" + auth().currentUser.uid)
      .update({
        myNetwork: firestore.FieldValue.arrayUnion(uid),
      });

    Toast.show({
      type: "success",
      text1: "User added to your network",
    });
  };

  const handleUnFollowClick = (uid) => {
    let temp = myNetwork;
    temp.filter((element) => {
      return element !== uid;
    });
    setMyNetwork(temp);

    firestore()
      .doc("users/" + auth().currentUser.uid)
      .update({
        myNetwork: firestore.FieldValue.arrayRemove(uid),
      });

    Toast.show({
      type: "success",
      text1: "User removed from your network",
    });
  };

  const renderUserList = () => {
    // if (allUsers.length !== 0) {
    //   console.log(allUsers[0].data());
    // }
    return allUsers.map((user) => {
      return (
        <UserListItem
          key={user.id}
          uid={user.id}
          username={user.data().username}
          fullName={user.data().fullName}
          imgUrl={user.data().imgUrl}
          isFollowing={myNetwork.includes(user.id)}
          onFollowClick={handleFollowClick}
          onUnFollowClick={handleUnFollowClick}
        />
      );
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
          Network
        </Text>
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>{renderUserList()}</ScrollView>
    </>
  );
};

export default Network;
