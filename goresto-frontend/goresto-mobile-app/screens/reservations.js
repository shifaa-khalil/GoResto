import * as React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import NavBar2 from "../components/navBar2";
import ReservationCard from "../components/reservationCard";
import Icon from "react-native-vector-icons/Ionicons";
import Reserved from "../assets/reserved.png";

const Restaurants = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />

        <Image style={styles.backgroundImage} source={Reserved}></Image>
        {/* 
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("Restaurants")}
        >
          <Icon name="chevron-back" size={24} color="#000" />
          <Text style={[styles.title]}>Upcoming reservations</Text>
          <Icon name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity> */}

        <ReservationCard
          restaurant="Doudou"
          date="Friday, May 3, 2023"
          time="19:00"
          location="Beirut, Hamra"
          count="5"
        />
        <ReservationCard
          restaurant="Doudou"
          date="Friday, May 3, 2023"
          time="19:00"
          location="Beirut, Hamra"
          count="5"
        />
        <ReservationCard
          restaurant="Doudou"
          date="Friday, May 3, 2023"
          time="19:00"
          location="Beirut, Hamra"
          count="5"
        />
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
  backgroundImage: {
    height: 250,
    resizeMode: "contain",
  },
  restaurants: {
    width: 310,
    marginVertical: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
  },
});

export default Restaurants;
