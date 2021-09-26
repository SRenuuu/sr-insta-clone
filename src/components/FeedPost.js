import React, { useState } from "react";
import { Text, View, Image, Vibration } from "react-native";
import { Button, Card, Paragraph, DefaultTheme } from "react-native-paper";

import auth from "@react-native-firebase/auth";
import styles from "../assets/styles";
import Icon from "react-native-vector-icons/AntDesign";
import moment from "moment";

const FeedPost = (props) => {
  const { post, onLikeClick, onUnLikeClick } = props;

  const [isLikedState, setIsLikedState] = useState(
    post.postLikedBy.includes(auth().currentUser.uid)
  );

  const [likesCount, setLikesCount] = useState(post.postLikesCount);

  return (
    <Card style={styles.postCard}>
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
        style={{ height: 300 }}
      />
      <Card.Actions style={{ paddingBottom: 3, paddingTop: 6 }}>
        {isLikedState ? (
          <Button
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                primary: "white",
              },
            }}
            style={{ marginRight: 4 }}
            onPress={() => {
              Vibration.vibrate(5);
              setIsLikedState(false);
              setLikesCount(likesCount - 1);
              onUnLikeClick(post.postID);
            }}
          >
            <Icon name="heart" size={28} color="#c51104" />
          </Button>
        ) : (
          <Button
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                primary: "white",
              },
            }}
            style={{ marginRight: 4 }}
            onPress={() => {
              Vibration.vibrate(5);
              setIsLikedState(true);
              setLikesCount(likesCount + 1);
              onLikeClick(post.postID);
            }}
          >
            <Icon name="hearto" size={28} color="black" />
          </Button>
        )}

        <Text style={{ fontWeight: "bold" }}>
          {likesCount + " like" + (likesCount !== 1 ? "s" : "")}
        </Text>
      </Card.Actions>
      <Card.Content>
        <Paragraph style={styles.postCaption}>
          <Text style={{ fontWeight: "bold" }}>
            {post.postAuthorUsername + " : "}
          </Text>
          {post.postCaption}
        </Paragraph>
        <Text style={{ fontSize: 12, color: "#888888" }}>
          {moment(
            moment(post.postDateTime * 1000).format("YYYY-MM-DD HH:mm"),
            "YYYY-MM-DD HH:mm"
          ).fromNow()}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default FeedPost;
