import React, { useState, useEffect } from "react";
import {TouchableOpacity, ImageBackground, Button, StyleSheet, Text, View , Image} from "react-native";



const Home = ({ navigation, route }) => {
  const startRoute = () => {
    navigation.navigate("Main Screen", {});
  };
  console.log(route);
  return (
    <View style={styles.container}>
      
      <ImageBackground source={require('./assets/home1.png')} style={styles.background} >
        <ImageBackground source={require('./assets/tobycar.png')} style={styles.tobycar}>

          <Image source={require('./assets/cloud.gif')} style={styles.cloud}></Image>

          <TouchableOpacity style={styles.button1} onPress={startRoute}>
              <Text style={styles.text}>Travel with Toby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
              <Text style={styles.text}>Stats</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ImageBackground>
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Baloo2',
    alignSelf:"center",
    fontSize: 32
  },
  container: {
    flex: 1,
    verticalAlign:"middle"
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center'
  },
  tobycar: {
    flex:1,
    position:"relative",
    top:100,
    
  },
  cloud: {
    flex: 1,
    position:"absolute",
    top:-100,
    left:60,
    height: 81,
    width: 144,
    resizeMode:"cover",
  },
  button1: {
    height: 50,
    width: 300,
    borderRadius: 15,
    verticalAlign:"bottom",
    fontFamily: 'Baloo2',
    alignSelf: 'center',
    textAlign:'center',
    textAlignVertical:'center',
    backgroundColor: '#ACC172',
    marginBottom: 20,
    marginTop: 500,
  },

  button2: {
    height: 50,
    width: 150,
    borderRadius: 15,
    fontFamily: 'Baloo2',
    alignSelf: 'center',
    textAlign:'center',
    textAlignVertical:'center',
    backgroundColor: '#ACC172',
  }
});

export default Home;
