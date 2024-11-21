import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/Login";
import PackageScreen from "./src/screens/PackageScreen";
import SignupScreen from "./src/screens/Signup";
import Type1Screen from "./src/screens/Type1Screen";
import Type2Screen from "./src/screens/Type2Screen";
import Welcome from "./src/screens/Welcome"; // Changed to PascalCase to match React conventions.

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login Screen", headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ title: "Signup Screen", headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome} // Changed component to match the corrected import.
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home Screen", headerShown: false }}
        />
        <Stack.Screen
          name="Type1Screen"
          component={Type1Screen}
          options={{ title: "Type1 Screen", headerShown: false }}
        />
        <Stack.Screen
          name="Type2Screen"
          component={Type2Screen}
          options={{ title: "Type2 Screen", headerShown: false }}
        />
        <Stack.Screen
          name="PackageScreen"
          component={PackageScreen}
          options={{ title: "Package Screen", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
