import * as React from "react";
import { Button, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Input from "../components/input";

const Register = () => {
  return (
    <View style={[styles.container]}>
      <Input title="Name" placeHolder="Name" />
      <Input title="Email" placeHolder="Email" />
      <Input title="Password" placeHolder="Password" />
      <Input title="Confirm password" placeHolder="Confirm password" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
export default Register;
