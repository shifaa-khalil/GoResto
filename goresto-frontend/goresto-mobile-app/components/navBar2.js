import React, { useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { StyleSheet } from "react-native";
import SearchBar from "../components/searchBar";
import { useNavigation } from "@react-navigation/native";

const NavBar2 = ({
  onChangeText,
  value,
  onFilterSelected,
  onMinPriceChange,
  onMaxPriceChange,
  onMinRatingChange,
  onMaxRatingChange,
  onLocationChange,
  onSubmit,
}) => {
  const [visible, setVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [location, setLocation] = useState("");
  const [priceVisible, setPriceVisible] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);

  const handleFilterSelection = (filter) => {
    onFilterSelected(filter);
    if (filter == "price") {
      setPriceVisible(true);
      setRatingVisible(false);
      setLocationVisible(false);
    }
    if (filter == "rating") {
      setPriceVisible(false);
      setRatingVisible(true);
      setLocationVisible(false);
    }
    if (filter == "location") {
      setPriceVisible(false);
      setRatingVisible(false);
      setLocationVisible(true);
    }
  };

  const handleMinPriceChange = (minPrice) => {
    onMinPriceChange(minPrice);
    setMinRating("");
    setMaxRating("");
    setLocation("");
  };

  const handleMaxPriceChange = (minPrice) => {
    onMaxPriceChange(minPrice);
    setMinRating("");
    setMaxRating("");
    setLocation("");
  };

  const handleMinRatingChange = (minRating) => {
    onMinRatingChange(minRating);
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
  };
  const handleMaxRatingChange = (minRating) => {
    onMaxRatingChange(minRating);
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
  };
  const handleLocationChange = (location) => {
    onLocationChange(location);
    setMinRating("");
    setMaxRating("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <View style={[styles.navBar]}>
      <SearchBar value={value} onChangeText={onChangeText} />

      <View style={[styles.filterButton]}>
        <TouchableWithoutFeedback
          onPress={() => {
            visible ? setVisible(false) : setVisible(true);
          }}
        >
          <Text style={[styles.filter]}>Filter</Text>
        </TouchableWithoutFeedback>
      </View>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        {/* <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure?</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.modalText}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.modalText}>cancel</Text>
            </TouchableOpacity>
          </View> */}

        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback
            onPress={() => handleFilterSelection("price")}
          >
            <Text style={[styles.filterText]}>price</Text>
          </TouchableWithoutFeedback>
          <View
            style={[styles.price, { display: priceVisible ? "flex" : "none" }]}
          >
            <TextInput
              style={styles.filterInput}
              value={minPrice}
              onChangeText={(text) => {
                setMinPrice(text);
                handleMinPriceChange(text);
              }}
            />
            <TextInput
              style={styles.filterInput}
              value={maxPrice}
              onChangeText={(text) => {
                setMaxPrice(text);
                handleMaxPriceChange(text);
              }}
            />
          </View>
          <TouchableWithoutFeedback
            onPress={() => handleFilterSelection("rating")}
          >
            <Text style={[styles.filterText]}>rating</Text>
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.rating,
              { display: ratingVisible ? "flex" : "none" },
            ]}
          >
            <TextInput
              style={styles.filterInput}
              value={minRating}
              onChangeText={(text) => {
                setMinRating(text);
                handleMinRatingChange(text);
              }}
            />
            <TextInput
              style={styles.filterInput}
              value={maxRating}
              onChangeText={(text) => {
                setMaxRating(text);
                handleMaxRatingChange(text);
              }}
            />
          </View>
          <TouchableWithoutFeedback
            onPress={() => handleFilterSelection("location")}
          >
            <Text style={[styles.filterText]}>location</Text>
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.location,
              { display: locationVisible ? "flex" : "none" },
            ]}
          >
            <TextInput
              style={styles.filterInput}
              value={location}
              onChangeText={(text) => {
                setLocation(text);
                handleLocationChange(text);
              }}
            />
          </View>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={[styles.filter]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "rgba(0,0,0,0.2)",
  },
  filterText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  sortBy: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },
  filter: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  filters: {
    flexDirection: "row",
    width: 310,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  filterInput: {
    width: 30,
    height: 15,
    borderWidth: 1,
    textAlign: "center",
  },
  price: {
    flexDirection: "row",
  },
  rating: {
    flexDirection: "row",
  },
  location: {},
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 310,
    // height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    // paddingHorizontal: 25,
    paddingVertical: 20,
  },
  modalContainer: {
    backgroundColor: "#D43325",
    padding: 20,
    borderRadius: 10,
    marginTop: 180,
    width: 80,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  filterText: {
    fontSize: 15,
  },
});

export default NavBar2;
