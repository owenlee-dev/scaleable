import Icon from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import React from "react";
import scales from "../assets/scales.json";

//This component will take in (6x6) 2d scale array and return an image with respective scale
const ScaleGenerator = (props) => {
  const { scale } = props;
  let notes = [...scales.notes];
  const guitarNeck = {
    uri:
      "https://vectr.com/owenlee-dev/d25IzUW8Hz.png?width=325&height=102.88&select=d25IzUW8Hzpage0",
  };

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (!scale[i][j]) {
        notes[i * 6 + j] = "open";
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={guitarNeck} style={styles.image}>
          {notes.map((note, index) => (
            <Icon
              name="circle"
              key={Math.random() * 1}
              size={20}
              color="#0c0c0c"
              style={styles[note]}
            />
          ))}
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 330,
    height: 110,
    backgroundColor: "#a7a3ff",
  },
  image: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  eOne: {
    position: "absolute",
    left: "15%",
    top: "-7%",
  },
  eTwo: { position: "absolute", left: "28%", top: "-7%" },
  eThree: { position: "absolute", left: "41%", top: "-7%" },
  eFour: { position: "absolute", left: "54%", top: "-7%" },
  eFive: { position: "absolute", left: "67%", top: "-7%" },
  eSix: { position: "absolute", left: "80%", top: "-7%" },
  bOne: {
    position: "absolute",
    left: "15%",
    top: "12%",
  },
  bTwo: { position: "absolute", left: "28%", top: "12%" },
  bThree: { position: "absolute", left: "41%", top: "12%" },
  bFour: { position: "absolute", left: "54%", top: "12%" },
  bFive: { position: "absolute", left: "67%", top: "12%" },
  bSix: { position: "absolute", left: "80%", top: "12%" },
  gOne: {
    position: "absolute",
    left: "15%",
    top: "31%",
  },
  gTwo: { position: "absolute", left: "28%", top: "31%" },
  gThree: { position: "absolute", left: "41%", top: "31%" },
  gFour: { position: "absolute", left: "54%", top: "31%" },
  gFive: { position: "absolute", left: "67%", top: "31%" },
  gSix: { position: "absolute", left: "80%", top: "31%" },
  dOne: {
    position: "absolute",
    left: "15%",
    top: "51%",
  },
  dTwo: { position: "absolute", left: "28%", top: "51%" },
  dThree: { position: "absolute", left: "41%", top: "51%" },
  dFour: { position: "absolute", left: "54%", top: "51%" },
  dFive: { position: "absolute", left: "67%", top: "51%" },
  dSix: { position: "absolute", left: "80%", top: "51%" },
  aOne: {
    position: "absolute",
    left: "15%",
    top: "70%",
  },
  aTwo: { position: "absolute", left: "28%", top: "70%" },
  aThree: { position: "absolute", left: "41%", top: "70%" },
  aFour: { position: "absolute", left: "54%", top: "70%" },
  aFive: { position: "absolute", left: "67%", top: "70%" },
  aSix: { position: "absolute", left: "80%", top: "70%" },
  EOne: {
    position: "absolute",
    left: "15%",
    top: "89%",
  },
  ETwo: { position: "absolute", left: "28%", top: "89%" },
  EThree: { position: "absolute", left: "41%", top: "89%" },
  EFour: { position: "absolute", left: "54%", top: "89%" },
  EFive: { position: "absolute", left: "67%", top: "89%" },
  ESix: { position: "absolute", left: "80%", top: "89%" },
  open: { position: "absolute", left: "400%" },
  doubleDot: { position: "absolute" },
});
export default ScaleGenerator;
