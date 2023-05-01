// import * as React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import Register from "./screens/register";
// import Signin from "./screens/signin";
// import Home from "./screens/home";
// import Restaurants from "./screens/restaurants";
// import Restaurant from "./screens/singleRestaurant";
// import Reservations from "./screens/reservations";
// import Reserving from "./screens/reserving";

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen
//           name="Register"
//           component={Register}
//           options={{ title: "Setup" }}
//         />
//         <Stack.Screen name="Signin" component={Signin} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Restaurants" component={Restaurants} />
//         <Stack.Screen name="Restaurant" component={Restaurant} />
//         <Stack.Screen name="Reservations" component={Reservations} />
//         <Stack.Screen name="Reserving" component={Reserving} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

export default class App extends Component {
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
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <View style={styles.container}>
        <CalendarPicker onDateChange={this.onDateChange} />

        <View>
          <Text>SELECTED DATE:{startDate}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
});
