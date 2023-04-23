import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { GoodJob, Growth } from "./Stats";

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

  const returnHomeLastTrip = () => {
    navigation.navigate("TOBYGACHI", {
      lastTrip: route.params.recapStats,
      date: Date.now(),
    });
  };

  return (
    <View>
      <Text style={styles.text}>{goodAccelerations} good starts</Text>
      <Text style={styles.text}>{goodStops} good stops</Text>
      <Text style={styles.text}>{suddenAccelerations} sudden starts</Text>
      <Text style={styles.text}>{suddenStops} suddent stops</Text>
      <Text style={styles.text}>
        Distance Traveled: {route.params.distanceTraveled}
      </Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <GoodJob lastTrip={route.params.lastTrip} />
        <Growth lastTrip={route.params.lastTrip} />
      </View>
      <Button
        title="Return Home"
        style={styles.text}
        onPress={returnHomeLastTrip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Baloo2",
  },
});

export default Recap;
