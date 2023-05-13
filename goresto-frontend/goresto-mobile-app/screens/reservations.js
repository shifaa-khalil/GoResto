import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReservationCard from "../components/reservationCard";
import Reserved from "../assets/reserved.png";
import { URL } from "../configs/URL";

const Reservations = () => {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      // return value !== null ? JSON.parse(value) : null;
      setToken(JSON.parse(value));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  useEffect(() => {
    getData("token");
  }, []);

  useEffect(() => {
    // setRefreshing(true);
    if (token !== "") {
      axios
        .get(`${URL}/api/getReservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setReservations(response.data.reservations);
          // setRefreshing(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else console.log("no token");
  }, [token]);

  const handleCancel = () => {
    setQuestionVisible(false);
    axios
      .delete(`${URL}/api/cancelReservation/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setRefreshing(true);
        window.location.replace("Reservations");
      })
      .catch((error) => {
        console.log(error);
      });
    // setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleCancel} />
      }
    >
      <View style={[styles.container]}>
        <Image source={Reserved} style={[styles.backgroundImage]} />
        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#d43325" />
          </View>
        ) : (
          reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              restaurant={reservation.restaurant.name}
              date={reservation.date}
              time={reservation.time}
              location={reservation.restaurant.location}
              count={reservation.count}
              onEdit={() =>
                navigation.navigate("Reserving", {
                  reservation_id: reservation.id,
                  date: reservation.date,
                  time: reservation.time,
                  count: reservation.count,
                  restaurant_id: reservation.restaurant_id,
                })
              }
              onCancel={() => {
                setQuestionVisible(true);
                setReservationId(reservation.id);
              }}
            />
          ))
        )}
        <Modal
          visible={questionVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setQuestionVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure?</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={[styles.modalText, styles.modalLink]}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setQuestionVisible(false)}>
              <Text style={[styles.modalText, styles.modalLink]}>cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
  },
  backgroundImage: {
    height: 250,
    width: 360,
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
  modalLink: {
    textDecorationLine: "underline",
  },
});

export default Reservations;
