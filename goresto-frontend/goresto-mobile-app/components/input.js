import * as React from "react";
import { Button, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Input({ props }) {
  const [text, setText] = useState("");

  const handleChangeText = (value) => {
    setText(value);
  };

  return (
    <View style={Styles.inputContainer}>
      <Text style={styles.label}>{props.title}</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChangeText}
        placeholder="Type here"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {},
  label: {},
  input: {
    width: "80%",
    height: "50px",
  },
});

export default Input;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
