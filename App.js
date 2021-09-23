import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Login from "./src/Login";
import Signup from "./src/Signup";
import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Home from "./src/Home";

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
  const [userData, setUserData] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    const response = firestore().collection("users").doc(user.uid);
    const data = await response.get();
    if (data) {
      setUserData(data.data());
    }
  };

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  if (initializing) return null;

  if (!user) {
    return (
      <>
        <NativeRouter>
          <View style={styles.container}>
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />
          </View>
        </NativeRouter>

        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Music', icon: 'queue-music' },
    { key: 'albums', title: 'Albums', icon: 'album' },
    { key: 'recents', title: 'Recents', icon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <>
      <NativeRouter>
        <View style={styles.containerFluid}>
          <Route path="/" component={() => <Home userData={userData} />} />
          <Route path="/my-profile" component={Signup} />
          <Route path="/messaging" component={Signup} />
        </View>
      </NativeRouter>

      <Toast
        config={toastConfig}
        ref={(ref) => Toast.setRef(ref)}
        style={styles.elevatedElement}
      />
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
  },

  elevatedElement: {
    zIndex: 9, // ios
    elevation: 9, // android
  },
});

export default App;
