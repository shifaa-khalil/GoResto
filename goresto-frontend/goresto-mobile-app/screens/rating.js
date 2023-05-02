import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import NavBar from "../components/navBar";
import Calendar from "../components/calendar";
import TimePicker from "../components/timePicker";
import { URL } from "../configs/URL";

const Reserving = ({ route }) => {
  const navigation = useNavigation();

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
    // if (validateForm()) {
    //   const data = { date, time, count };
    //   console.log(data);
    //     axios
    //       .put(
    //         `${URL}/api/updateReservation/${route.params.reservation_id}`,
    //         data,
    //         {
    //           headers: { "Content-Type": "application/json" },
    //         }
    //       )
    //       .then((response) => {
    //         console.log(response.data.stutus);
    //         console.log(response.data.message);
    //         navigation.navigate("Reservations");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    // }
  };

  return (
    <View style={[styles.container]}>
      <NavBar />
      <Text>{error}</Text>
      <View style={[styles.form]}>
        <Text>Rate {route.params.name}</Text>
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
          value={time}
          onChangeText={(text) => {
            setContent(text);
            handleChangeText();
          }}
        />
      </View>
      <View style={styles.buttons}>
        <MyButton title="Add" onPress={handleSubmit} />
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
