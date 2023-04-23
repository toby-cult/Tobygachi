import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const GoodJob = ({ lastTrip }) => {
  console.log(lastTrip);
  const goodAccelerations = lastTrip ? lastTrip.goodAccelerations : 0;
  const goodStops = lastTrip ? lastTrip.goodStops : 0;
  console.log(goodStops);
  return (
    <View style={styles.goodJob}>
      <Text>Good Job!</Text>
      <Image
        style={{ width: 64, height: 64, margin: 16 }}
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
  return (
    <View style={styles.growthAreas}>
      <Text>Growth Areas</Text>
      <Image
        style={{ width: 64, height: 64, margin: 16 }}
        source={require("./assets/tobySad.png")}
      />
      <Text style={styles.body}>{suddenAccelerations} sudden acceleration</Text>
      <Text style={styles.body}>{suddenStops} sudden stops</Text>
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
  return (
    <View style={styles.container}>
      <Text style={styles.lastTrip}>Last Trip's Stats</Text>
      <Text style={styles.subtitle}>{route.params.date}</Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <GoodJob lastTrip={route.params.lastTrip} />
        <Growth lastTrip={route.params.lastTrip} />
      </View>
      <View style={styles.spacer} />
      <TouchableOpacity
        onPress={returnHomeLastTrip}
        style={styles.returnHomeButton}
      >
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
    height: "100%",
    margin: 16,
    padding: 16,
  },
  growthAreas: {
    alignItems: "center",
    backgroundColor: "#E69EB4",
    borderRadius: 15,
    flex: 1,
    height: "100%",
    margin: 16,
    padding: 16,
  },
  lastTrip: {
    fontFamily: "Baloo2",
    fontSize: 40,
    marginBottom: 32,
    textAlign: "center",
  },
  returnHomeButton: {
    alignItems: "center",
    backgroundColor: "#ACC172",
    borderRadius: 8,
    justifyContent: "center",
    margin: 32,
    padding: 16,
    width: "66.66%",
  },
  returnHomeText: {
    color: "#412716",
    fontSize: 24,
    fontFamily: "Baloo2",
  },
  spacer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 24,
  },
});

export default Stats;
