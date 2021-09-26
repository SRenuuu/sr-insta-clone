import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { Appbar, ActivityIndicator } from "react-native-paper";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import styles from "../assets/styles";
import FeedPost from "./FeedPost";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const refreshCount = props.route.refreshCount;
  const postRef = firestore().collection("posts");

  let totalPostCount;

  const newPosts = [];

  const timer = (value) => {
    return setTimeout(() => {
      if (newPosts.length === totalPostCount) {
        setPosts(newPosts);
      } else {
        return timer(value);
      }
    }, value * 1000);
  };

  useEffect(() => {
    console.log(posts.length);
  }, [posts]);

  useEffect(() => {
    console.log("Home props: ");
    console.log(props);

    mainTimer = timer(1);
    return () => {
      clearTimeout(mainTimer);
    };
  }, [refreshCount]);

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
              console.log(documentSnapshot.data().postLikedBy);

              let currentPost = {
                postID: documentSnapshot.id,
                postCaption: documentSnapshot.data().postCaption,
                postImageURL: documentSnapshot.data().postImageURL,
                postLikesCount: documentSnapshot.data().postLikesCount,
                postLikedBy: documentSnapshot.data().postLikedBy,
                postLocation: documentSnapshot.data().postLocation,
                postDateTime: documentSnapshot.data().postDateTime.seconds,
                postAuthorUsername: authorData.data().username,
                postAuthorImageURL: authorData.data().imgUrl,
              };
              newPosts.push(currentPost);
            });
        });
      });

    mainTimer = timer(1);
    return () => {
      clearTimeout(mainTimer);
    };
  }, [refreshCount]);

  const handleUnLikeClick = (postID) => {
    console.log("Dislike updated in DB: " + postID);
    firestore()
      .doc("posts/" + postID)
      .update({
        postLikesCount: firestore.FieldValue.increment(-1),
        postLikedBy: firestore.FieldValue.arrayRemove(auth().currentUser.uid),
      });
  };

  const handleLikeClick = (postID) => {
    console.log("Like updated in DB: " + postID);
    firestore()
      .doc("posts/" + postID)
      .update({
        postLikesCount: firestore.FieldValue.increment(1),
        postLikedBy: firestore.FieldValue.arrayUnion(auth().currentUser.uid),
      });
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <FeedPost
        key={post.postID}
        post={post}
        onLikeClick={handleLikeClick}
        onUnLikeClick={handleUnLikeClick}
      />
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
        <ScrollView style={styles.scrollView}>
          {refreshCount > -1 ? renderPosts() : null}
        </ScrollView>
      ) : (
        <View style={styles.containerFluid}>
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
