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
      "Increase your fuel efficiency by maintaining your car! Check your tires and use the correct oil and fuel to maximize your fuel economy.",
      "Use the cruise control feature in your vehicle to minimize speed fluctuations!",
      "Avoid idling your vehicle! A car engine consumes one quarter to one half gallon of fuel per hour when idling.",
      "The fuel economy of a car affects the amount of greenhouse gasses the car emits.",
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
      <Text style={styles.recap}>Journey's Recap</Text>
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
        <GoodJob lastTrip={route.params.lastTrip} style={styles.box} />
        <Growth lastTrip={route.params.lastTrip} style={styles.box} />
      </View>
      <View
        style={{
          width: "75%",
          alignSelf: "center",
          paddingTop: "5%",
          height: "35%",
        }}
      >
        <QuickTip></QuickTip>
      </View>

      <TouchableOpacity style={styles.button1} onPress={returnHomeLastTrip}>
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
    fontSize: 32,
  },
  text2: {
    fontFamily: "Baloo2",
    alignSelf: "center",
    color: "#412716",
    fontSize: 30,
    fontWeight: "500",
  },
  button1: {
    height: 50,
    width: "50%",
    borderRadius: 8,
    fontFamily: "Baloo2",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#ACC172",
    marginBottom: 20,
    marginTop: "10%",
  },
  box: {
    alignSelf: "center",
    paddingTop: 40,
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
    fontSize: 32,
    color: "#412716",
    textAlign: "center",
    padding: 8,
  },
  qtip: {
    alignItems: "center",
    backgroundColor: "#BA9D63",
    borderRadius: 15,
    flex: 1,
    height: "100%",
    margin: 16,
    padding: 16,
  },
  tip: {
    fontFamily: "Baloo2",
    alignSelf: "center",
    color: "#412716",
    fontSize: 20,
  },
});

export default Recap;
