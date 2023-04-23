import React, { useState, useEffect, useCallback } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { DeviceMotion } from "expo-sensors";

const nearestHundredth = (num) => {
  return Math.round(num * 100) / 100;
};

const MainScreen = ({ navigation, route }) => {
  const [mData, setMData] = useState({});
  const [motionSub, setMotionSub] = useState(null);
  const [speedDifference, setSpeedDifference] = useState({ x: 0, z: 0 });
  const [timeInterval, setTimeInterval] = useState(0);
  const [velocity, setVelocity] = useState({ x: 0, z: 0 });
  const [distanceTraveled, setDistanceTraveled] = useState(0);
  const [speedData, setSpeedData] = useState([]);
  const [drivingPoorly, setDrivingPoorly] = useState(false);
  const [recentData, setRecentData] = useState(false);
  const [stats, setStats] = useState({
    suddenStops: 0,
    suddenAccelerations: 0,
    suddenTurnRight: 0,
    suddenTurnLeft: 0,
    goodStops: 0,
    goodAccelerations: 0,
  });

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
    setTimeInterval(1000);
  };
  const _fast = () => {
    DeviceMotion.setUpdateInterval(200);
    setTimeInterval(200);
  };

  const _subscribe = () => {
    setMotionSub(DeviceMotion.addListener(setMData));
    setTimeInterval(1000);
  };

  const _unsubscribe = () => {
    motionSub && motionSub.remove();
    setMotionSub(null);
    setTimeInterval(null);
  };

  const endRoute = () => {
    navigation.navigate("Recap", {
      recapStats: stats,
      distanceTraveled: distanceTraveled,
    });
  };

  const isGoodAcceleration = (speedData, speedDifference) => {
    if (speedDifference.z < 3 && speedDifference.z > 1.5) {
      return true;
    } else {
      return false;
    }
  };

  const isGoodDeceleration = (speedData, speedDifference) => {
    if (speedDifference.z > -3 && speedDifference.z <= -1.5) {
      return true;
    } else {
      return false;
    }
  };

  const newDistance = (interval, velocity) => {
    return Math.sqrt(
      Math.pow((interval / 1000) * velocity.x, 2) +
        Math.pow((interval / 1000) * velocity.z, 2)
    );
  };

  useEffect(() => {
    if (mData.acceleration) {
      let newData = speedData;
      let currentStats = stats;
      newData.push(mData.acceleration);
      if (newData.length > 5) {
        setSpeedDifference({
          x: speedDifference.x - newData[0].x + mData.acceleration.x,
          z: speedDifference.z - newData[0].z + mData.acceleration.z,
        });
        newData.shift();
      } else {
        setSpeedDifference({
          x: speedDifference.x + mData.acceleration.x,
          z: speedDifference.z + mData.acceleration.z,
        });
      }
      setVelocity({
        x: velocity.x + (timeInterval * mData.acceleration.x) / 1000,
        z: velocity.z + (timeInterval * mData.acceleration.z) / 1000,
      });
      setDistanceTraveled(
        distanceTraveled + newDistance(timeInterval, velocity)
      );
      if (!recentData) {
        if (speedDifference.z < -3) {
          currentStats.suddenStops += 1;
          setDrivingPoorly(true);
          setRecentData(true);
          setTimeout(() => {
            setRecentData(false);
          }, 1000);
        } else if (speedDifference.z > 3) {
          currentStats.suddenAccelerations += 1;
          setDrivingPoorly(true);
          setRecentData(true);
          setTimeout(() => {
            console.log("Delay warnings");
            setRecentData(false);
          }, 1000);
        } else if (speedDifference.x > 3) {
          currentStats.suddenTurnRight += 1;
          setDrivingPoorly(true);
          setRecentData(true);
          setTimeout(() => {
            console.log("Delay warnings");
            setRecentData(false);
          }, 1000);
        } else if (speedDifference.x < -3) {
          currentStats.suddenTurnLeft += 1;
          setDrivingPoorly(true);
          setRecentData(true);
          setTimeout(() => {
            console.log("Delay warnings");
            setRecentData(false);
          }, 1000);
        } else {
          if (isGoodAcceleration(speedData, speedDifference)) {
            currentStats.goodAccelerations += 1;
            setRecentData(true);
            setTimeout(() => {
              console.log("Delay warnings");
              setRecentData(false);
            }, 1000);
          } else if (isGoodDeceleration(speedData, speedDifference)) {
            currentStats.goodStops += 1;
            setRecentData(true);
            setTimeout(() => {
              console.log("Delay warnings");
              setRecentData(false);
            }, 1000);
          }
          setDrivingPoorly(false);
        }
      }
      setStats(currentStats);
      setSpeedData(newData);
    }
  }, [mData]);

  return (
    <View style={[styles.container, drivingPoorly ? styles.red : styles.green]}>
      <Text style={styles.text}>
        X (Left/ Right):
        {nearestHundredth(mData.acceleration ? mData.acceleration.x : 0)}
      </Text>
      <Text style={styles.text}>
        Y (Up/Down):
        {nearestHundredth(mData.acceleration ? mData.acceleration.y : 0)}
      </Text>
      <Text style={styles.text}>
        Z (Backward/Forward):{" "}
        {nearestHundredth(mData.acceleration ? mData.acceleration.z : 0)}
      </Text>
      <Text style={styles.text}>
        suddenAccelerations: {stats.suddenAccelerations}
      </Text>
      <Text style={styles.text}>suddenStops: {stats.suddenStops}</Text>
      <Text style={styles.text}>
        goodAccelerations: {stats.goodAccelerations}
      </Text>
      <Text style={styles.text}>goodStops: {stats.goodStops}</Text>
      <Text style={styles.text}>velocityX: {nearestHundredth(velocity.x)}</Text>
      <Text style={styles.text}>velocityZ: {nearestHundredth(velocity.z)}</Text>
      <Text style={styles.text}>
        distanceTraveled: {nearestHundredth(distanceTraveled)}
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
        <Button title="End Journey" onPress={endRoute} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Baloo2",
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
