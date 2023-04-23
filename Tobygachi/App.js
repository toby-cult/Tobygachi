import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./mainScreen";
import Recap from "./recap";
import Home from "./Home";
import Stats from "./Stats";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

function HeaderLogo() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "stretch",
      }}
    >
      <Image
        style={{ width: 48, height: 48 }}
        source={require("./assets/icon.png")}
      />
      <Text style={styles.text}>TOBYGACHI</Text>
    </View>
  );
}

const App = () => {
  const [fontsLoaded, error] = useFonts({
    Baloo2: require("./assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      // keep splash screen visible
      await SplashScreen.preventAutoHideAsync();
      console.log("start splash");
      // pre-load your stuff
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("end splash");

      // hide splash screen
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  console.log("Fonts Loaded: " + fontsLoaded);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TOBYGACHI"
          component={Home}
          options={styles.header}
        />
        <Stack.Screen
          name="Main Screen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Recap" component={Recap} options={styles.header} />
        <Stack.Screen name="Stats" component={Stats} options={styles.header} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Baloo2",
    color: "#412716",
    padding: 5,
    fontSize: 32,
    fontWeight: "bold",
  },
  header: {
    headerStyle: {
      backgroundColor: "#E7E2CC",
    },
    headerTintColor: "#412716",
    headerTitle: () => <HeaderLogo />,
  },
});

export default App;
