import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import {
  Button,
  Card,
  Paragraph,
  Appbar,
  ActivityIndicator,
} from "react-native-paper";

import firestore from "@react-native-firebase/firestore";
import styles from "../assets/styles";
import Icon from "react-native-vector-icons/EvilIcons";
import moment from "moment";

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
  const [posts, setPosts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { userData } = props;
  const postRef = firestore().collection("posts");

  let totalPostCount;

  const newPosts = [];

  function callback() {
    console.log("all done");
  }

  const timer = (value) => {
    return setTimeout(() => {
      if (newPosts.length == totalPostCount) {
        setPosts(newPosts);
      } else {
        return timer(value);
      }
    }, value * 1000);
  };

  useEffect(() => {
    mainTimer = timer(1);
    return () => {
      clearTimeout(mainTimer);
    };
  }, []);

  useEffect(() => {

    firestore()
      .collection("posts")
      .orderBy("postDateTime", "desc")
      .get()
      .then((querySnapshot) => {
        totalPostCount = querySnapshot.size;

        querySnapshot.forEach((documentSnapshot) => {
          documentSnapshot
            .data()
            .uid.get()
            .then((authorData) => {
              console.log(authorData.data().username);

              let currentPost = {
                postID: documentSnapshot.id,
                postCaption: documentSnapshot.data().postCaption,
                postImageURL: documentSnapshot.data().postImageURL,
                postLikesCount: documentSnapshot.data().postLikesCount,
                postLocation: documentSnapshot.data().postLocation,
                postDateTime: documentSnapshot.data().postDateTime.seconds,
                postAuthorUsername: authorData.data().username,
                postAuthorImageURL: authorData.data().imgUrl,
              };
              newPosts.push(currentPost);
            });
        });

      });
  }, []);

  const renderPosts = () => {
    return posts.map((post) => (
      <Card style={styles.postCard} key={post.postID}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
            }}
          >
            <Image
              source={{
                uri: post.postAuthorImageURL,
              }}
              style={{
                width: 36,
                height: 36,
                marginBottom: 10,
                borderRadius: 18,
                overflow: "hidden",
              }}
            />
            <View style={{ marginHorizontal: 14 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {post.postAuthorUsername}
              </Text>
              <Text style={{ fontSize: 11 }}>{post.postLocation}</Text>
            </View>
          </View>
        </Card.Content>
        <Card.Cover
          source={{
            uri: post.postImageURL,
          }}
        />
        <Card.Actions style={{ paddingBottom: 3, paddingTop: 6 }}>
          <Button>
            <Icon name="heart" size={36} color="black" />
          </Button>
          <Text style={{ fontWeight: "bold" }}>
            {post.postLikesCount + " likes"}
          </Text>
        </Card.Actions>
        <Card.Content>
          <Paragraph style={styles.postCaption}>
            <Text style={{ fontWeight: "bold" }}>
              {post.postAuthorUsername + " : "}
            </Text>
            {post.postCaption}
          </Paragraph>
          <Text style={{ fontSize: 11, color: "#888888" }}>
            {moment(
              moment(post.postDateTime * 1000).format("YYYY-MM-DD HH:mm"),
              "YYYY-MM-DD HH:mm"
            ).fromNow()}
          </Text>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <>
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
            source={require("../assets/images/instagram-text-logo.png")}
            style={{ height: 35, width: 120 }}
          />
        </View>
      </Appbar.Header>
      {posts.length !== 0 ? (
        <ScrollView style={styles.scrollView}>{renderPosts()}</ScrollView>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size={50}
            color="black"
            style={{ marginVertical: 30 }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "black",
              textAlign: "center",
            }}
          >
            Loading posts...
          </Text>
        </View>
      )}
    </>
  );
};

export default Home;