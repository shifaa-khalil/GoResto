import React from "react";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CategoryBar = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.all, styles.text]}>All</Text>
      <Icon name="chevron-back" size={24} color="#000" style={styles.icon} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={[styles.barContainer]} numberOfLines={1}>
          <View style={[styles.bar]} numberOfLines={1}>
            <Text style={[styles.text]}>Chinese</Text>
            <Text style={[styles.text]}>French</Text>
            <Text style={[styles.text]}>Japanese</Text>
            <Text style={[styles.text]}>Italian</Text>
            <Text style={[styles.text]}>Lebanese</Text>
            <Text style={[styles.text]}>Indian</Text>
          </View>
        </View>
      </ScrollView>
      <Icon name="chevron-forward" size={24} color="#000" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  barContainer: {
    width: "100%",
    // paddingHorizontal: 25,
  },
  bar: {
    flexDirection: "row",
    columnGap: 12,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  text: {
    fontSize: 18,
  },
  icon: {
    paddingHorizontal: 3,
  },
  all: {
    fontWeight: "bold",
  },
});

export default CategoryBar;
