import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReviewCard from "../components/reviewCard";
import { URL } from "../configs/URL";

const Ratings = ({ route }) => {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
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
    axios
      .get(`${URL}/api/getReviews/${route.params.restaurant_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response.data.reviews);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <ScrollView
      style={styles.screenContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container]}>
        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#d43325" />
          </View>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              restaurant={review.restaurant_id}
              date={new Date(review.created_at).toLocaleDateString()}
              customerName={review.user.name}
              rating={review.rating}
              review={review.content}
              reviewId={review.id}
              comments={review.comment}
            />
          ))
        ) : (
          <Text>No reviews</Text>
        )}
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
  spinner: {
    marginTop: 150,
  },
});

export default Ratings;
