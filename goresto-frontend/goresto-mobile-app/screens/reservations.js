import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import NavBar2 from "../components/navBar2";
import ReservationCard from "../components/reservationCard";
import Reserved from "../assets/reserved.png";
import { URL } from "../configs/URL";

const Reservations = () => {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/api/getReservations`)
      .then((response) => {
        console.log(response.data.reservations);
        setReservations(response.data.reservations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />
        <Image source={Reserved} style={[styles.backgroundImage]} />
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            restaurant={reservation.restaurant.name}
            date={reservation.date}
            time={reservation.time}
            location={reservation.restaurant.location}
            count={reservation.count}
          />
        ))}
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

export default Reservations;
