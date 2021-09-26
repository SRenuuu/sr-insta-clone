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
  Button,
  Card,
  DefaultTheme,
} from "react-native-paper";
// import { NavigationContainer } from "@react-navigation/native";
import styles from "../assets/styles";
import auth from "@react-native-firebase/auth";

const UserListItem = (props) => {
  const {
    uid,
    username,
    fullName,
    imgUrl,
    isFollowing,
    onFollowClick,
    onUnFollowClick,
  } = props;

  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  if (uid === auth().currentUser.uid) {
    return null;
  }

  return (
    <Card style={styles.userCard}>
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 4,
            marginTop: 4,
          }}
        >
          <Image
            source={{
              uri: imgUrl,
            }}
            style={{
              width: 48,
              height: 48,
              marginBottom: 6,
              borderRadius: 24,
              overflow: "hidden",
            }}
          />
          <View
            style={{
              marginLeft: 16,
              marginRight: 8,
              width: 176,
              backgroundColor: "white",
              paddingTop: 3,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              {fullName}
            </Text>
            <Text style={{ fontSize: 15, color: "grey" }}>{username}</Text>
          </View>
          <View
            style={{
              width: 117,
              marginTop: 2,
            }}
          >
            {isFollowingState ? (
              <Button
                style={styles.buttonSmallOutline}
                contentStyle={styles.buttonSmallContent}
                mode="outlined"
                compact={true}
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: "#458eff",
                  },
                }}
                onPress={() => {
                  onUnFollowClick(uid);
                  setIsFollowingState(false);
                }}
              >
                <Text style={styles.textPrimaryBlackSmall}>Following</Text>
              </Button>
            ) : (
              <Button
                style={styles.buttonSmall}
                contentStyle={styles.buttonSmallContent}
                mode="contained"
                compact={true}
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: "#458eff",
                  },
                }}
                onPress={() => {
                  onFollowClick(uid);
                  setIsFollowingState(true);
                }}
              >
                <Text style={styles.textPrimaryWhiteSmall}>Follow</Text>
              </Button>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default UserListItem;
