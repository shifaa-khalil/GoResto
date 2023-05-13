import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { URL } from "../configs/URL";

const TimePicker = ({
  selectedValue,
  onValueChange,
  restaurant_id,
  selectedDate,
}) => {
  const [token, setToken] = useState("");
  const [availabilities, setAvailabilities] = useState([]);

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      setToken(JSON.parse(value));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  useEffect(() => {
    getData("token");
  }, []);

  useEffect(() => {
    if (selectedDate && token) {
      axios
        .get(`${URL}/api/getAvailabilities/${restaurant_id}/${selectedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAvailabilities(response.data.availabilities);
          console.log(response.data.availabilities);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, selectedDate]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Time</Text>

      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.input}
      >
        {availabilities ? (
          selectedDate &&
          availabilities.map((a) => (
            <Picker.Item
              label={
                moment(a, "HH:mm:ss").format("HH:mm") +
                " - " +
                moment(a, "HH:mm:ss").add(2, "hours").format("HH:mm")
              }
              value={a}
            />
          ))
        ) : (
          <Picker.Item label="no availabilities" value="none" />
        )}
      </Picker>
    </View>
  );
};

// handleConfirm = (time) => {
//   this.setState({
//     selectedTime: moment(time).format("h:mm A"),
//     isTimePickerVisible: false,
//   });
// };

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 20, width: 310 },

  label: { fontSize: 20, marginBottom: 5 },
  input: {
    width: "100%",
    height: 40,
    paddingLeft: 15,
    borderColor: "#D43325",
    borderLeftColor: "#D43325",
    borderLeftWidth: 10,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 8,
  },
});

export default TimePicker;
