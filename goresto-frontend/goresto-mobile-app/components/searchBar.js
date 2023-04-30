import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";

const SearchBar = ({ title, placeHolder }) => {
  const [text, setText] = useState("");

  const handleChangeText = (value) => {
    setText(value);
  };

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
