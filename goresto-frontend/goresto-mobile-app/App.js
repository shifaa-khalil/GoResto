import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/register";
import Signin from "./screens/signin";
import Home from "./screens/home";
import Restaurants from "./screens/restaurants";
import Restaurant from "./screens/singleRestaurant";
import Reservations from "./screens/reservations";
import Reserving from "./screens/reserving";
import Menu from "./screens/menu";
import Rating from "./screens/rating";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Register"
          component={Register}
          // options={{ title: "Setup" }}
        />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Restaurants" component={Restaurants} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="Reservations" component={Reservations} />
        <Stack.Screen name="Reserving" component={Reserving} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Rating" component={Rating} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
