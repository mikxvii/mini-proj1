// This import is necessary for any file containing a React component
import React from "react";

// These imports are part of our navigation package, React Navigation
// https://reactnavigation.org/docs/getting-started
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Our project has two screens: HomeScreen and GameScreen
// Thus, we import both of these screens
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import { nameToPic } from "./constants/Constants";
import { Asset } from "expo-asset";

// To initialize and style our Navigation Stack, we call the default methods
// https://reactnavigation.org/docs/hello-react-navigation
const Stack = createStackNavigator();
const StackOptions = { headerTitleStyle: { fontFamily: "Avenir" } };

// Loading all images for quick use (eliminates lag problem)
// https://docs.expo.io/versions/latest/sdk/asset/
Asset.loadAsync(require("./assets/mdb_logo.png"));
for (var n in nameToPic) {
  Asset.loadAsync(nameToPic[n][1]);
}

// This is the default entry point of our application
// This function returns JSX: a tree-like structure of React components
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Our Navigation Stack has two screens: 
              1) "Match the Members" - our HomeScreen, and...
              2) "Play" - our GameScreen 
            Notice how we can define exactly which components are used for
            each screen using the "component" parameter. */}
        <Stack.Screen
          options={StackOptions}
          name="Match the Members"
          component={HomeScreen}
        />
        <Stack.Screen
          options={StackOptions}
          name="Play"
          component={GameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
