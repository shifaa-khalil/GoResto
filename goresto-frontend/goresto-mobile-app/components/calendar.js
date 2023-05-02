import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.props.onDateSelect(date);
    console.log(date);
    date._i.year = "16:30:00";
    console.log(date);
  }

  // onDateChange(date) {
  //   const newDate = moment(date).set({ hour: 15, minute: 30 });

  //   this.setState({
  //     selectedStartDate: newDate,
  //   });
  //   this.props.onDateSelect(newDate);
  //   console.log(newDate);
  // }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <View style={styles.calendar}>
            <CalendarPicker
              onDateChange={this.onDateChange}
              todayBackgroundColor="#D6C02C"
              selectedDayColor="#D43325"
              selectedDayTextColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  bodyContainer: {
    width: 310,
  },
  calendar: {},
});
