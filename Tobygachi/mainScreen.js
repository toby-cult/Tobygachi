import React, { useState, useEffect, useCallback } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import { useFonts } from 'expo-font';

const nearestHundredth = (num) => {
  return Math.round(num * 100) / 100;
};

const MainScreen = ({ navigation }) => {

  

  const [mData, setMData] = useState({});
  const [motionSub, setMotionSub] = useState(null);
  const [speed, setSpeed] = useState({});
  const [speedData, setSpeedData] = useState([]);
  const [drivingPoorly, setDrivingPoorly] = useState(false);
  let speedDifference = { x: 0, y: 0 };
  const [stats, setStats] = useState({
    suddenStops: 0,
    suddenAccelerations: 0,
    suddenTurnRight: 0,
    suddenTurnLeft: 0,
  });
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

  const endRoute = () => {
    navigation.navigate("Recap", { recapStats: stats });
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    if (mData.acceleration) {
      let newData = speedData;
      let currentStats = stats;
      newData.push(mData.acceleration);
      speedDifference.x += mData.acceleration.x;
      speedDifference.y += mData.acceleration.y;
      if (newData.length > 5) {
        speedDifference.x -= newData[0].x;
        speedDifference.y -= newData[0].y;
        newData.shift();
      }
      if (speedDifference.x > 3) {
        currentStats.suddenAccelerations += 1;
        setDrivingPoorly(true);
      } else if (speedDifference.x < -3) {
        currentStats.suddenStops += 1;
        setDrivingPoorly(true);
      } else if (speedDifference.y > 3) {
        currentStats.suddenTurnRight += 1;
        setDrivingPoorly(true);
      } else if (speedDifference.y < -3) {
        currentStats.suddenTurnLeft += 1;
        setDrivingPoorly(true);
      } else {
        setDrivingPoorly(false);
      }
      setStats(currentStats);
      setSpeed(speedDifference);
      setSpeedData(newData);
    }
  }, [mData]);

  return (
    <View style={[styles.container, drivingPoorly ? styles.red : styles.green]}>
      <Text style={styles.text}>
        X (Front/ Rear):{" "}
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
      <Text style={styles.text}>suddenAccelerations: {stats.suddenAccelerations}</Text>
      <Text style={styles.text}>suddenStops: {stats.suddenStops}</Text>
      <Text style={styles.text}>suddenTurnRight: {stats.suddenTurnRight}</Text>
      <Text style={styles.text}>suddenTurnLeft: {stats.suddenTurnLeft}</Text>
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
        <Button title="End Journey" onPress={endRoute} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Baloo2',
  },
  container: {
    flex: 1,
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

export default MainScreen;
