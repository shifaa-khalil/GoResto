import React, { useState } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";

const FilterBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View style={[styles.bar]}>
        <Text style={[styles.sortBy]}>SortBy</Text>
        <Text style={[styles.text]}>price</Text>
        <Text style={[styles.text]}>rating</Text>
        <Text style={[styles.text]}>location</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            visible ? setVisible(false) : setVisible(true);
          }}
        >
          <Text style={[styles.filter]}>Filter</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.filters, { display: visible ? "flex" : "none" }]}>
        <Text style={[styles.filterText]}>price</Text>
        <Text style={[styles.filterText]}>rating</Text>
        <Text style={[styles.filterText]}>location</Text>
      </View>
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
  filterText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
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
  filters: {
    flexDirection: "row",
    width: 310,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});

export default FilterBar;
