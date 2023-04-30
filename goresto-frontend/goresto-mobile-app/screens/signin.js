import * as React from "react";
import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";
import NavBar from "../components/navBar";

const Signin = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <NavBar />
      <Image source={GoPro} style={[styles.heading]} />
      <View style={[styles.form]}>
        <Input title="Email" placeHolder="Email" />
        <Input title="Password" placeHolder="Password" />
      </View>
      <View style={styles.buttons}>
        <MyButton title="Sign in" onPress={() => navigation.navigate("")} />
        <MyLink
          title="Register instead"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  heading: {
    width: 260,
    height: 30,
    marginBottom: 40,
    marginTop: 20,
  },
  form: {
    marginBottom: 20,
  },
  buttons: {
    width: 260,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Signin;
