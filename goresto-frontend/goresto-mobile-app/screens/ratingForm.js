import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import EmptyStar from "../assets/emptyStar.png";
import { URL } from "../configs/URL";

const Rating = ({ route }) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [starPressed, setStarPressed] = useState(null);

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      // return value !== null ? JSON.parse(value) : null;
      setToken(JSON.parse(value));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  useEffect(() => {
    getData("token");
  }, []);

  const validateForm = () => {
    let isValid = true;
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
      axios
        .post(`${URL}/api/rateRestaurant/${route.params.restaurant_id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          navigation.replace("Ratings", {
            restaurant_id: route.params.restaurant_id,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (starPressed == 1) setRating(1);
    else if (starPressed == 2) setRating(2);
    else if (starPressed == 3) setRating(3);
    else if (starPressed == 4) setRating(4);
    else if (starPressed == 5) setRating(5);
  }, [starPressed]);

  return (
    <View style={[styles.container]}>
      <Text>{error}</Text>
      <View style={[styles.form]}>
        <Text style={styles.restoName}>{route.params.name}</Text>
        {/* <Input
          title="Rating"
          placeHolder="Rating"
          value={rating}
          onChangeText={(text) => {
            setRating(text);
            handleChangeText();
          }}
        /> */}
        <Text style={styles.label}>Rating</Text>
        <View style={styles.stars}>
          <TouchableOpacity onPress={() => setStarPressed(1)}>
            <Image source={EmptyStar} style={styles.emptyStar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarPressed(2)}>
            <Image source={EmptyStar} style={styles.emptyStar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarPressed(3)}>
            <Image source={EmptyStar} style={styles.emptyStar} />
          </TouchableOpacity>{" "}
          <TouchableOpacity onPress={() => setStarPressed(4)}>
            <Image source={EmptyStar} style={styles.emptyStar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarPressed(5)}>
            <Image source={EmptyStar} style={styles.emptyStar} />
          </TouchableOpacity>{" "}
        </View>
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
  stars: {
    flexDirection: "row",
    columnGap: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  label: { fontSize: 20 },
  emptyStar: {
    height: 20,
    width: 20,
  },
});

export default Rating;
