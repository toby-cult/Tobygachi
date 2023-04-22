import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer, DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const nearestHundredth = (num) => {
  return Math.round(num * 100) / 100;
};

export default function App() {
  const [data, setData] = useState({});
  const [mData, setMData] = useState({});
  const [accelerationSubscription, setAccelerationSubscription] =
    useState(null);
  const [motionSub, setMotionSub] = useState(null);
  const [speed, setSpeed] = useState({});
  const [speedData, setSpeedData] = useState([]);
  let speedDifference = { x: 0, y: 0 };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
    DeviceMotion.setUpdateInterval(1000);
  };
  const _fast = () => {
    Accelerometer.setUpdateInterval(200);
    DeviceMotion.setUpdateInterval(200);
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

  useEffect(() => {
    if (mData.acceleration) {
      let newData = speedData;
      newData.push(mData.acceleration);
      //console.log(mData.acceleration);
      speedDifference.x += mData.acceleration.x;
      speedDifference.y += mData.acceleration.y;
      if (newData.length > 5) {
        speedDifference.x -= newData[0].x;
        speedDifference.y -= newData[0].y;
        newData.shift();
      }
      //console.log(speedDifference);
      setSpeed(speedDifference);
      setSpeedData(newData);
    }
  }, [mData]);
  /*const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync("LOCATION_TRACKING", {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      "LOCATION_TRACKING"
    );
    setLocationStarted(hasStarted);
    console.log("tracking started?", hasStarted);
  };

  TaskManager.defineTask("LOCATION_TRACKING", async ({ data, error }) => {
    if (error) {
      console.log("LOCATION_TRACKING task ERROR:", error);
      return;
    }
    if (data) {
      Location.g;
      const { locations } = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      l1 = lat;
      l2 = long;
      origin = lat + "," + long;
      console.log(origin);
    }
  });*/

  return (
    <View
      style={[
        styles.container,
        nearestHundredth(Math.pow(speed.x * speed.x + speed.y * speed.y, 0.5)) *
          2.237 <
        6.5
          ? styles.green
          : styles.red,
      ]}
    >
      <Text style={{ fontSize: 32 }}>Baloo2</Text>
      <Text style={styles.text}>
        Test Accelerometer: (in gs where 1g = 9.81 m/s^2)
      </Text>
      <Text style={styles.text}>x: {data.x * 9.81}</Text>
      <Text style={styles.text}>y: {data.y * 9.81}</Text>
      <Text style={styles.text}>z: {data.z * 9.81}</Text>
      <Text style={styles.text}>
        mx: {mData.acceleration ? mData.acceleration.x : 0}
      </Text>
      <Text style={styles.text}>
        my: {mData.acceleration ? mData.acceleration.y : 0}
      </Text>
      <Text style={styles.text}>
        mz: {mData.acceleration ? mData.acceleration.z : 0}
      </Text>
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
        <Text>
          Net Acceleration in the Past Second:{" "}
          {nearestHundredth(
            Math.pow(speed.x * speed.x + speed.y * speed.y, 0.5)
          ) * 2.237}
        </Text>
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
  green: {
    backgroundColor: "green",
  },
  red: {
    backgroundColor: "red",
  },
});
