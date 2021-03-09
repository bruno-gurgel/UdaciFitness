import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

export default function UdaciSteppers(props) {
  const { max, unit, step, value, onIncrement, onDecrement } = props;
  return (
    <View>
      <TouchableOpacity onPress={onDecrement}>
        <FontAwesome name="minus" size={30} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onIncrement}>
        <FontAwesome name="plus" size={30} color={"black"} />
      </TouchableOpacity>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}
