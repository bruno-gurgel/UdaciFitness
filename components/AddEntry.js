import React, { useState } from "react";
import {
  ProgressViewIOSComponent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import DateHeader from "./DateHeader";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}

export default function AddEntry(props) {
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

    updateAllMetrics({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });

    // Navigate to home

    // Save to 'DB'

    // Clear local notifications
  };

  const metaInfo = getMetricMetaInfo();

  const reset = () => {
    const key = timeToString();

    // Navigate to home

    // Save to 'DB'

    // Clear local notifications
  };
  if (props.alreadyLogged) {
    return (
      <View>
        <Ionicons name="ios-happy-outline" size={100} />
        <Text>You already logged your information for today</Text>
        <TextButton onPress={reset}>Reset</TextButton>
      </View>
    );
  }

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
