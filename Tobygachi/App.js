import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./mainScreen";
import Recap from "./recap";
import Home from "./Home";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main Screen" component={MainScreen} />
        <Stack.Screen name="Recap" component={Recap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
