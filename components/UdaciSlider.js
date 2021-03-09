import Slider from "@react-native-community/slider";
import React from "react";
import { Text, View } from "react-native";

export default function UdaciSlider(props) {
  const { max, unit, step, value, onChange } = props;
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}
