import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";

const Input = ({ title, placeHolder, onChangeText, value }) => {
  // const [text, setText] = useState("");

  // const handleChangeText = (value) => {
  //   setText(value);
  //   onCustomChange(value);
  // };

  return (
    <View style={[styles.inputContainer]}>
      <Text style={[styles.label]}>{title}</Text>
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeHolder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 20, width: 260 },
  label: { fontSize: 20, marginBottom: 5 },
  input: {
    width: "100%",
    height: 40,
    paddingLeft: 15,
    borderColor: "#D43325",
    borderLeftColor: "#D43325",
    borderLeftWidth: 10,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 15,
  },
});

export default Input;
