import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Pressable,
  Keyboard,
  Animated,
  TouchableOpacity,
} from "react-native";
import api from "../tools/api";
import { AppContext } from "../AppContext";
import Icon from "react-native-vector-icons/FontAwesome";
import CircularPicker from "../components/CircularPicker";
import LinearGradient from "react-native-linear-gradient";
import {
  globalStyles,
  primaryColor,
  mainFont,
  secondaryColor,
  mainBorderRadius,
  accentColor,
  textColor,
  backgroundColor,
} from "../assets/Styles";

const Search = ({ history }) => {
  const {
    chosen,
    setChosen,
    data,
    setData,
    currentKey,
    setCurrentKey,
    setTab,
  } = useContext(AppContext);
  const [searchBy, setSearchBy] = useState("song");
  const [userInput, setUserInput] = useState("");
  const [pickerValue, setPickerValue] = useState(0);
  const [isMinor, setIsMinor] = useState(false);
  const [pickerColor, setPickerColor] = useState("white");
  //prettier-ignore
  const majorKeys=['A','A#','B','C','C#',"D","D#","E","F","F#","G",'G#'];
  //prettier-ignore
  const minorKeys=["F#m","Gm",'G#m','Am','A#m','Bm','Cm','C#m',"Dm","D#m","Em","Fm"];
  //prettier-ignore
  const steps=[8.3, 16.6, 24.9, 33.2, 41.5, 50, 58.3, 66.6, 74.9, 83.2, 91.5, 100];
  let keys;
  isMinor ? (keys = minorKeys) : (keys = majorKeys);
  //build an auto complete by storying top 500 songs in json and auto completing

  //function to call api and store search results in data
  const submitSearchHandler = async () => {
    const response = await api.getSearchResults(userInput);
    setData(response);
  };

  const handleKeyPress = () => {
    setChosen(currentKey);
    setTab("play");
    history.push("/");
  };

  //function to set state to chosen song
  const selectSongHandler = async (item) => {
    const song = await api.getSongDetails(item.id);
    setChosen(song.data.song);
    setCurrentKey(song.data.song.key_of);
    setTab("play");
    history.push("/");
  };

  //function to shorten title name in flatlist
  const filterTitle = (title, artist) => {
    //TODO should make all titles scrolling after a certain period of time
    if (title.length > 24) {
      title = title.slice(0, 24) + "...";
    }
    return title + " - " + artist;
  };

  //when key button is clicked
  useEffect(() => {
    changeKey(pickerValue);
    isMinor ? setPickerColor(secondaryColor) : setPickerColor(primaryColor);
  }, [isMinor]);

  //set circle picker to the correct key upon song selection
  useEffect(() => {
    if (chosen && chosen.id) {
      setCurrentKey(chosen.key_of);
      let isMinor = chosen.key_of.includes("m");
      let keys = majorKeys;
      if (isMinor) {
        setIsMinor(true);
        keys = minorKeys;
      }
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === chosen.key_of) {
          setPickerValue(steps[i - 1]);
        }
      }
    }
  }, []);

  //is there a way to algorithmically do this?
  //function to set current key based on scrollwheel
  const changeKey = (value) => {
    setPickerValue(value);
    if (value > 4 && value < 12.5) setCurrentKey(keys[0]);
    else if (value > 12.5 && value < 20.75) setCurrentKey(keys[1]);
    else if (value > 20.75 && value < 29) setCurrentKey(keys[2]);
    else if (value > 29 && value < 37.4) setCurrentKey(keys[3]);
    else if (value > 37.4 && value < 45.6) setCurrentKey(keys[4]);
    else if (value > 45.6 && value < 54) setCurrentKey(keys[5]);
    else if (value > 54 && value < 62.4) setCurrentKey(keys[6]);
    else if (value > 62.4 && value < 70.7) setCurrentKey(keys[7]);
    else if (value > 70.7 && value < 79) setCurrentKey(keys[8]);
    else if (value > 79 && value < 87.35) setCurrentKey(keys[9]);
    else if (value > 87.35 && value < 95.6) setCurrentKey(keys[10]);
    else setCurrentKey(keys[11]);
  };

  const slideValue = new Animated.Value(0);
  const slideDown = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 0],
  });

  // useEffect(() => {
  //   Animated.timing(slideValue, {
  //     toValue: 1,
  //     duration: 500,
  //     useNativeDriver: true, // To make use of native driver for performance
  //   }).start();
  // }, []);

  return (
    <LinearGradient
      colors={[backgroundColor, backgroundColor]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.searchBarContainer,
          // {
          //   transform: [{ translateY: slideDown }],
          // },
        ]}
      >
        <Pressable
          style={[styles.button, styles.backButton]}
          onPress={() => history.push("/")}
        >
          <Icon style={{ color: textColor }} name="arrow-left" />
        </Pressable>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => {
            setUserInput(text);
          }}
          onFocus={() => setSearchBy("song")}
          autoFocus={true}
          onSubmitEditing={submitSearchHandler}
          value={userInput}
        />
      </Animated.View>

      {searchBy === "song" && (
        //search by song
        <>
          <View style={styles.searchByContainer}>
            <Pressable
              style={[styles.buttonPressed, styles.searchButton]}
              onPress={() => setSearchBy("song")}
            >
              <Text style={styles.searchByText}>Song</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.searchButton]}
              onPress={() => {
                setSearchBy("key");
                Keyboard.dismiss();
              }}
            >
              <Text style={styles.searchByText}>Key</Text>
            </Pressable>
          </View>
          <View style={styles.bottomTextContainer}>
            {/* {!chosen && (
              <Image
                style={{ width: 250, height: 250, marginTop: "80%" }}
                source={require("../assets/guitar-cartoon.png")}
              ></Image>
            )} */}

            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={(e) => {
                    selectSongHandler(item);
                  }}
                >
                  <Image
                    source={{ uri: item.artist.img }}
                    style={styles.coverImage}
                  />
                  <Text style={styles.title}>
                    {filterTitle(item.title, item.artist.name)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
      {searchBy === "key" && (
        //search by key
        <>
          <View style={styles.searchByContainer}>
            <Pressable
              style={[styles.button, styles.searchButton]}
              onPress={() => setSearchBy("song")}
            >
              <Text style={styles.searchByText}>Song</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonPressed, styles.searchButton]}
              onPress={() => setSearchBy("key")}
            >
              <Text style={styles.searchByText}>Key</Text>
            </Pressable>
          </View>
          <View style={styles.bottomTextContainer}>
            <View style={styles.selectKeyContainer}>
              <Text style={styles.selectText}>Select a </Text>
              {isMinor && (
                <Pressable
                  style={[styles.button, styles.minorButton]}
                  onPress={() => setIsMinor(false)}
                >
                  <Text style={styles.switchText}>Minor Key</Text>
                </Pressable>
              )}
              {!isMinor && (
                <Pressable
                  style={[styles.buttonPressed, styles.majorButton]}
                  onPress={() => setIsMinor(true)}
                >
                  <Text style={styles.switchText}>Major Key</Text>
                </Pressable>
              )}
              <Text style={styles.selectText}> to play along to</Text>
            </View>
            <View style={styles.circlePicker}>
              <CircularPicker
                size={350}
                //prettier-ignore
                steps={steps}
                stepNames={keys}
                borderColor={accentColor}
                gradients={{
                  0: [pickerColor, pickerColor],
                  100: [pickerColor, pickerColor],
                }}
                backgroundColor={pickerColor}
                defaultPos={pickerValue}
                onChange={changeKey}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.circleButton]}
              onPress={handleKeyPress}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  color: accentColor,
                  fontFamily: mainFont,
                }}
              >
                Play in
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: textColor,
                  fontSize: 30,
                  fontFamily: mainFont,
                }}
              >
                {currentKey}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
  button: {
    borderWidth: 2,
    borderRadius: mainBorderRadius,
    borderColor: primaryColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonPressed: {
    borderWidth: 2,
    borderRadius: mainBorderRadius,
    borderColor: secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 5,
    width: "100%",
    height: "10%",
  },
  backButton: {
    width: "10%",
    height: "90%",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
  },
  searchBar: {
    width: "90%",
    borderRadius: mainBorderRadius,
    padding: 10,
    margin: 3,
    height: "90%",
    fontSize: 24,
    fontFamily: mainFont,
    borderWidth: 2,
    color: textColor,
    borderColor: primaryColor,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
  },
  searchByContainer: {
    backgroundColor: "transparent",
    padding: 10,
    height: "10%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  searchByText: {
    fontFamily: mainFont,
    fontSize: 16,
    color: textColor,
  },
  searchButton: {
    width: "40%",
    height: "80%",
  },
  searchButtonPressed: {
    width: "40%",
    height: "80%",
  },

  //search result container
  bottomTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectKeyContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectText: {
    fontSize: 20,
    color: textColor,
    fontFamily: mainFont,
  },
  minorButton: {
    flex: 0.6,
    padding: 5,
    height: "30%",
    backgroundColor: secondaryColor,
    borderColor: primaryColor,
  },
  majorButton: {
    flex: 0.6,
    padding: 5,
    height: "30%",
    borderColor: primaryColor,
  },
  switchText: {
    fontSize: 16,
    color: textColor,
    fontFamily: mainFont,
  },
  circlePicker: { flex: 0.8 },

  circleButton: {
    position: "absolute",
    bottom: "31%",
    height: 150,
    width: 150,
    borderRadius: 300,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 4, height: 4 },
    elevation: 8,
  },

  listItem: {
    marginBottom: 10,
    height: 70,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    borderRadius: mainBorderRadius,
    padding: 5,
    backgroundColor: "white",
    borderColor: secondaryColor,
    borderWidth: 2,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
  },
  coverImage: {
    width: "15%",
    height: "90%",
    borderRadius: mainBorderRadius,
  },
  title: {
    width: "85%",
    color: textColor,
    paddingLeft: 10,
    fontFamily: mainFont,
    fontSize: 18,
  },
});

export default Search;
