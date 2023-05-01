import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { URL } from "../configs/URL";
import axios from "axios";

const SearchBar = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);

  const handleChangeText = (value) => {
    setText(value);
  };

  useEffect(() => {
    if (text.length > 0) {
      axios
        .get(`${URL}/api/searchRestaurant/${text}`)
        .then((response) => {
          console.log(response.data.restaurants);
          setResult(response.data.restaurants);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setResult([]);
    }
  }, [text]);

  return (
    <View style={[styles.searchBar]}>
      <TextInput
        style={[styles.input]}
        value={text}
        onChangeText={handleChangeText}
        placeholder="search anything"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: { width: 160 },
  input: {
    width: "100%",
    height: 30,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    fontSize: 15,
  },
});

export default SearchBar;
