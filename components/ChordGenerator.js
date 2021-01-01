import React from "react";
import { Text } from "react-native";
import scales from "../assets/scales.json";
import { getTransValue, halfStep, wholeStep } from "../tools/ScaleTools";
//This component takes in a 6x6 box and generates the chords within it given a key
const ChordGenerator = () => {
  // const { scale, fretNumber, key, isMinor, modified } = props;

  //notes A-G#
  let notes = [];
  for (let i = 0; i < 12; i++) {
    notes.push(scales.notes[i].note);
  }
  //TEST DATA~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const scale = [
    [0, 3, 0, 0, 2, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 2, 0, 1, 0, 0],
    [0, 1, 0, 3, 0, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 3, 0, 0, 2, 0],
  ];
  const scaleUnModified = [
    [0, 1, 0, 1, 0, 0],
    [0, 3, 0, 0, 2, 0],
    [1, 0, 0, 1, 0, 0],
    [0, 2, 0, 1, 0, 0],
    [0, 1, 0, 3, 0, 0],
    [0, 1, 0, 1, 0, 0],
  ];
  const fretNumber = 5;
  const modified = true;
  const key = "C";
  const isMinor = false;
  //END OF TEST DATA~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //function to get all notes in same position as given scale
  const getGuitarNeckSlice = (fretNumber, modified) => {
    const openNotes = ["E", "A", "D", "G", "B", "E"];
    let neckSlice = [];
    for (let i = 0; i < 6; i++) {
      let startIndex = modified
        ? notes.indexOf(openNotes[i]) + fretNumber - 1
        : notes.indexOf(openNotes[i]) + fretNumber;
      if (startIndex >= 12) {
        startIndex -= 12;
      }

      if (startIndex + 6 > 12) {
        let slice = notes
          .slice(startIndex, 12)
          .concat(notes.slice(0, startIndex - 6));
        neckSlice.push(slice);
      } else {
        neckSlice.push(notes.slice(startIndex, startIndex + 6));
      }
    }
    return neckSlice;
  };
  //TEST
  const testNeckSlice = getGuitarNeckSlice(fretNumber, modified);

  //function to remove all notes except those that are in the chord
  const isolateChordNotes = (chord, neckSlice) => {
    let notesInChord = null;
    if (chord.includes("m")) {
      chord = chord.charAt(0);
      const flatThird = wholeStep(halfStep(chord));
      const fifth = wholeStep(wholeStep(flatThird));
      notesInChord = [chord, flatThird, fifth];
    } else {
      const third = wholeStep(wholeStep(chord));
      const fifth = halfStep(wholeStep(third));
      notesInChord = [chord, third, fifth];
    }

    //loop through 2d array and remove all notes not in the chord
    for (let i = 0; i < neckSlice.length; i++) {
      for (let j = 0; j < neckSlice[0].length; j++) {
        if (!notesInChord.includes(neckSlice[i][j])) {
          neckSlice[i][j] = null;
        }
      }
    }

    const chordObject = { notesInChord, neckSlice };
    return chordObject;
  };
  //TEST
  const testChordObject = isolateChordNotes("C", testNeckSlice);
  console.log(testChordObject);
  //function that returns an array of different combinations of at least all 3 isolated notes
  const getChordCombinations = (chordObject) => {
    const { neckSlice, notesInChord } = chordObject;
    const resultSets = [];
    //generate set of strings for each note,
    let rootStrings = [];
    let thirdStrings = [];
    let fifthStrings = [];
    for (let i = 0; i < neckSlice.length; i++) {
      notesInChord.map((note, index) => {
        if (neckSlice[i].includes(note)) {
          switch (index) {
            case 0:
              rootStrings.push(i);
              break;
            case 1:
              thirdStrings.push(i);
              break;
            case 2:
              fifthStrings.push(i);
              break;
          }
        }
      });
    }
    console.log("root strings: ", rootStrings);
    console.log("third strings: ", thirdStrings);
    console.log("fifth strings: ", fifthStrings);

    //Find permutations of these 3 sets that contain at least one of each note
    for (let i = 0; i < rootStrings.length; i++) {
      for (let j = 0; j < thirdStrings.length; j++) {
        if (j == i) continue;
        for (let k = 0; k < fifthStrings.length; k++) {
          if (k == i || k == j) continue;
          resultSets.push([rootStrings[i], thirdStrings[j], fifthStrings[k]]);
        }
      }
    }
    console.log(resultSets);
  };
  getChordCombinations(testChordObject);
  return <Text>ChordGenerator</Text>;
};

export default ChordGenerator;
