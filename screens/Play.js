import React, { useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Card,
  FlatList,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import BottomTabNavigation from "../components/BottomTabNavigation";
import ScaleCard from "../components/ScaleCard";
import scales from "../assets/scales.json";
import {
  splitScale,
  transposeSlices,
  transposeScale,
  getStartFrets,
} from "../tools/ScaleTools";

const Play = ({ history }) => {
  const { chosen, setChosen } = useContext(AppContext);
  let splitScales = null;
  let startFrets = null;

  if (chosen) {
    // transpose scale to new key
    const transposedScale = transposeScale(
      scales.scales[0].notes,
      chosen.key_of
    );
    //transpose slices
    const slices = transposeSlices(scales.scales[0].slices, chosen.key_of);

    //slice scale into smaller scales
    //TODO find out if you can destructure here
    const splitScaleObject = splitScale(transposedScale, slices);
    splitScales = splitScaleObject.splitScales;
    startFrets = splitScaleObject.startFrets;
  }

  //TODO if nothing chosen yet display some screen
  // render all scales that need to be rendered
  return (
    <View style={styles.container}>
      <Header history={history} />
      <ScrollView style={styles.list}>
        {chosen && (
          <View style={styles.chosenSong}>
            <View style={styles.chosenLeft}>
              <Text style={styles.chosenKey}>{chosen.key_of}</Text>
            </View>
            <View style={styles.chosenRight}>
              <Text style={styles.chosenTitle}>{chosen.title}</Text>
              <Text style={styles.chosenArtist}>{chosen.artist.name}</Text>
            </View>
          </View>
        )}
        {chosen &&
          splitScales.map((scale, index) => (
            //how to conditionally render based on the positive or negative number
            <ScaleCard
              fretNumber={startFrets[index]}
              name={scales.scales[0].name}
              position={index}
              history={history}
              scale={scale}
              key={Math.random() * 1}
            />
          ))}
        {!chosen && <Text>no chosen song yet</Text>}
      </ScrollView>
      <BottomTabNavigation history={history} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  chosenSong: {
    top: 0,
    flexDirection: "row",
    height: "4%",
    width: "100%",
    backgroundColor: "#BEBEBE",
    borderWidth: 1.5,
    borderRadius: 3,
  },
  chosenLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 3,
  },
  chosenRight: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a7a3ff",
    borderWidth: 1.5,
    borderRadius: 3,
  },
  chosenTitle: {
    fontFamily: "NerkoOne-Regular",
    color: "black",
    fontSize: 28,
  },
  chosenArtist: {
    fontFamily: "Robotica",
  },
  chosenKey: {
    fontSize: 38,
    color: "black",
    fontFamily: "NerkoOne-Regular",
  },
  list: { width: "100%" },
});

export default Play;
