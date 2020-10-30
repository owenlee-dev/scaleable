import React, { useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const Play = ({ navigation }) => {
  const { chosen, setChosen, data, setData } = useContext(AppContext);

  const selectSongHandler = () => {
    console.log("fuck yes");
  };
  //TODO if nothing chosen yet display some screen
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text> Play</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Play;
