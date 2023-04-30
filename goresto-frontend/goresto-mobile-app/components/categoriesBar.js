import React from "react";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CategoryBar = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.all]}>All</Text>
      <Icon
        name="chevron-back"
        size={24}
        color="#000"
        style={styles.iconLeft}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={[styles.barContainer]} numberOfLines={1}>
          <View style={[styles.bar]}>
            <Text style={[styles.text]}>Chinese</Text>
            <Text style={[styles.text]}>French</Text>
            <Text style={[styles.text]}>Japanese</Text>
            <Text style={[styles.text]}>Italian</Text>
            <Text style={[styles.text]}>Lebanese</Text>
            <Text style={[styles.text]}>Indian</Text>
          </View>
        </View>
      </ScrollView>
      <Icon
        name="chevron-forward"
        size={24}
        color="#000"
        style={styles.iconRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 310,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  barContainer: {
    width: "100%",
  },
  bar: {
    flexDirection: "row",
    columnGap: 12,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  text: {
    fontSize: 15,
    color: "rgba(0,0,0,0.2)",
  },
  iconLeft: {
    paddingHorizontal: 3,
  },
  iconRight: {
    paddingLeft: 3,
  },
  all: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },
});

export default CategoryBar;
