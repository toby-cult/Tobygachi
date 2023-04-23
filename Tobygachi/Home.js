import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = ({ navigation, route }) => {
  const startRoute = () => {
    navigation.navigate("Main Screen", {});
  };

  const viewStats = () => {
    navigation.navigate(
      "Stats",
      route.params && route.params.lastTrip
        ? { lastTrip: route.params.lastTrip, date: route.params.date }
        : {}
    );
  };

  console.log(route);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/home1.png")}
        style={styles.background}
      >
        <ImageBackground
          source={require("./assets/tobycar.png")}
          style={styles.tobycar}
        >
          <View style={styles.flexContainer}>
            <Image
              source={require("./assets/cloud.gif")}
              style={styles.cloud}
            ></Image>
            <TouchableOpacity style={styles.button1} onPress={startRoute}>
              <Ionicons name="car" size={32} style={{ padding: 8 }} />
              <Text style={styles.text}>Travel with Toby</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
              <Ionicons name="stats-chart" size={32} style={{ padding: 8 }} />
              <Text style={styles.text} onPress={viewStats}>
                Stats
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Baloo2",
    alignSelf: "center",
    color:"#412716",
    fontSize: 32,
    fontWeight:"400"
  },
  container: {
    flex: 1,
    overflow: "hidden",
    verticalAlign: "middle",
  },
  flexContainer: {
    height: "75%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignContent: "center",
  },
  tobycar: {
    flex: 1,
    position: "relative",
    top: 100,
  },
  cloud: {
    flex: 1,
    position: "absolute",
    top: -100,
    left: 60,
    height: 81,
    width: 144,
    resizeMode: "cover",
  },
  button1: {
    borderRadius: 8,
    padding: 4,
    paddingRight: 12,
    fontFamily: "Baloo2",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#ACC172",
    marginBottom: 20,
    flexDirection: "row",
  },

  button2: {
    borderRadius: 8,
    padding: 4,
    paddingRight: 12,
    fontFamily: "Baloo2",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#ACC172",
    flexDirection: "row",
  },
});

export default Home;
