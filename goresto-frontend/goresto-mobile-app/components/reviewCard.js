import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";
import Input from "./input";
import Send from "../assets/send.png";
import { URL } from "../configs/URL";

const ReviewCard = ({
  customerName,
  date,
  rating,
  review,
  onComment,
  content,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [content, setContent] = useState("");

  // const handleSend = () => {
  //   if (content !== "") {
  //     const data = { content };
  //     axios
  //       .post(`${URL}/api/addComment/20`, data, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       })
  //       .then((response) => {
  //         console.log(response.data.status);
  //         console.log(response.data.message);
  //         setContent("");
  //         // Navigation.replace("RatingsReviews");
  //         // navigation.navigate("Ratings");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={[styles.reviewCard]}>
        <View style={styles.row}>
          <Text style={[styles.name]}>{customerName}</Text>
          <Text style={[styles.rating]}>{rating}</Text>
        </View>
        <View style={styles.review}>
          <Text style={[styles.content]}>{review}</Text>
        </View>
        <Text style={[styles.date]}>{date}</Text>

        <TouchableOpacity
          onPress={
            commentsVisible
              ? () => setCommentsVisible(false)
              : () => setCommentsVisible(true)
          }
          style={[styles.button]}
        >
          <Text style={[styles.text]}>
            {commentsVisible ? "Hide" : "Comment"}
          </Text>
        </TouchableOpacity>
      </View>
      {commentsVisible && (
        <View style={styles.commentSection}>
          <View style={[styles.inputComment, styles.row]}>
            <Input
              value={content}
              onChangeText={setContent}
              placeholder="comment..."
              maxLength="180"
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity onPress={onComment} style={[styles.button]}>
              <Image source={Send} />
            </TouchableOpacity>
          </View>
          <View style={styles.commentCard}>
            <View style={styles.row}>
              <Text style={[styles.name]}>Carla</Text>
              <Text style={styles.date}>2023-2-3</Text>
            </View>
            <View style={styles.review}>
              <Text>Thanks for the comment</Text>
            </View>
          </View>
          <View style={styles.commentCard}>
            <View style={styles.row}>
              <Text style={[styles.name]}>Sara</Text>
              <Text style={styles.date}>2023-5-5</Text>
            </View>
            <View style={styles.review}>
              <Text>Helpful</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  reviewCard: {
    width: 310,
    paddingVertical: 20,
    justifyContent: "space-between",
    height: 260,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: 600,
    fontSize: 20,
  },
  rating: {
    fontWeight: 600,
    fontSize: 20,
  },
  date: {
    alignSelf: "flex-end",
    fontSize: 13,
  },
  content: {
    fontWeight: 600,
    fontSize: 15,
  },
  review: {
    flexBasis: "55%",
  },
  button: {
    width: 70,
    height: 20,
    borderRadius: 15,
    // marginTop: 20,
    backgroundColor: "#D43325",
    alignSelf: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  commentCard: {
    marginLeft: 50,
    width: 260,
    paddingVertical: 20,
    justifyContent: "space-between",
    height: 120,
    // borderBottomWidth: 1,
  },
});

export default ReviewCard;
