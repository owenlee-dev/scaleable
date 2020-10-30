import React, { useState, useContext } from "react";
import { Button, StyleSheet, Text, View, FlatList, Image } from "react-native";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const Learn = () => {
  const { search, setSearch, data, setData } = useContext(AppContext);

  const selectSongHandler = () => {
    console.log("fuck yes");
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text> Learn</Text>
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

export default Learn;
