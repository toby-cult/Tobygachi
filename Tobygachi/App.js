import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer, DeviceMotion } from "expo-sensors";

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [{ mX, mY, mZ }, setMData] = useState({
    mX: 0,
    mY: 0,
    mZ: 0,
  });
  const [accelerationSubscription, setAccelerationSubscription] =
    useState(null);
  const [motionSub, setMotionSub] = useState(null);
  const [speed, setSpeed] = useState(0);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
    DeviceMotion.setUpdateInterval(1000);
  };
  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
    DeviceMotion.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setAccelerationSubscription(Accelerometer.addListener(setData));
    setMotionSub(DeviceMotion.addListener(setMData));
  };

  const _unsubscribe = () => {
    accelerationSubscription && accelerationSubscription.remove();
    setAccelerationSubscription(null);
    motionSub && motionSub.remove();
    setMotionSub(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Accelerometer: (in gs where 1g = 9.81 m/s^2)
      </Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <Text style={styles.text}>mx: {mX}</Text>
      <Text style={styles.text}>my: {mY}</Text>
      <Text style={styles.text}>mz: {mZ}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={accelerationSubscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{accelerationSubscription ? "On" : "Off"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
        <Text>Speed: {Math.pow(x * x + y * y + z * z, 0.5)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
