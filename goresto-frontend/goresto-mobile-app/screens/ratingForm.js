import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import { URL } from "../configs/URL";

const Rating = ({ route }) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let isValid = true;
    // if (!date || !time || !count) {
    //   setError("All fields are required");
    //   isValid = false;
    // } else if (date < today) {
    //   setError("Invalid date");
    //   isValid = false;
    // } else if (time < now) {
    //   setError("Invalid time");
    //   isValid = false;
    // }
    return isValid;
  };

  const handleChangeText = () => {
    if (validateForm()) {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const data = { rating, content };
      console.log(route.params.restaurant_id);
      axios
        .post(`${URL}/api/rateRestaurant/${route.params.restaurant_id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data.status);
          console.log(response.data.message);
          navigation.navigate("Ratings", {
            restaurant_id: route.params.restaurant_id,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={[styles.container]}>
      <Text>{error}</Text>
      <View style={[styles.form]}>
        <Text style={styles.restoName}>{route.params.name}</Text>
        <Input
          title="Rating"
          placeHolder="Rating"
          value={rating}
          onChangeText={(text) => {
            setRating(text);
            handleChangeText();
          }}
        />
        <Input
          title="Content"
          placeHolder="Content"
          value={content}
          onChangeText={(text) => {
            setContent(text);
            handleChangeText();
          }}
        />
      </View>
      <MyButton title="Add" onPress={handleSubmit} style={styles.button} />
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
  button: {
    alignSelf: "center",
  },
  restoName: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 30,
    fontSize: 25,
  },
});

export default Rating;
