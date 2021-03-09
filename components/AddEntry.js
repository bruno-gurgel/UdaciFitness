import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import DateHeader from "./DateHeader";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}

export default function AddEntry() {
  const [allMetrics, updateAllMetrics] = useState({
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  });

  const increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    updateAllMetrics((prevState) => {
      const count = allMetrics[metric] + step;

      return {
        ...prevState,
        [metric]: count > max ? max : count,
      };
    });
  };

  const decrement = (metric) => {
    updateAllMetrics((prevState) => {
      const count = allMetrics[metric] - getMetricMetaInfo(metric).step;

      return {
        ...prevState,
        [metric]: count < 0 ? 0 : count,
      };
    });
  };

  const slide = (metric, value) => {
    updateAllMetrics((prevState) => {
      return {
        ...prevState,
        [metric]: value,
      };
    });
  };

  const submit = () => {
    const key = timeToString();

    // Update Redux

    updateAllMetrics((prevState) => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    // Navigate to home

    // Save to 'DB'

    // Clear local notifications
  };

  const metaInfo = getMetricMetaInfo();

  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map((key) => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = allMetrics[key];

        return (
          <Text key={key}>
            {getIcon()}{" "}
            {type === "slider" ? (
              <UdaciSlider
                value={value}
                onChange={(value) => slide(key, value)}
                {...rest}
              />
            ) : (
              <UdaciSteppers
                value={value}
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
                {...rest}
              />
            )}
          </Text>
        );
      })}
      <SubmitBtn onPress={submit} />
    </View>
  );
}
