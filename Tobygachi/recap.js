import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
const Recap = ({ navigation, route }) => {
  console.log(route);
  const {
    suddenStops,
    suddenAccelerations,
    suddenTurnRight,
    suddenTurnLeft,
    goodStops,
    goodAccelerations,
  } = route.params.recapStats;
  return (
    <View>
      <Text style={styles.text}>{goodAccelerations} good starts</Text>
      <Text style={styles.text}>{goodStops} good stops</Text>
      <Text style={styles.text}>{suddenAccelerations} sudden starts</Text>
      <Text style={styles.text}>{suddenStops} suddent stops</Text>
      <Text style={styles.text}>
        Distance Traveled: {route.params.distanceTraveled}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Baloo2",
  },
});

export default Recap;
