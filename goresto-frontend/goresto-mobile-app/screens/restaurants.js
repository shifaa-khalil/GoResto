import * as React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import NavBar2 from "../components/navBar2";
import Chinese from "../assets/chinese.png";
import Japanese from "../assets/japanese.png";
import Italian from "../assets/italian.png";
import Lebanese from "../assets/lebanese.png";
import French from "../assets/french.png";
import Indian from "../assets/indian.png";
import RestaurantCard from "../components/restaurantCard";
import CategoryBar from "../components/categoriesBar";
import FilterBar from "../components/filterBar";

const Restaurants = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />
        <CategoryBar />
        <FilterBar />
        <View style={[styles.restaurants]}>
          <RestaurantCard
            image={French}
            name="Doudou"
            rating="4.2"
            cuisine="French"
            location="Beirut-Sioufi"
            onPress={() =>
              navigation.navigate("Restaurant", { cuisine: "French" })
            }
          />
          <RestaurantCard
            image={Chinese}
            name="Doudou"
            rating="4.2"
            cuisine="Chinese"
            location="Beirut-Sioufi"
            onPress={() =>
              navigation.navigate("Restaurant", { cuisine: "Chinese" })
            }
          />
          <RestaurantCard
            image={Japanese}
            name="Doudou"
            rating="4.2"
            cuisine="Japanese"
            location="Beirut-Sioufi"
            onPress={() =>
              navigation.navigate("Restaurant", { cuisine: "Japanese" })
            }
          />
          <RestaurantCard
            image={Italian}
            name="Doudou"
            rating="4.2"
            cuisine="Italian"
            location="Beirut-Sioufi"
            onPress={() =>
              navigation.navigate("Restaurant", { cuisine: "Italian" })
            }
          />
          <RestaurantCard
            image={Lebanese}
            name="Doudou"
            rating="4.2"
            cuisine="Lebanese"
            location="Beirut-Sioufi"
            onPress={() =>
              navigation.navigate("Restaurant", { cuisine: "Lebanese" })
            }
          />
          <RestaurantCard
            image={Indian}
            name="Doudou"
            rating="4.2"
            cuisine="Indian"
            location="Beirut-Sioufi"
            onPress={() =>
              navigation.navigate("Restaurant", { cuisine: "Indian" })
            }
          />
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
  restaurants: {
    width: 310,
    marginVertical: 40,
  },
});

export default Restaurants;
