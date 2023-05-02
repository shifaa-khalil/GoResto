import React from "react";
import { View, TextInput } from "react-native";
import { StyleSheet } from "react-native";

const SearchBar = ({ onChangeText, value }) => {
  return (
    <View style={[styles.searchBar]}>
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        placeholder="type to search..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: { width: 225 },
  input: {
    width: "100%",
    height: 30,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    fontSize: 15,
    borderRadius: 15,
  },
});

export default SearchBar;
