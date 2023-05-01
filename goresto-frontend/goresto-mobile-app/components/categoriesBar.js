import React, { useState } from "react";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CategoryBar = ({ onCategorySelected }) => {
  // const [pressedCategory, setPressedCategory] = useState("");

  const handleCategorySelection = (category) => {
    // setPressedCategory(category);
    onCategorySelected(category);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleCategorySelection("all")}>
        <Text style={[styles.all]}>All</Text>
      </TouchableWithoutFeedback>
      <Icon
        name="chevron-back"
        size={24}
        color="#000"
        style={styles.iconLeft}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={[styles.barContainer]} numberOfLines={1}>
          <View style={[styles.bar]}>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("chinese")}
            >
              <Text style={[styles.text]}>Chinese</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("french")}
            >
              <Text style={[styles.text]}>French</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("japanese")}
            >
              <Text style={[styles.text]}>Japanese</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("italian")}
            >
              <Text style={[styles.text]}>Italian</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("lebanese")}
            >
              <Text style={[styles.text]}>Lebanese</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("american")}
            >
              <Text style={[styles.text]}>American</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("mexican")}
            >
              <Text style={[styles.text]}>Mexican</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("indian")}
            >
              <Text style={[styles.text]}>Indian</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("turkish")}
            >
              <Text style={[styles.text]}>Turkish</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("Spanish")}
            >
              <Text style={[styles.text]}>spanish</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("greek")}
            >
              <Text style={[styles.text]}>Greek</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleCategorySelection("thai")}
            >
              <Text style={[styles.text]}>Thai</Text>
            </TouchableWithoutFeedback>
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
