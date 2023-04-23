import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GoodJob, Growth } from "./Stats";
import Ionicons from "@expo/vector-icons/Ionicons";

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

  const QuickTip = () => {
    const tips = [
      "Cars are bad for the environment. Simply do not drive.",
      "Increase your fuel efficiency by maintaining your car! Check your tires and use the correct oil and fuel to maximize your fuel economy. (AAA)",
      "Use the cruise control feature in your vehicle to minimize speed fluctuations! (AAA)",
      "Avoid idling your vehicle! A car engine consumes one quarter to one half gallon of fuel per hour when idling. (AAA)",
      "The fuel economy of a car affects the amount of greenhouse gasses the car emits. (Environmental Protection Agency)",
      'Drive conservatively. Avoid "jack rabbit" starts, rapid acceleration and hard braking, which can lower fuel economy by 15 to 30 percent at highway speeds and 10 to 40 percent in stop-and-go traffic. (AAA)',
    ];

    const val = Math.floor(Math.random() * 5);
    return (
      <View style={styles.qtip}>
        <View style={{ flexDirection: "row", alignItems: "space-between" }}>
          <Text style={styles.text2}>Quick Tip</Text>
          <Ionicons
            name="leaf"
            size={32}
            color="green"
            style={{ padding: 8 }}
          />
        </View>
        <Text style={styles.tip}>{tips[val]}</Text>
      </View>
    );
  };

  return (
    <View style={{ overflow: "auto" }}>
      <Text style={styles.recap}>Journey Recap</Text>
      <View
        style={{
          borderTopColor: "#412716",
          borderTopWidth: StyleSheet.hairlineWidth,
          marginHorizontal: 40,
        }}
      />
      <Text style={styles.comment}>
        {goodStops > suddenStops && goodAccelerations > suddenAccelerations
          ? "Toby is proud of you!"
          : "There is always room for improvement!"}
      </Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <GoodJob lastTrip={route.params.recapStats} style={styles.box} />
        <Growth lastTrip={route.params.recapStats} style={styles.box} />
      </View>
      <QuickTip></QuickTip>
      <TouchableOpacity style={styles.button1} onPress={returnHomeLastTrip}>
        <Ionicons name="home" size={32} />
        <Text style={styles.text}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Baloo2",
    alignSelf: "center",
    color: "#412716",
    fontSize: 24,
  },
  text2: {
    fontFamily: "Baloo2",
    alignSelf: "center",
    color: "#412716",
    fontSize: 24,
    fontWeight: "500",
  },
  button1: {
    backgroundColor: "#ACC172",
    borderRadius: 8,
    fontFamily: "Baloo2",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    flexDirection: "row",
    padding: 16,
    margin: 8,
  },
  box: {
    alignSelf: "center",
    verticalAlign: "center",
  },
  recap: {
    fontFamily: "Baloo2",
    fontSize: 40,
    color: "#412716",
    textAlign: "center",
  },
  comment: {
    fontFamily: "Baloo2",
    fontSize: 24,
    color: "#412716",
    textAlign: "center",
    lineHeight: 40,
  },
  qtip: {
    alignItems: "center",
    backgroundColor: "#BA9D63",
    borderRadius: 15,
    flex: 1,
    padding: 16,
    margin: 8,
  },
  tip: {
    fontFamily: "Baloo2",
    alignSelf: "center",
    color: "#412716",
    fontSize: 16,
  },
});

export default Recap;
