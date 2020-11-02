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

const Play = ({ history }) => {
  const { chosen, setChosen, data, setData } = useContext(AppContext);

  const selectSongHandler = () => {
    console.log("fuck yes");
  };
  //TODO if nothing chosen yet display some screen
  return (
    <View style={styles.container}>
      <Header history={history} />
      <Text> Play</Text>
      <Button
        title="Go to Learn"
        onPress={() => history.push("/learn")}
      ></Button>
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
