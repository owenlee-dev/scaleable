import React, { useContext } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { AppContext } from "../AppContext";
import ScaleGenerator from "./ScaleGenerator";

//ScaleCard receives the scale Item, breaks it into all the different scales and sents to scale generator for processing
const ScaleCard = (props) => {
  const { history, scale, position, name, fretNumber } = props;
  const { chosen } = useContext(AppContext);
  const handleLearnMore = () => {
    history.push("/learn");
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContentTop}>
        <View style={styles.title}>
          <Text style={styles.text}>
            {chosen.key_of + " " + name + " Scale"}
          </Text>
          <Text style={styles.text}>
            {"Position " + (parseInt(position) + 1)}
          </Text>
          {fretNumber > 0 && (
            <Text style={styles.fretNumber}>{fretNumber}</Text>
          )}
          {fretNumber < 0 && (
            <Text style={styles.fretNumberModified}>{fretNumber * -1}</Text>
          )}
        </View>
        <Pressable style={styles.learnBtn} onPress={() => handleLearnMore()}>
          <Text style={styles.learnText}>Learn More</Text>
        </Pressable>
      </View>
      <View style={styles.cardContentBottom}>
        <ScaleGenerator scale={scale} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    width: "90%",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#ffa7a3",
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
    left: "34%",
    top: "5%",
    fontSize: 16,
    fontFamily: "NerkoOne-Regular",
    color: "black",
  },
  fretNumberModified: {
    left: "65%",
    top: "3%",
    fontSize: 16,
    fontFamily: "NerkoOne-Regular",
    color: "black",
  },
  cardContentBottom: {},
  learnBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
    backgroundColor: "white",
    borderRadius: 4,
  },
  learnText: {
    fontFamily: "NerkoOne-Regular",
    color: "#6F6F6F",
  },
  text: {
    color: "#6F6F6F",
    fontFamily: "NerkoOne-Regular",
    fontSize: 20,
  },
});
export default ScaleCard;
