import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Appbar,
} from "react-native-paper";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "./assets/styles";
import Icon from "react-native-vector-icons/EvilIcons";

// const signOutUser = () => {
//   auth()
//     .signOut()
//     .then(() => {
//       console.log("User signed out!");
//       Toast.show({
//         type: "success",
//         text1: "User signed out!",
//       });
//     });
// };

const Home = (props) => {
  const { userData } = props;
  const postRef = firestore().collection("posts");

  const [posts, setPosts] = useState([]);
  const newPosts = [];

  useEffect(() => {
    // postRef.orderBy("createdAt", "desc").onSnapshot(
    //   (querySnapshot) => {
    //     const newPosts = [];
    //     querySnapshot.forEach((doc) => {
    //       const post = doc.data();
    //       post.id = doc.id;
    //       newPosts.push(post);
    //     });
    //     setPosts(newPosts);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    firestore()
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        console.log("Total posts: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.id);
          newPosts.push(documentSnapshot);
        });

        setPosts(newPosts);
      });
    return () => {
      setPosts([]);
    };
  }, []);

  const renderPosts = () => {
    return posts.map((post) => (
      <Card style={styles.postCard} key={post.id}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
            }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
              style={{ width: 36, height: 36, marginBottom: 8 }}
            />
            <View style={{ marginHorizontal: 14 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Sandul Renuja
              </Text>
              <Text style={{ fontSize: 11 }}>{post.data().postLocation}</Text>
            </View>
          </View>
        </Card.Content>
        <Card.Cover source={{ uri: post.data().postImageURL }} />
        <Card.Actions style={{ paddingBottom: 3, paddingTop: 6 }}>
          <Button>
            <Icon name="heart" size={36} color="black" />
          </Button>
          <Button>
            <Icon name="comment" size={36} color="black" />
          </Button>
        </Card.Actions>
        <Card.Content>
          <Paragraph style={styles.postCaption}>
            <Text style={{ fontWeight: "bold" }}>
              Sandul Renuja&nbsp;:&nbsp;
            </Text>
            {post.data().postCaption}
          </Paragraph>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Appbar.Header
          statusBarHeight={0}
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            height: 60,
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("./assets/images/instagram-text-logo.png")}
              style={{ height: 35, width: 120 }}
            />
          </View>
        </Appbar.Header>
        <ScrollView style={styles.scrollView}>
          {/* <Text style={{ marginBottom: 20, textAlign: "center", fontSize: 18 }}>
            Welcome&nbsp;
            <Text style={{ fontWeight: "bold" }}>
              Email: {userData ? userData.email : "Loading"}
            </Text>
          </Text> */}
          {/* <Button
          contentStyle={styles.buttonContent}
          mode="contained"
          title="Sign out"
          onPress={() => signOutUser()}
        ></Button> */}
          {renderPosts()}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;