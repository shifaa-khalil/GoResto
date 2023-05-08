import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
// import NavBar2 from "../components/navBar2";
import ReviewCard from "../components/reviewCard";
import { URL } from "../configs/URL";

const Ratings = ({ route }) => {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/api/getReviews/${route.params.restaurant_id}`)
      .then((response) => {
        console.log(response.data.reviews);
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        {/* <NavBar2 /> */}
        {/* <Image source={Reserved} style={[styles.backgroundImage]} /> */}

        {reviews.length > 0 ? (
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
