import React, { useContext } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../AppContext";
import {
  accentColor,
  mainFont,
  backgroundColor,
  primaryColor,
  secondaryColor,
  mainBorderRadius,
  textColor,
  playBackgroundColor,
} from "../assets/Styles";
import ScaleGenerator from "./ScaleGenerator";

//ScaleCard receives the scale Item, breaks it into all the different scales and sents to scale generator for processing
const ScaleCard = (props) => {
  const { history, scale, position, name, fretNumber } = props;
  const {
    chosen,
    tab,
    setTab,
    currentScale,
    setCurrentScale,
    currentKey,
  } = useContext(AppContext);
  const handleLearnMore = () => {
    setCurrentScale({
      ...currentScale,
      name: name,
      position: position,
      scale: scale,
      fretNumber: fretNumber,
      isMinor: currentKey.includes("m"),
      modified: fretNumber < 0,
    });
    setTab("learn");
    history.push("/learn");
  };

  //when we go to learn tab we need to store all the info from the scaleCard somehwere to access

  return (
    <View style={styles.card}>
      <View style={styles.cardContentTop}>
        <View style={styles.title}>
          <Text style={[styles.text, styles.scaleName]}>
            {currentKey + " " + name + " Scale"}
          </Text>
          <Text style={styles.text}>{"Position " + position}</Text>
        </View>
        <TouchableOpacity
          style={styles.learnBtn}
          onPress={() => handleLearnMore()}
        >
          <Text style={styles.learnText}>Learn More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContentBottom}>
        {fretNumber >= 0 && (
          <>
            <ScaleGenerator
              key={Math.random() * 1}
              scale={scale}
              isMinor={currentKey.includes("m")}
              fretNumber={fretNumber}
              modified={false}
            />
            <Text style={styles.fretNumber}>{fretNumber}</Text>
          </>
        )}
        {fretNumber < 0 && (
          <>
            <ScaleGenerator
              key={Math.random() * 1}
              scale={scale}
              fretNumber={fretNumber * -1}
              modified={true}
            />
            <Text style={styles.fretNumberModified}>{fretNumber * -1}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    width: "90%",
    borderRadius: mainBorderRadius,
    elevation: 3,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: accentColor,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    margin: 10,
    padding: 10,
    alignSelf: "center",
  },
  cardContentTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },
  fretNumber: {
    left: "-33%",
    top: "3%",
    fontSize: 16,
    fontFamily: mainFont,
    color: textColor,
  },
  fretNumberModified: {
    left: "-20%",
    top: "3%",
    fontSize: 16,
    fontFamily: mainFont,
    color: textColor,
  },
  cardContentBottom: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  learnBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
    backgroundColor: backgroundColor,
    borderWidth: 1,
    borderColor: accentColor,
    borderRadius: mainBorderRadius,
  },
  learnText: {
    fontFamily: mainFont,
    color: textColor,
  },
  scaleName: { fontFamily: "JosefinSans-SemiBold" },
  text: {
    color: textColor,
    fontFamily: mainFont,
    fontSize: 20,
  },
});
export default ScaleCard;
