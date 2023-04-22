import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
const Recap = ({ navigation, route }) => {
  console.log(route);
  return <Text style={styles.text}>End Recap</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Baloo2',
  },
});


export default Recap;
