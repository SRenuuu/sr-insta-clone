import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { BottomNavigation } from "react-native-paper";
import Login from "./src/components/Login";
import Signup from "./src/components/Signup";
import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Home from "./src/components/Home";
import NewPost from "./src/components/NewPost";
import Network from "./src/components/Network";
import Profile from "./src/components/Profile";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "65102243470-dpdr4c9mbge0hm25ddbu8gprdg2ji8ln.apps.googleusercontent.com",
});

const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),

  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),

  info: (props) => (
    <InfoToast
      {...props}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),
};

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [refreshCount, setRefreshCount] = useState(0);
  // const [userData, setUserData] = useState();

  const handleRefreshCount = () => {
    setRefreshCount(refreshCount + 1);
  };

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([]);

  useEffect(() => {
    setRoutes([
      {
        key: "home",
        title: "Home",
        icon: "home",
        color: "white",
        refreshCount: refreshCount,
      },
      {
        key: "network",
        title: "Network",
        icon: "account-group",
        color: "white",
      },
      {
        key: "newPost",
        title: "New Post",
        icon: "plus-circle",
        color: "white",
        handleRefreshCount: handleRefreshCount,
      },
      {
        key: "profile",
        title: "My Profile",
        icon: "account",
        color: "white",
      },
    ]);
  }, [refreshCount]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    network: Network,
    newPost: NewPost,
    profile: Profile,
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      console.log("===");
      console.log(user);

      if (!user.emailVerified) {
        return;
      }

      const usersRef = firestore().collection("users");
      usersRef
        .where("email", "==", user.email)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            usersRef
              .doc(auth().currentUser.uid)
              .set({
                fullName: user.displayName,
                username: user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                imgUrl: user.photoURL,
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
          }
        });
    }
  }, [user]);

  // const fetchUserData = async () => {
  //   const response = firestore().collection("users").doc(user.uid);
  //   const data = await response.get();
  //   if (data) {
  //     setUserData(data.data());
  //   }
  // };

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  if (initializing) return null;

  if (!user) {
    return (
      <>
        <Toast
          config={toastConfig}
          ref={(ref) => Toast.setRef(ref)}
          style={styles.elevatedElement}
        />

        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="dark-content"
        />

        <NativeRouter>
          <View style={styles.containerFluid}>
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />
          </View>
        </NativeRouter>
      </>
    );
  }

  // firestore()
  //   .collection("users")
  //   .doc(user.uid)
  //   .get()

  //   .then((data) => {
  //     if (data) {
  //       return null;
  //     }
  //   });

  // async function getDocument(db) {
  //   // [START firestore_data_get_as_map]
  //   const cityRef = db.collection("users").doc(uid);
  //   const doc = await cityRef.get();
  //   if (!doc.exists) {
  //     console.log("No such document!");
  //   } else {
  //     console.log("Document data:", doc.data());
  //     setUserData(doc.data());
  //   }
  //   // [END firestore_data_get_as_map]
  // }

  // getDocument(firestore());

  // const getData = async () => {
  //   const cityRef = firestore().collection("users").doc(uid);
  //   const doc = await cityRef.get();
  //   if (!doc.exists) {
  //     console.log("No such document!");
  //   } else {
  //     console.log("Document data:", doc.data());
  //   }
  // };

  return (
    <>
      {/* <NativeRouter>
        <View style={styles.containerFluid}>
          <Route path="/" component={() => <Home userData={userData} />} />
          <Route path="/my-profile" component={Signup} />
          <Route path="/messaging" component={Signup} />
        </View>
      </NativeRouter> */}

      <Toast
        config={toastConfig}
        ref={(ref) => Toast.setRef(ref)}
        style={styles.elevatedElement}
      />

      <SafeAreaView style={styles.containerFluid}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="dark-content"
        />

        {/* App body */}
        <BottomNavigation
          sceneAnimationEnabled={false}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          inactiveColor="#cccccc"
          activeColor="black"
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },

  containerFluid: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 0,
    paddingHorizontal: 0,
    backgroundColor: "white",
  },

  elevatedElement: {
    zIndex: 5, // ios
    elevation: 5, // android
  },
});

export default App;
