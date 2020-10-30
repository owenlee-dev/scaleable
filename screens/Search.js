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
import api from "../api/api";
import { AppContext } from "../AppContext";

const Search = ({ navigation }) => {
  const { chosen, setChosen, data, setData } = useContext(AppContext);
  const [userInput, setUserInput] = useState("");

  //function to call api and store search results in data
  const submitSearchHandler = async () => {
    const response = await api.getSearchResults(userInput);
    setData(response);
  };

  const selectSongHandler = (item) => {
    setChosen(item);
    navigation.navigate("Play");
  };
  return (
    <View style={styles.container}>
      <View title="header" style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => {
            setUserInput(text);
          }}
          onSubmitEditing={submitSearchHandler}
          value={userInput}
        />
        <Button title="submit" onPress={submitSearchHandler} />
      </View>
      <View title="content" style={styles.content}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image
                source={{ uri: item.artist.img }}
                style={styles.coverImage}
              />
              <Text
                style={styles.title}
                onPress={(e) => {
                  selectSongHandler(item);
                }}
              >
                {item.title} - {item.artist.name}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  content: {},
  searchBar: {
    fontSize: 20,
    maxWidth: "70%",
    minWidth: "70%",
    backgroundColor: "transparent",
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    minWidth: "100%",
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#fff",
  },
  listItemText: {
    fontSize: 20,
    marginTop: 60,
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  title: {
    minWidth: "100%",
    fontSize: 18,
    padding: 10,
  },
});

export default Search;
