import React, { useState, useEffect, useCallback } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import {
  useFonts,
  Baloo2_400Regular,
  Baloo2_500Medium,
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from "@expo-google-fonts/baloo-2";

const nearestHundredth = (num) => {
  return Math.round(num * 100) / 100;
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Baloo2_400Regular,
    Baloo2_500Medium,
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  });

  const [mData, setMData] = useState({});
  const [motionSub, setMotionSub] = useState(null);
  const [speed, setSpeed] = useState({});
  const [speedData, setSpeedData] = useState([]);
  let speedDifference = { x: 0, y: 0 };

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };
  const _fast = () => {
    DeviceMotion.setUpdateInterval(200);
  };

  const _subscribe = () => {
    setMotionSub(DeviceMotion.addListener(setMData));
  };

  const _unsubscribe = () => {
    motionSub && motionSub.remove();
    setMotionSub(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    if (mData.acceleration) {
      let newData = speedData;
      newData.push(mData.acceleration);
      speedDifference.x += mData.acceleration.x;
      speedDifference.y += mData.acceleration.y;
      if (newData.length > 5) {
        speedDifference.x -= newData[0].x;
        speedDifference.y -= newData[0].y;
        newData.shift();
      }
      setSpeed(speedDifference);
      setSpeedData(newData);
    }
  }, [mData]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        X (Front/Rear):{" "}
        {nearestHundredth(mData.acceleration ? mData.acceleration.x : 0)}
      </Text>
      <Text style={styles.text}>
        Y (Left/Right):{" "}
        {nearestHundredth(mData.acceleration ? mData.acceleration.y : 0)}
      </Text>
      <Text style={styles.text}>
        Z (Up/Down):{" "}
        {nearestHundredth(mData.acceleration ? mData.acceleration.z : 0)}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title={motionSub ? "On" : "Off"}
          style={styles.button}
          onPress={motionSub ? _unsubscribe : _subscribe}
        />
        <Button
          title="Slow"
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        />
        <Button title="Fast" onPress={_fast} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Baloo2_400Regular",
    backgroundColor: "#E7E2CC",
    alignItems: "center",
    justifyContent: "center",
  },
  green: {
    backgroundColor: "green",
  },
  red: {
    backgroundColor: "red",
  },
});
