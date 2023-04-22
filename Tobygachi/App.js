import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./mainScreen";
import Recap from "./recap";
import Home from "./Home";
import { useFonts } from 'expo-font';


const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Baloo2': require('./assets/fonts/Baloo2-VariableFont_wght.ttf'),
  });

  console.log(fontsLoaded)
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} style={styles.text}/>
        <Stack.Screen name="Main Screen" component={MainScreen} style={styles.text}/>
        <Stack.Screen name="Recap" component={Recap} style={styles.text}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Baloo2',
  },
});

export default App;
