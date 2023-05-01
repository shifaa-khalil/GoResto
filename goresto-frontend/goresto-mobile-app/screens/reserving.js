import React, { useState } from "react";
import axios from "axios";
import { Image, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
// import GoPro from "../assets/GoPro.png";
import NavBar from "../components/navBar";

import { URL } from "../configs/URL";

const Reserving = () => {
  const navigation = useNavigation();

  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  const [count, setCount] = useState("");
  const [error, setError] = useState("");
  const today = new Date();
  const now = new Date().toLocaleTimeString();

  const validateForm = () => {
    let isValid = true;
    if (!date || !time || !count) {
      setError("All fields are required");
      isValid = false;
    } else if (date < today) {
      setError("Invalid date");
      isValid = false;
    } else if (time < now) {
      setError("Invalid time");
      isValid = false;
    }
    return isValid;
  };

  async function handleSubmit() {
    if (validateForm()) {
      console.log("success");
      // const data = { name, email, password, confirmPassword };
      // const result = await registerUser(data);
      // if (result.success) {
      //   navigation.navigate("Setup");
      // } else {
      //   setError(result.error);
      // }
    }
  }
  return (
    <View style={[styles.container]}>
      <NavBar />
      <Text>{error}</Text>
      <View style={[styles.form]}>
        <Input
          title="Time"
          placeHolder="Time"
          value={time}
          onChangeText={(text) => {
            setTime(text);
            handleChangeText();
          }}
        />
        <Input
          title="Count"
          placeHolder="Count"
          value={count}
          onChangeText={(text) => {
            setCount(text);
            handleChangeText();
          }}
        />
      </View>
      <View style={styles.buttons}>
        <MyButton title="Reserve" onPress={handleSubmit} />
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

export default Reserving;
