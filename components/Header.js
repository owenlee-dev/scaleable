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
import api from "../api/api";
import { AppContext } from "../AppContext";

const Header = ({ history }) => {
  const { chosen, setChosen, data, setData } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>ScaleAble</Text>
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
    padding: 20,
    alignItems: "center",
  },
  searchBar: {
    fontSize: 20,
    maxWidth: "70%",
    backgroundColor: "transparent",
  },
});

export default Header;
