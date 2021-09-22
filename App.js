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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
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

  return (
    <>
      <View style={styles.container}>
        <Text style={{ marginBottom: 20, textAlign: "center", fontSize: 18 }}>
          Welcome&nbsp;
          <Text style={{ fontWeight: "bold" }}>{user.email}</Text>
        </Text>
        <Button
          contentStyle={styles.buttonContent}
          mode="contained"
          title="Sign out"
          onPress={() => signOutUser()}
        ></Button>
      </View>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
});

export default App;
