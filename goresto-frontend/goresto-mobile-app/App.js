import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/register";
import Signin from "./screens/signin";
import Home from "./screens/home";
import Restaurants from "./screens/restaurants";
import Restaurant from "./screens/singleRestaurant";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Setup" }}
        />
        <Stack.Screen name="Signin" component={Signin} /> */}
        {/* <Stack.Screen name="Home" component={Home} /> */}
        {/* <Stack.Screen name="Restaurants" component={Restaurants} /> */}
        <Stack.Screen name="Restaurant" component={Restaurant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
