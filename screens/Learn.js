import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import BottomTabNavigation from "../components/BottomTabNavigation";
import ScaleGenerator from "../components/ScaleGenerator";
import {
  accentColor,
  backgroundColor,
  playBackgroundColor,
  primaryColor,
  mainBorderRadius,
  secondaryColor,
  textColor,
  mainFont,
} from "../assets/Styles";
import GestureRecognizer from "react-native-swipe-gestures";
import {
  getNotesInScale,
  getScaleDescription,
  getScaleTips,
} from "../tools/ScaleTools";

const Learn = ({ history }) => {
  const { tab, currentScale, currentKey, setTab } = useContext(AppContext);

  //get the notes in the scale
  const getScaleNotesHandler = () => {
    const notesInScale = getNotesInScale(
      currentScale.name,
      currentKey,
      currentScale.isMinor
    );
    let noteString = "";
    for (let i = 0; i < notesInScale.length; i++) {
      if (i === notesInScale.length - 1) {
        noteString += notesInScale[i];
        break;
      }
      noteString += notesInScale[i] + ", ";
    }
    return noteString;
  };

  //chords
  //prettier-ignore
  const DATA = [
    {title: "First Item",},
    {title: "Second Item",},
    {title: "Third Item",},
    {title: "Fourth Item",},
    {title: "Fifth Item",},
  ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.title} />;

  //learn tab with chosen scale
  const chosenScaleView = () => {
    return (
      <>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Learn the{" "}
            <Text style={{ color: accentColor }}>
              {currentKey} {currentScale.name}
            </Text>{" "}
            Scale
          </Text>
          <Text style={styles.titleText}>Position {currentScale.position}</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}
        >
          <View style={styles.scaleWrapper}>
            <Text> </Text>
            <ScaleGenerator
              key={Math.random() * 1}
              fretNumber={Math.abs(currentScale.fretNumber)}
              scale={currentScale.scale}
              isMinor={currentScale.isMinor}
              modified={currentScale.modified}
            />
            {currentScale.modified ? (
              <Text style={styles.fretNumberModified}>
                {currentScale.fretNumber * -1}
              </Text>
            ) : (
              <Text style={styles.fretNumber}>{currentScale.fretNumber}</Text>
            )}
          </View>
          <View style={styles.notes}>
            <Text style={styles.notesInScale}>
              Notes in scale: {getScaleNotesHandler()}
            </Text>
          </View>
          <View style={styles.scaleBlurb}>
            <Text style={styles.blurbText}>
              {getScaleDescription(currentScale.name, currentScale.isMinor)}
            </Text>
          </View>
          <View style={styles.scaleBlurb}>
            <Text style={styles.secondaryTitle}>Tips n Tricks</Text>
            <Text style={styles.blurbText}>
              {getScaleTips(currentScale.name, currentScale.isMinor)}
            </Text>
          </View>
          <Text style={styles.secondaryTitle}>Chords and Triads</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={() => Math.random() * 1}
          />
          <Text style={styles.secondaryTitle}>Riffs</Text>
          <View style={styles.tab}>
            <Text style={{ color: "white" }}>Tab will be here</Text>
          </View>
        </ScrollView>
      </>
    );
  };

  //learn tab with no chosen scale
  const noChosenView = () => {
    return (
      <View style={styles.noScale}>
        <Text>No chosen scale yet</Text>
      </View>
    );
  };

  const slideValue = new Animated.Value(0);
  const slideIn = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });
  const slideOut = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  useEffect(() => {
    if (tab === "learn") {
      Animated.timing(slideValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true, // To make use of native driver for performance
      }).start();
    } else {
      Animated.timing(slideValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true, // To make use of native driver for performance
      }).start();
      setTimeout(() => history.push("/"));
    }
  }, [tab]);

  return (
    <View style={styles.container}>
      <Header history={history} />
      <GestureRecognizer
        onSwipeRight={() => {
          setTab("play");
        }}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                tab === "learn"
                  ? { translateX: slideIn }
                  : { translateX: slideOut },
              ],
            },
          ]}
        >
          {currentScale.scale ? chosenScaleView() : noChosenView()}
        </Animated.View>
      </GestureRecognizer>
      <BottomTabNavigation history={history} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: "center",
    width: "100%",
  },
  contentContainer: {
    paddingTop: 10,
    width: "90%",
  },
  noScale: {
    backgroundColor: backgroundColor,
    flex: 1,
  },
  title: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    borderBottomWidth: 2,
    borderColor: accentColor,
    backgroundColor: backgroundColor,
    borderRadius: mainBorderRadius,
  },
  titleText: {
    color: textColor,
    fontFamily: mainFont,
    fontSize: 22,
  },
  scaleWrapper: {
    backgroundColor: "white",
    borderRadius: mainBorderRadius,
    borderColor: accentColor,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: textColor,
    shadowOpacity: 0.3,
    elevation: 6,
    width: "100%",
    padding: 10,
    justifyContent: "center",
    borderWidth: 1,
  },
  fretNumberModified: {
    left: "29%",
    top: "3%",
    fontSize: 16,
    fontFamily: mainFont,
    color: textColor,
  },
  fretNumber: {
    left: "17%",
    top: "3%",
    margin: 0,
    fontSize: 16,
    fontFamily: mainFont,
    color: textColor,
  },
  notes: {
    paddingTop: 15,
    paddingHorizontal: 5,
  },
  notesInScale: {
    color: textColor,
    fontSize: 16,
  },
  scaleBlurb: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  blurbText: {
    fontSize: 16,
    color: textColor,
  },
  secondaryTitle: {
    fontSize: 26,
    color: textColor,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  item: {
    backgroundColor: primaryColor,
    width: 200,
    height: 200,
    borderRadius: mainBorderRadius,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 14,
  },
  tab: {
    width: "100%",
    borderWidth: 1,
    borderColor: accentColor,
    backgroundColor: secondaryColor,
    height: 75,
  },
});

export default Learn;
