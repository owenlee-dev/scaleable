import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import scales from "../assets/scales.json";
import {
  accentColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  textColor,
} from "../assets/Styles";

//This component will take in (6x6) 2d scale array and return an image with respective scale
const ScaleGenerator = (props) => {
  const { scale, fretNumber, modified, isMinor } = props;
  let notes = [...scales.frets];
  let guitarNeck = null;

  //TODO if fretNumber =2 and modified need another background - see Amajor Pentatonic
  //setting correct background image
  fretNumber === 0 || (fretNumber === 1 && modified)
    ? (guitarNeck = {
        uri:
          "https://vectr.com/owenlee-dev/eGC63JdU9.png?width=325&height=102&select=eGC63JdU9page0",
      })
    : fretNumber === 1
    ? (guitarNeck = {
        uri:
          "https://vectr.com/owenlee-dev/a1I5HkgvcO.png?width=325&height=102&select=a1I5HkgvcOpage0",
      })
    : (guitarNeck = {
        uri:
          "https://vectr.com/owenlee-dev/d25IzUW8Hz.png?width=325&height=102.88&select=d25IzUW8Hzpage0",
      });

  // 2 = major root note || 3 = minor root note || 4 = bluenote
  // building matrix of note styles for render
  for (let i = 0; i < scale.length; i++) {
    for (let j = 0; j < scale.length; j++) {
      if (!isMinor && scale[i][j] === 2) {
        notes[i * 6 + j] = notes[i * 6 + j].concat("-root");
      } else if (isMinor && scale[i][j] === 3) {
        notes[i * 6 + j] = notes[i * 6 + j].concat("-root");
      }
      if (!scale[i][j]) {
        notes[i * 6 + j] = "open";
      }
    }
  }

  // calculate which dots on the neck will need to be rendered for this section of guitar neck
  let range = [];
  //get range of frets
  modified ? range.push(fretNumber - 2) : range.push(fretNumber - 1);
  for (let i = range[0] + 1; i < range[0] + 8; i++) {
    range.push(i);
  }

  //which frets in range need dots
  for (let i = 0; i < range.length; i++) {
    let dotStyle = "oneDot";
    const dotIndex = scales.dots.indexOf(range[i]);

    if (dotIndex === 4 || dotIndex === 9) {
      dotStyle = "twoDot";
    }
    dotIndex >= 0 ? (range[i] = dotStyle) : (range[i] = "empty");
  }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={guitarNeck} style={styles.image}>
          {notes.map((note, index) => {
            let color = null;
            if (note.includes("-root")) {
              color = accentColor;
              note = note.slice(0, note.length - 5);
            } else {
              color = "black";
            }
            return (
              <Icon
                name="circle"
                key={Math.random() * 1}
                size={15}
                color={color}
                style={styles[note]}
              />
            );
          })}

          {range.map((dot, index) => {
            if (dot === "oneDot") {
              return (
                <Icon
                  name="circle"
                  key={Math.random() * 1}
                  size={17}
                  color="rgba(120,120,120,0.5)"
                  style={styles[dot.concat(index + 1)]}
                />
              );
            } else if (dot === "twoDot") {
              return (
                <>
                  <Icon
                    name="circle"
                    key={Math.random() * 1}
                    size={17}
                    color="rgba(120,120,120,0.5)"
                    style={styles[dot.concat("Top").concat(index + 1)]}
                  />
                  <Icon
                    name="circle"
                    key={Math.random() * 1}
                    size={17}
                    color="rgba(120,120,120,0.5)"
                    style={styles[dot.concat("Bot").concat(index + 1)]}
                  />
                </>
              );
            }
          })}
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 110,
    backgroundColor: backgroundColor,
  },
  image: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  //lots of duplication ahead, is there a better way?
  oneDot1: { position: "absolute", left: "2%", bottom: "40%", zIndex: -1 },
  oneDot2: { position: "absolute", left: "15%", bottom: "40%", zIndex: -1 },
  oneDot3: { position: "absolute", left: "28%", bottom: "40%", zIndex: -1 },
  oneDot4: { position: "absolute", left: "41%", bottom: "40%", zIndex: -1 },
  oneDot5: { position: "absolute", left: "54%", bottom: "40%", zIndex: -1 },
  oneDot6: { position: "absolute", left: "67%", bottom: "40%", zIndex: -1 },
  oneDot7: { position: "absolute", left: "80%", bottom: "40%", zIndex: -1 },
  oneDot8: { position: "absolute", left: "93%", bottom: "40%", zIndex: -1 },
  twoDotTop1: { position: "absolute", left: "2%", bottom: "59%", zIndex: -1 },
  twoDotBot1: { position: "absolute", left: "2%", bottom: "20%", zIndex: -1 },
  twoDotTop2: { position: "absolute", left: "15%", bottom: "59%", zIndex: -1 },
  twoDotBot2: { position: "absolute", left: "15%", bottom: "20%", zIndex: -1 },
  twoDotTop3: { position: "absolute", left: "28%", bottom: "59%", zIndex: -1 },
  twoDotBot3: { position: "absolute", left: "28%", bottom: "20%", zIndex: -1 },
  twoDotTop4: { position: "absolute", left: "41%", bottom: "59%", zIndex: -1 },
  twoDotBot4: { position: "absolute", left: "41%", bottom: "20%", zIndex: -1 },
  twoDotTop5: { position: "absolute", left: "54%", bottom: "59%", zIndex: -1 },
  twoDotBot5: { position: "absolute", left: "54%", bottom: "20%", zIndex: -1 },
  twoDotTop6: { position: "absolute", left: "67%", bottom: "59%", zIndex: -1 },
  twoDotBot6: { position: "absolute", left: "67%", bottom: "20%", zIndex: -1 },
  twoDotTop7: { position: "absolute", left: "80%", bottom: "59%", zIndex: -1 },
  twoDotBot7: { position: "absolute", left: "80%", bottom: "20%", zIndex: -1 },
  twoDotTop8: { position: "absolute", left: "93%", bottom: "59%", zIndex: -1 },
  twoDotBot8: { position: "absolute", left: "93%", bottom: "20%", zIndex: -1 },

  eOne: {
    position: "absolute",
    left: "15%",
    top: "-6%",
  },
  eTwo: { position: "absolute", left: "28%", top: "-6%" },
  eThree: { position: "absolute", left: "41%", top: "-6%" },
  eFour: { position: "absolute", left: "54%", top: "-6%" },
  eFive: { position: "absolute", left: "67%", top: "-6%" },
  eSix: { position: "absolute", left: "80%", top: "-6%" },
  bOne: {
    position: "absolute",
    left: "15%",
    top: "15%",
  },
  bTwo: { position: "absolute", left: "28%", top: "15%" },
  bThree: { position: "absolute", left: "41%", top: "15%" },
  bFour: { position: "absolute", left: "54%", top: "15%" },
  bFive: { position: "absolute", left: "67%", top: "15%" },
  bSix: { position: "absolute", left: "80%", top: "15%" },
  gOne: {
    position: "absolute",
    left: "15%",
    top: "35%",
  },
  gTwo: { position: "absolute", left: "28%", top: "35%" },
  gThree: { position: "absolute", left: "41%", top: "35%" },
  gFour: { position: "absolute", left: "54%", top: "35%" },
  gFive: { position: "absolute", left: "67%", top: "35%" },
  gSix: { position: "absolute", left: "80%", top: "35%" },
  dOne: {
    position: "absolute",
    left: "15%",
    top: "55%",
  },
  dTwo: { position: "absolute", left: "28%", top: "55%" },
  dThree: { position: "absolute", left: "41%", top: "55%" },
  dFour: { position: "absolute", left: "54%", top: "55%" },
  dFive: { position: "absolute", left: "67%", top: "55%" },
  dSix: { position: "absolute", left: "80%", top: "55%" },
  aOne: {
    position: "absolute",
    left: "15%",
    top: "74%",
  },
  aTwo: { position: "absolute", left: "28%", top: "74%" },
  aThree: { position: "absolute", left: "41%", top: "74%" },
  aFour: { position: "absolute", left: "54%", top: "74%" },
  aFive: { position: "absolute", left: "67%", top: "74%" },
  aSix: { position: "absolute", left: "80%", top: "74%" },
  EOne: {
    position: "absolute",
    left: "15%",
    top: "93%",
  },
  ETwo: { position: "absolute", left: "28%", top: "93%" },
  EThree: { position: "absolute", left: "41%", top: "93%" },
  EFour: { position: "absolute", left: "54%", top: "93%" },
  EFive: { position: "absolute", left: "67%", top: "93%" },
  ESix: { position: "absolute", left: "80%", top: "93%" },
  open: { position: "absolute", left: "400%" },
});
export default ScaleGenerator;
