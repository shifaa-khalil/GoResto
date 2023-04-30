import React, { useState } from "react";
import axios from "axios";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";
import NavBar from "../components/navBar";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      isValid = false;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters");
      isValid = false;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleChangeText = () => {
    if (validateForm()) {
      setError("");
    }
  };

  async function saveData(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  async function registerUser(data) {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/register/customer`,
        data
      );
      const { user, authorisation } = response.data;
      await saveData("name", user.name);
      await saveData("token", authorisation.token);
      return { success: true };
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, error: "An error occurred" };
    }
  }

  // usage example
  async function handleSubmit() {
    if (validateForm()) {
      const data = { name, email, password, confirmPassword };
      const result = await registerUser(data);
      if (result.success) {
        navigation.navigate("Setup");
      } else {
        setError(result.error);
      }
    }
  }

  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     console.log("submitted");

  // const data = { name, email, password, confirmPassword };
  // axios
  //   .post("http://127.0.0.1:8000/api/register/customer", data)
  //   .then((response) => {
  //     navigation.navigate("Setup");
  //     localStorage.setItem("name", response.data.user.name);
  //     localStorage.setItem("token", response.data.authorisation.token);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     setError("Email already exists");
  //   });
  //   } else console.log({ error });
  // };

  return (
    <View style={[styles.container]}>
      <NavBar />
      <Image source={GoPro} style={[styles.heading]} />
      <Text>{error}</Text>
      <View style={[styles.form]}>
        <Input
          title="Name"
          placeHolder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            handleChangeText();
          }}
        />
        <Input
          title="Email"
          placeHolder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            handleChangeText();
          }}
        />
        <Input
          title="Password"
          placeHolder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handleChangeText();
          }}
        />
        <Input
          title="Confirm password"
          placeHolder="Confirm password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            handleChangeText();
          }}
        />
      </View>
      <View style={styles.buttons}>
        <MyButton title="Register" onPress={handleSubmit} />
        <MyLink
          title="Sign in instead"
          onPress={() => navigation.replace("Signin")}
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

export default Register;
