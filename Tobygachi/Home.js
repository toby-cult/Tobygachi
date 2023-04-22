import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Home = ({ navigation, route }) => {
  const startRoute = () => {
    navigation.navigate("Main Screen", {});
  };
  console.log(route);
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Travel with Toby" onPress={startRoute} />
      <Button title="Stats" />
    </View>
  );
};

export default Home;
