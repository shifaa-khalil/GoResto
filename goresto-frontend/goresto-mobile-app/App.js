import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/register";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Setup" }}
        />
        {/* <Stack.Screen name="Restaurant" component={Restaurant} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
