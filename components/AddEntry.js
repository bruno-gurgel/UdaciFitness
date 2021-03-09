import React, { useState } from "react";
import { Text, View } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";
import DateHeader from "./DateHeader";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";

export default function AddEntry() {
  const [run, updateRun] = useState(0);
  const [bike, updateBike] = useState(0);
  const [swim, updateSwim] = useState(0);
  const [sleep, updateSleep] = useState(0);
  const [eat, updateEat] = useState(0);

  const increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    const count = metric + step;

    switch (metric) {
      case "run":
        return updateRun(count > max ? max : count);
      case "bike":
        return updateBike(count > max ? max : count);
      case "swim":
        return updateSwim(count > max ? max : count);
    }
  };

  const decrement = (metric) => {
    const count = metric - getMetricMetaInfo(metric).step;

    switch (metric) {
      case "run":
        return updateRun(count < 0 ? 0 : count);
      case "bike":
        return updateBike(count < 0 ? 0 : count);
      case "swim":
        return updateSwim(count < 0 ? 0 : count);
    }
  };

  const slide = (metric, value) => {
    switch (metric) {
      case "sleep":
        return updateSleep(value);
      case "eat":
        return updateEat(value);
    }
  };

  const metaInfo = getMetricMetaInfo();

  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map((key) => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = key;

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
    </View>
  );
}
