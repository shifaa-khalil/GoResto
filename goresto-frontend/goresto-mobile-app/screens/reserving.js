import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import Calendar from "../components/calendar";
import TimePicker from "../components/timePicker";
import { URL } from "../configs/URL";

const Reserving = ({ route }) => {
  const navigation = useNavigation();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [count, setCount] = useState("");
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date().toLocaleTimeString("en-US", { hour12: false });
  const [update, setUpdate] = useState(false);
  const [token, setToken] = useState("");

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

  useEffect(() => {
    if (route.params.reservation_id) {
      setUpdate(true);
      setTime(route.params.time);
      setDate(route.params.date);
      setCount(route.params.count);
    }
  }, [route.params.reservation_id]);

  const validateForm = () => {
    let isValid = true;
    if (!date || !time || !count) {
      setError("All fields are required");
      isValid = false;
    } else if (date < today) {
      setError("Invalid date");
      isValid = false;
    } else if (date == today && time < now) {
      setError("Invalid time");
      isValid = false;
    }
    return isValid;
  };

  const handleChangeText = () => {
    if (validateForm) {
      setError("");
    }
  };

  const handleDateSelection = (date) => {
    setDate(
      `${date._i.year}-${(date._i.month + 1)
        .toString()
        .padStart(2, "0")}-${date._i.day.toString().padStart(2, "0")}`
    );
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const data = { date, time, count };
      if (update) {
        axios
          .put(
            `${URL}/api/updateReservation/${route.params.reservation_id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            navigation.replace("Reservations");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post(`${URL}/api/reserveTable/${route.params.restaurant_id}`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            navigation.replace("Reservations");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <View style={[styles.container]}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}{" "}
      <View style={[styles.form]}>
        <Calendar onDateSelect={handleDateSelection} />
        {/* <TimePicker /> */}
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
      <MyButton title={update ? "Update" : "Reserve"} onPress={handleSubmit} />
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
  errorContainer: {
    backgroundColor: "#D43325",
    borderRadius: 8,
    padding: 5,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "white",
  },
});

export default Reserving;
