import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AppContext } from "../AppContext";
import {
  accentColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  textColor,
  mainBorderRadius,
} from "../assets/Styles";

function BottomTabNavigation({ history }) {
  const guitarPick = {
    uri:
      "https://vectr.com/owenlee-dev/a1fWIvDxka.png?width=30&height=30&select=a1fWIvDxkapage0",
  };
  const { tab, setTab } = useContext(AppContext);

  let learnButton = "tabButton";
  let playButton = "pressedTabButton";
  if (tab === "learn") {
    learnButton = "tabButtonPressed";
    playButton = "tabButton";
  } else {
    learnButton = "tabButton";
    playButton = "tabButtonPressed";
  }

  const spinValue = new Animated.Value(0);

  // First set up animation
  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
  }, []);

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spinToLearn = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const spinToPlay = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles[playButton]}
        disabled={tab === "play"}
        onPress={() => {
          setTab("play");
        }}
      >
        <Text style={styles.tabTitle}>Play</Text>
      </Pressable>
      <View style={styles.centerContainer}>
        <Animated.Image
          source={guitarPick}
          style={[
            styles.pick,
            {
              transform: [
                tab === "learn"
                  ? { rotate: spinToLearn }
                  : { rotate: spinToPlay },
              ],
            },
          ]}
        />
      </View>
      <Pressable
        style={styles[learnButton]}
        disabled={tab === "learn"}
        onPress={() => {
          setTab("learn");
        }}
      >
        <Text style={styles.tabTitle}>Learn</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: backgroundColor,
    justifyContent: "space-evenly",
    width: "100%",
    padding: 5,
    height: "10%",
    alignItems: "center",
  },
  tabButton: {
    borderRadius: mainBorderRadius,
    borderWidth: 2,
    borderColor: accentColor,
    backgroundColor: backgroundColor,
    width: "45%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonPressed: {
    borderWidth: 2,
    borderColor: accentColor,
    borderRadius: mainBorderRadius,
    backgroundColor: primaryColor,
    width: "45%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabTitle: {
    fontSize: 20,
    fontFamily: "JosefinSans-Bold",
    letterSpacing: 2,
    color: textColor,
  },
  centerContainer: {
    zIndex: 1,
  },
  pick: {
    height: 30,
    width: 30,
  },
});

export default BottomTabNavigation;
