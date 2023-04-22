import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Home = ({ navigation, route }) => {
  const startRoute = () => {
    navigation.navigate("Main Screen", {});
  };
  console.log(route);
  return (
    <View>
      <Text style={styles.text} >Home Screen</Text>
      <Button title="Travel with Toby" style={styles.text} onPress={startRoute} />
      <Button title="Stats" style={styles.text}/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Baloo2',
  },
});

export default Home;
