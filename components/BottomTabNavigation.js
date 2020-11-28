import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function BottomTabNavigation({ history }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tabContainer} onPress={() => history.push("/")}>
        <Text style={styles.tabTitle}>Play</Text>
      </Pressable>
      <View style={styles.centerContainer}>
        <Icon name="circle" size={30}></Icon>
      </View>
      <Pressable
        style={styles.tabContainer}
        onPress={() => history.push("/learn")}
      >
        <Text style={styles.tabTitle}>Learn</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 5,
    height: "10%",
    alignItems: "center",
  },
  tabContainer: {
    backgroundColor: "#fff",
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabTitle: {
    fontSize: 20,
    fontFamily: "Modak-Regular",
    letterSpacing: 2,
    color: "black",
  },
  centerContainer: {
    zIndex: 1,
  },
});

export default BottomTabNavigation;
