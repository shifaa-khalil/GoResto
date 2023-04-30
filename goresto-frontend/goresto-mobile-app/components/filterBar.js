import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

const FilterBar = () => {
  return (
    <View style={[styles.bar]}>
      <Text style={[styles.sortBy]}>SortBy</Text>
      <Text style={[styles.text]}>price</Text>
      <Text style={[styles.text]}>rating</Text>
      <Text style={[styles.text]}>location</Text>
      <Text style={[styles.filter]}>Filter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    width: 310,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "rgba(0,0,0,0.2)",
  },
  sortBy: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },
  filter: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

export default FilterBar;
