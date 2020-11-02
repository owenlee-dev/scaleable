import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

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

export default createMaterialBottomTabNavigator({
  Play: { screen: PlayStackScreen },
  Learn: { screen: LearnStackScreen },
});
