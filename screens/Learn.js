import React, { useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import BottomTabNavigation from "../components/BottomTabNavigation";

const Learn = ({ history }) => {
  const { search, setSearch, data, setData } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Header history={history} />
      <ScrollView>
        <Text> Learn</Text>
      </ScrollView>
      <BottomTabNavigation history={history} />
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
