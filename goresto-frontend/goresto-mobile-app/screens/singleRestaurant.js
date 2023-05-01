import * as React from "react";
import { ScrollView, Image, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import NavBar2 from "../components/navBar2";
import Chinese from "../assets/chinese.png";
import Heart from "../assets/heart.png";
import Star from "../assets/Star.png";

const Restaurant = ({ route }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />
        <View style={[styles.restaurant]}>
          <Image source={route.params.image} style={[styles.image]} />
          <View style={[styles.details]}>
            <View style={[styles.text]}>
              <Text style={[styles.name]}>{route.params.name}</Text>
              <View style={[styles.row]}>
                <Text style={[styles.rating]}>{route.params.rating}</Text>
                <Image source={Star} style={styles.star} />
                {/* <Text style={[styles.cuisine]}>{route.params.cuisine}</Text> */}
              </View>
              <Text style={[styles.location]} numberOfLines={1}>
                {route.params.location}
              </Text>
            </View>
            <View style={[styles.heart]}>
              <Image source={Heart} />
            </View>
            <Text style={[styles.link]}>Reserve</Text>
          </View>
          <Text style={[styles.cost]}>
            Average per person: ${route.params.deposit}
          </Text>
          <Text style={[styles.link]}>View on map</Text>
          <Text style={[styles.link]}>View menu</Text>
          <Text style={[styles.link]}>Contact</Text>
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
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
  },
  text: {
    justifyContent: "center",
    flexBasis: "40%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  heart: {
    borderLeftWidth: 1,
    paddingLeft: 25,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: 20,
  },
  cost: {
    fontSize: 20,
  },
});

export default Restaurant;