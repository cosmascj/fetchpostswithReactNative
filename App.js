import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import ImageScreen from "./src/screens/ImageScreen";
import { Button } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App_to_Home"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#21a3ce" },
        }}
      >
        <Stack.Screen
          name="App_to_Home"
          component={HomeScreen}
          options={{
            title: "Simple Blog App",

            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
              //color: "black",
            },
          }}
        />
        <Stack.Screen name="Blog Comments" component={DetailsScreen} />

        <Stack.Screen name="BigImageView" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {},
});
