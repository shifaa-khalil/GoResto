import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import EmptyStar from "../assets/emptyStar.png";
import Star from "../assets/Star.png";
import { URL } from "../configs/URL";

const Rating = ({ route }) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [done, setDone] = useState(false);
  // const [stars, setStars] = useState([]);

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
  const [emptyStars, setEmptyStars] = useState([]);
  const [filledStars, setFilledStars] = useState([]);

  const handlePress = (p) => {
    setDone(false);
    setRating(p);
    const tempFilled = [];
    const tempEmpty = [];

    for (let i = 1; i <= p; i++) {
      tempFilled.push(i);
      if (i == p && p == 5) setDone(true);
    }
    setFilledStars(tempFilled);

    if (p < 5) {
      for (let j = p + 1; j <= 5; j++) {
        tempEmpty.push(j);
        if (j == 5) {
          setDone(true);
        }
      }
    }
    setEmptyStars(tempEmpty);
  };

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

        {done == false ? (
          <View style={styles.stars}>
            <TouchableOpacity onPress={() => handlePress(1)}>
              <Image source={EmptyStar} style={styles.emptyStar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(2)}>
              <Image source={EmptyStar} style={styles.emptyStar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(3)}>
              <Image source={EmptyStar} style={styles.emptyStar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(4)}>
              <Image source={EmptyStar} style={styles.emptyStar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(5)}>
              <Image source={EmptyStar} style={styles.emptyStar} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.stars}>
            {filledStars.map((s) => (
              <TouchableOpacity onPress={() => handlePress(s)}>
                <Image source={Star} style={styles.emptyStar} />
              </TouchableOpacity>
            ))}
            {emptyStars.map((s) => (
              <TouchableOpacity onPress={() => handlePress(s)}>
                <Image source={EmptyStar} style={styles.emptyStar} />
              </TouchableOpacity>
            ))}
          </View>
        )}

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
