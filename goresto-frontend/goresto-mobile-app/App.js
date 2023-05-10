import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "./screens/register";
import Signin from "./screens/signin";
import Home from "./screens/home";
import Restaurants from "./screens/restaurants";
import Restaurant from "./screens/singleRestaurant";
import Reservations from "./screens/reservations";
import Reserving from "./screens/reserving";
import Menu from "./screens/menu";
import Rating from "./screens/ratingForm";
import Ratings from "./screens/ratingsReviews";
import Chats from "./screens/chats";
import Conversation from "./screens/conversation";

const Stack = createStackNavigator();

function App() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    getData("token").then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#d43325" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? "Home" : "Signin"}>
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
        <Stack.Screen name="Ratings" component={Ratings} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="Conversation" component={Conversation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
