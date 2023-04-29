import * as React from "react";
import { Button, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";

const Register = ({ navigation }) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.form]}>
        <Input title="Name" placeHolder="Name" />
        <Input title="Email" placeHolder="Email" />
        <Input title="Password" placeHolder="Password" />
        <Input title="Confirm password" placeHolder="Confirm password" />
      </View>
      <View>
        <MyButton title="Register" onPress={() => navigation.navigate("")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginBottom: 20,
  },
});
export default Register;
