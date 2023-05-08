import React, { useState } from "react";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";
import Logo from "../assets/Logo.png";
import NavBar from "../components/navBar";
import { URL } from "../configs/URL";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  async function saveData(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  const validateForm = () => {
    let isValid = true;
    if (!email || !password) {
      setError("All fields are required");
      isValid = false;
    }
    return isValid;
  };

  const handleChangeText = () => {
    if (validateForm) {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const data = { email, password };
      axios
        .post(`${URL}/api/login/customer`, data)
        .then((response) => {
          saveData("name", response.data.user.name);
          saveData("token", response.data.authorisation.token);
          navigation.navigate("Home");

          console.log("loggedin");
          // const token = AsyncStorage.getItem("token");
          // const name = AsyncStorage.getItem("name");
          // console.log("Stored data:", token, name);
        })
        .catch((error) => {
          console.error(error);
          if (error.response.data && error.response.data.message == "no access")
            setError("This app is for customers");
          else setError("Email/Password is incorrect");
        });
    } else console.log(error);
  };

  return (
    <View style={[styles.container]}>
      {/* <NavBar /> */}
      <Image source={Logo} style={[styles.heading]} />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
      <View style={[styles.form]}>
        <Input
          title="Email"
          placeHolder="example@domain.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            handleChangeText();
          }}
        />
        <Input
          title="Password"
          placeHolder="********"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handleChangeText();
          }}
        />
      </View>
      <MyButton title="Sign in" onPress={handleSubmit} />
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <MyLink
          title="Register instead"
          onPress={() => navigation.replace("Register")}
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
    width: 120,
    height: 70,
    marginBottom: 40,
    marginTop: 20,
  },
  form: {
    marginBottom: 10,
  },
  row: {
    width: 310,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  errorContainer: {
    backgroundColor: "#D43325",
    borderRadius: 8,
    padding: 5,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "white",
  },
});

export default Signin;
