import "react-native-gesture-handler";
import React, { useState, useMemo } from "react";
import Play from "./screens/Play";
import Search from "./screens/Search";
import Learn from "./screens/Learn";
import { StyleSheet } from "react-native";
import { AppContext } from "./AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const [chosen, setChosen] = useState(null);
  const [data, setData] = useState("");

  const PlayStack = createStackNavigator();
  const PlayStackScreen = () => {
    return (
      <PlayStack.Navigator screenOptions={{ headerShown: false }}>
        <PlayStack.Screen name="Play" component={Play} />
        <PlayStack.Screen name="Search" component={Search} />
      </PlayStack.Navigator>
    );
  };
  const LearnStack = createStackNavigator();
  const LearnStackScreen = () => {
    return (
      <LearnStack.Navigator screenOptions={{ headerShown: false }}>
        <LearnStack.Screen name="Learn" component={Learn} />
        <LearnStack.Screen name="Search" component={Search} />
      </LearnStack.Navigator>
    );
  };
  const Tab = createBottomTabNavigator();
  return (
    <AppContext.Provider value={{ chosen, setChosen, data, setData }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Play" component={PlayStackScreen} />
          <Tab.Screen name="Learn" component={LearnStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  bottomTab: {
    fontSize: 24,
  },
});
