import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const GoodJob = ({ lastTrip }) => {
  console.log(lastTrip);
  const goodAccelerations = lastTrip ? lastTrip.goodAccelerations : 0;
  const goodStops = lastTrip ? lastTrip.goodStops : 0;
  console.log(goodStops);
  return (
    <View style={styles.goodJob}>
      <Text>Good Job!</Text>
      <Image
        style={{ width: 64, height: 64, margin: 8 }}
        source={require("./assets/tobyHappy.png")}
      />
      <Text style={styles.body}>{goodAccelerations} good starts</Text>
      <Text style={styles.body}>{goodStops} good stops</Text>
    </View>
  );
};

export const Growth = ({ lastTrip }) => {
  console.log(lastTrip);
  const suddenAccelerations = lastTrip ? lastTrip.suddenAccelerations : 0;
  const suddenStops = lastTrip ? lastTrip.suddenStops : 0;
  const suddenTurn = lastTrip ? lastTrip.suddenTurn : 0;
  return (
    <View style={styles.growthAreas}>
      <Text>Growth Areas</Text>
      <Image
        style={{ width: 64, height: 64, margin: 8 }}
        source={require("./assets/tobySad.png")}
      />
      <Text style={styles.body}>{suddenAccelerations} sudden starts</Text>
      <Text style={styles.body}>{suddenStops} sudden stops</Text>
      <Text style={styles.body}>{suddenTurn} sudden turns</Text>
    </View>
  );
};

const Stats = ({ navigation, route }) => {
  const returnHomeLastTrip = () => {
    route.params;
    navigation.navigate(
      "TOBYGACHI",
      route.params
        ? {
            lastTrip: route.params.lastTrip,
            date: route.params.date,
          }
        : {}
    );
  };

  console.log(route);
  const numDate = new Date(route.params.date);
  const stringdate = numDate.toDateString();
  console.log(numDate);

  return (
    <View style={styles.container}>
      <Text style={styles.lastTrip}>Last Trip's Stats</Text>
      {stringdate !== "Invalid Date" ? (
        <View>
          <Text style={styles.subtitle}>{stringdate}</Text>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <GoodJob lastTrip={route.params.lastTrip} />
            <Growth lastTrip={route.params.lastTrip} />
          </View>
        </View>
      ) : (
        <Text style={styles.subtitle}>You haven't driven with Toby yet!</Text>
      )}
      <View style={styles.spacer} />
      <TouchableOpacity
        onPress={returnHomeLastTrip}
        style={styles.returnHomeButton}
      >
        <Ionicons name="home" size={32} />
        <Text style={styles.returnHomeText}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "Baloo2",
    fontSize: 16,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#E6D9A2",
    flex: 1,
    flexDirection: "column",
    padding: 20,
    textAlign: "center",
  },
  goodJob: {
    alignItems: "center",
    backgroundColor: "#ACC172",
    borderRadius: 15,
    flex: 1,
    margin: 8,
    padding: 16,
  },
  growthAreas: {
    alignItems: "center",
    backgroundColor: "#E69EB4",
    borderRadius: 15,
    flex: 1,
    margin: 8,
    padding: 16,
  },
  lastTrip: {
    fontFamily: "Baloo2",
    fontSize: 40,
    textAlign: "center",
  },
  returnHomeButton: {
    alignItems: "center",
    backgroundColor: "#ACC172",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    margin: 32,
    padding: 8,
    width: "66.66%",
  },
  returnHomeText: {
    color: "#412716",
    fontSize: 24,
    fontFamily: "Baloo2",
    margin: 16,
  },
  spacer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "Baloo2",
  },
});

export default Stats;
