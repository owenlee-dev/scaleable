import React, { useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import api from "../tools/api";
import { AppContext } from "../AppContext";
import Icon from "react-native-vector-icons/FontAwesome";

const Search = ({ history }) => {
  const { chosen, setChosen, data, setData } = useContext(AppContext);
  const [userInput, setUserInput] = useState("yes");

  //function to call api and store search results in data
  const submitSearchHandler = async () => {
    const response = await api.getSearchResults(userInput);
    setData(response);
  };

  const selectSongHandler = async (item) => {
    const song = await api.getSongDetails(item.id);
    setChosen(song.data.song);
    history.push("/");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => history.push("/")}>
          <Icon name="arrow-left" />
        </Pressable>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            onChangeText={(text) => {
              setUserInput(text);
            }}
            onSubmitEditing={submitSearchHandler}
            value={userInput}
          />
        </View>
        <Pressable style={styles.submitButton} onPress={submitSearchHandler}>
          <Text>Submit</Text>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
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
    flex: 1,
    backgroundColor: "lightgray",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
  },
  searchBarContainer: {
    flex: 0.6,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: "100%",
    fontSize: 20,
  },
  backButton: { flex: 0.2, alignItems: "center" },
  submitButton: { flex: 0.2, alignItems: "center" },
  contentContainer: {
    flex: 1,
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
