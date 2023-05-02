import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const ReservationCard = ({
  restaurant,
  date,
  time,
  location,
  count,
  onEdit,
  onCancel,
}) => {
  return (
    <View style={[styles.card]}>
      <Text style={[styles.dateTime]}>
        {date} at {time}
      </Text>
      <View style={styles.details}>
        <View>
          <Text style={[styles.restaurant]}>{restaurant}</Text>
          <Text style={[styles.location]}>{location}</Text>
          <Text style={[styles.count]}>Table for: {count}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={onEdit}
            style={[styles.button, styles.edit]}
          >
            <Text style={[styles.text]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCancel}
            style={[styles.button, styles.cancel]}
          >
            <Text style={[styles.text]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 310,
    backgroundColor: "#F5F5F5",
    marginBottom: 50,
    marginTop: -30,
    borderRadius: 15,
  },
  details: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  dateTime: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "#D43325",
    borderBottomWidth: 2,
    paddingVertical: 20,
    textAlign: "center",
  },
  restaurant: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 18,
  },
  count: {
    fontSize: 18,
  },
  buttons: {
    justifyContent: "space-between",
    height: "100%",
  },
  button: {
    width: 80,
    height: 25,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  cancel: {
    backgroundColor: "#D43325",
  },
  edit: {
    backgroundColor: "#D6C02C",
  },
});

export default ReservationCard;
