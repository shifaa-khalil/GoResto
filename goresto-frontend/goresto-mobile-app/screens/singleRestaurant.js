import * as React from "react";
import { ScrollView, Image, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Star from "../assets/Star.png";
import menu from "../assets/menuMobile.png";
import location from "../assets/location.jpeg";
import reviews from "../assets/reviewsMobile.jpeg";
import MyButton from "../components/button";

const Restaurant = ({ route }) => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <View style={[styles.restaurant]}>
          <Image source={route.params.image} style={[styles.image]} />
          <View style={[styles.details]}>
            <View style={styles.secRow}>
              <Text style={[styles.name]}>{route.params.name}</Text>
              {route.params.rating ? (
                <View style={[styles.row]}>
                  <Text style={styles.rating}>{route.params.rating}</Text>
                  <Image source={Star} style={styles.star} />
                  <Text style={styles.rating}>
                    ({route.params.review_count})
                  </Text>
                </View>
              ) : (
                <Text>No ratings</Text>
              )}
            </View>
            <Text style={[styles.location]} numberOfLines={1}>
              {route.params.location}
            </Text>
          </View>
          <Text style={[styles.cost]}>
            Average per person: ${route.params.deposit}
          </Text>
          <View style={styles.secRow}>
            <TouchableOpacity
              style={styles.linkRow}
              onPress={() =>
                navigation.navigate("Ratings", {
                  restaurant_id: route.params.restaurant_id,
                  name: route.params.name,
                  image: route.params.image,
                })
              }
            >
              <Image source={reviews} style={styles.icon} />
              <Text style={[styles.secondaryLink]}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkRow}
              onPress={() =>
                navigation.navigate("Menu", {
                  restaurant_id: route.params.restaurant_id,
                  name: route.params.name,
                  image: route.params.image,
                })
              }
            >
              <Image source={menu} style={styles.icon} />
              <Text style={[styles.secondaryLink]}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkRow}
              onPress={() =>
                navigation.navigate("Menu", {
                  restaurant_id: route.params.restaurant_id,
                  name: route.params.name,
                  image: route.params.image,
                })
              }
            >
              <Image source={location} style={styles.icon} />
              <Text style={[styles.secondaryLink]}>Location</Text>
            </TouchableOpacity>
            {/* <Text style={[styles.link]}>Contact</Text> */}
          </View>
          <MyButton
            title="Reserve"
            onPress={() =>
              navigation.navigate("Reserving", {
                restaurant_id: route.params.restaurant_id,
                name: route.params.name,
                rating: route.params.rating,
                location: route.params.location,
                deposit: route.params.deposit,
                image: route.params.image,
              })
            }
            style={styles.button}
          />
          {/* <MyButton
            title="Rate"
            onPress={() =>
              navigation.navigate("Rating", {
                restaurant_id: route.params.restaurant_id,
                name: route.params.name,
                rating: route.params.rating,
                location: route.params.location,
                deposit: route.params.deposit,
                image: route.params.image,
              })
            }
            style={styles.button}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  restaurant: {
    width: 310,
    marginVertical: 40,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 230,
    borderRadius: 15,
  },
  details: {
    width: "100%",
    paddingVertical: 25,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
  },
  secRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 310,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cuisine: {
    fontSize: 20,
  },
  location: {
    fontSize: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  star: {
    height: 20,
    width: 20,
  },
  icon: {
    height: 25,
    width: 25,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: 20,
    color: "#D43325",
  },
  secondaryLink: {
    fontSize: 20,
  },
  cost: {
    fontSize: 20,
    marginVertical: 25,
  },
  button: {
    marginTop: 25,
  },
});

export default Restaurant;
