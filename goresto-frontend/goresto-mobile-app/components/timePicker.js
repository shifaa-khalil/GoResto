import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimePickerVisible: false,
      selectedTime: null,
    };
  }

  showTimePicker = () => {
    this.setState({
      isTimePickerVisible: true,
    });
  };

  hideTimePicker = () => {
    this.setState({
      isTimePickerVisible: false,
    });
  };

  handleConfirm = (time) => {
    this.setState({
      selectedTime: moment(time).format("h:mm A"),
      isTimePickerVisible: false,
    });
  };

  render() {
    const { selectedTime } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showTimePicker}>
          <Text style={styles.timeText}>
            {selectedTime ? selectedTime : "Select Time"}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={this.state.isTimePickerVisible}
          mode="time"
          onConfirm={this.handleConfirm}
          onCancel={this.hideTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 20,
    color: "black",
    paddingVertical: 10,
  },
});
