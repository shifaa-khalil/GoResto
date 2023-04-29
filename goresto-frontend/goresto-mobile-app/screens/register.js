import * as React from "react";
import { Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";

const Register = ({ navigation }) => {
  return (
    <View style={[styles.container]}>
      <Image source={GoPro} style={[styles.heading]} />
      <View style={[styles.form]}>
        <Input title="Name" placeHolder="Name" />
        <Input title="Email" placeHolder="Email" />
        <Input title="Password" placeHolder="Password" />
        <Input title="Confirm password" placeHolder="Confirm password" />
      </View>
      <View style={styles.buttons}>
        <MyButton title="Register" onPress={() => navigation.navigate("")} />
        <MyLink
          title="Sign in instead"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    width: 260,
    height: 30,
    marginBottom: 20,
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
export default Register;
