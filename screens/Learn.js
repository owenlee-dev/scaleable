import React, { useState, useContext } from "react";
import { Button, StyleSheet, Text, View, FlatList, Image } from "react-native";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const Learn = ({ history }) => {
  const { search, setSearch, data, setData } = useContext(AppContext);

  const selectSongHandler = () => {
    console.log("fuck yes");
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text> Learn</Text>
      <Button title="Go to Play" onPress={() => history.push("/")}></Button>
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
