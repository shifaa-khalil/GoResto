import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import axios from "axios";
import Input from "./input";
import Star from "../assets/Star.png";
import { URL } from "../configs/URL";
import CommentCard from "./commentCard";

const ReviewCard = ({
  restaurant,
  customerName,
  date,
  rating,
  review,
  reviewId,
  comments,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [content, setContent] = useState("");
  const navigation = useNavigation();
  const [token, setToken] = useState("");

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

  const handleSend = () => {
    if (content !== "") {
      const data = { content };
      axios
        .post(`${URL}/api/addComment/${reviewId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.status);
          console.log(response.data.message);
          setContent("");
          navigation.replace("Ratings", { restaurant_id: restaurant });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.reviewCard]}>
        <View style={styles.row}>
          <Text style={[styles.name]}>{customerName}</Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.rating]}>{rating}</Text>
            <Image source={Star} style={styles.star} />
          </View>
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
          <View style={[styles.inputComment]}>
            <Input
              value={content}
              onChangeText={setContent}
              placeholder="comment..."
              maxLength="180"
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity onPress={handleSend} style={[styles.send]}>
              <Text style={[styles.text]}>Send</Text>
            </TouchableOpacity>
          </View>
          {comments &&
            comments.map((comment) => (
              <CommentCard
                key={comment.id}
                customer={comment.user.name}
                date={new Date(comment.created_at).toLocaleDateString()}
                comment={comment.content}
              />
            ))}
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
  ratingContainer: {
    flexDirection: "row",
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
    marginTop: 20,
    backgroundColor: "#D43325",
    alignSelf: "center",
  },
  send: {
    width: 70,
    height: 20,
    borderRadius: 15,
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
  },
  star: {
    height: 20,
    width: 20,
  },
});

export default ReviewCard;
