import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import SplashScreen from "./src/SplashScreen";
import SignInScreen from "./src/SignInScreen";

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
          name="Splash"
          
          component={SplashScreen}
          options={{headerShown: false}}
          
        />
         <Stack.Screen
          name="Sign in"
          
          component={SignInScreen}
          options={{headerShown: false}}
          
        />
        {/* <Stack.Screen
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
        <Stack.Screen name="Blog Comments" component={DetailsScreen} /> */}
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
