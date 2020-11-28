import React, { useState, useContext } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../AppContext";

const Header = ({ history }) => {
  const { chosen, setChosen } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <Text style={styles.titleText}>ScaleAble</Text>
      <Icon
        name="ios-search"
        style={{ fontSize: 24 }}
        onPress={() => history.push("/search")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  title: {
    borderRadius: 10,
    backgroundColor: "#a7a3ff",
  },
  titleText: {
    fontFamily: "VeganStylePersonalUse-5Y58",
    fontSize: 24,
    letterSpacing: 2,
    color: "black",
  },
  searchBar: {
    fontSize: 20,
    maxWidth: "70%",
    backgroundColor: "transparent",
  },
});

export default Header;
