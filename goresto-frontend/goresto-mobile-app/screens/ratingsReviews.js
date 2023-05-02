import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import NavBar2 from "../components/navBar2";
import ReservationCard from "../components/reservationCard";
import ReviewCard from "../components/reviewCard";
import { URL } from "../configs/URL";

const Ratings = () => {
  const navigation = useNavigation();
  //   const [reservations, setReservations] = useState([]);
  //   const [questionVisible, setQuestionVisible] = useState(false);
  //   const [reservationId, setReservationId] = useState(null);

  //   useEffect(() => {
  //     axios
  //       .get(`${URL}/api/getReservations`)
  //       .then((response) => {
  //         console.log(response.data.reservations);
  //         setReservations(response.data.reservations);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  //   const handleCancel = () => {
  //     setQuestionVisible(false);
  //     axios
  //       .delete(`${URL}/api/cancelReservation/${reservationId}`)
  //       .then((response) => {
  //         console.log(response.data.stutus);
  //         console.log(response.data.message);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />
        {/* <Image source={Reserved} style={[styles.backgroundImage]} /> */}
        {/* {reservations.map((reservation) => ( */}
        <ReviewCard
        // key={reservation.id}
        // restaurant={reservation.restaurant.name}
        // date={reservation.date}
        // time={reservation.time}
        // location={reservation.restaurant.location}
        // count={reservation.count}
        // onEdit={() =>
        //   navigation.navigate("Reserving", {
        //     reservation_id: reservation.id,
        //     date: reservation.date,
        //     time: reservation.time,
        //     count: reservation.count,
        //     restaurant_id: reservation.restaurant_id,
        //   })
        // }
        // onCancel={() => {
        //   setQuestionVisible(true);
        //   setReservationId(reservation.id);
        // }}
        />
        {/* ))} */}
        {/* <Modal
          visible={questionVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setQuestionVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure?</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.modalText}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setQuestionVisible(false)}>
              <Text style={styles.modalText}>cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
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
  modalContainer: {
    backgroundColor: "#D43325",
    padding: 20,
    borderRadius: 10,
    marginTop: 200,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
  },
  modalText: {
    color: "white",
  },
});

export default Ratings;
