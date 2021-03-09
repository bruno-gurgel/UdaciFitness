import React from "react";
import { Text } from "react-native";

export default function DateHeader(props) {
  const { date } = props;
  return <Text>{date}</Text>;
}
