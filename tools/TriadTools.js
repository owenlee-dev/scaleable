import {createKeyboardAwareNavigator} from 'react-navigation';
import scales from '../assets/scales.json';
import {halfStep, wholeStep} from '../tools/ScaleTools';

//notes A-G#
let notes = [];
for (let i = 0; i < 12; i++) {
  notes.push(scales.notes[i].note);
}

//function to get all notes in same position as given scale
const getGuitarNeckSlice = (fretNumber, modified) => {
  const openNotes = ['E', 'A', 'D', 'G', 'B', 'E'];
  let neckSlice = [];
  for (let i = 0; i < 6; i++) {
    let startIndex = modified
      ? notes.indexOf(openNotes[i]) + fretNumber * -1 - 1
      : notes.indexOf(openNotes[i]) + fretNumber;
    if (startIndex >= 12) {
      startIndex -= 12;
    }
    if (startIndex + 6 > 12) {
      let slice = notes
        .slice(startIndex, 12)
        .concat(notes.slice(0, startIndex - 6));
      neckSlice.unshift(slice);
    } else {
      neckSlice.unshift(notes.slice(startIndex, startIndex + 6));
    }
  }
  return neckSlice;
};

//function to remove all notes except those that are in the chord
const isolateChordNotes = (chord, neckSlice) => {
  let notesInChord = null;

  if (chord.includes('m')) {
    chord = chord.slice(0, chord.length - 1);
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

  const chordObject = {notesInChord, neckSlice};
  return chordObject;
};

//function that returns an array of different combinations of the 3 required notes
const getTriads = (neckSlice, notesInChord) => {
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

  //Find permutations of these 3 sets that contain at least one of each note
  for (let i = 0; i < rootStrings.length; i++) {
    for (let j = 0; j < thirdStrings.length; j++) {
      if (thirdStrings[j] == rootStrings[i]) continue;
      for (let k = 0; k < fifthStrings.length; k++) {
        if (
          fifthStrings[k] == rootStrings[i] ||
          fifthStrings[k] == thirdStrings[j]
        )
          continue;
        resultSets.push([rootStrings[i], thirdStrings[j], fifthStrings[k]]);
      }
    }
  }
  return resultSets;
};

//function to reduce a neckslice into just the 3 notes outlined in a triad
const isolateTriad = (triad, neckSlice, notesInChord) => {
  //loop through each string in neckslice
  for (let i = 0; i < neckSlice.length; i++) {
    //if string is in triad object
    if (triad.includes(i)) {
      //find out which note is on that string
      const noteToKeep = notesInChord[triad.indexOf(i)];
      //inner loop to loop through each note on the string
      for (let j = 0; j < neckSlice[i].length; j++) {
        if (neckSlice[i][j] !== noteToKeep) {
          neckSlice[i][j] = null;
        }
      }
    } else {
      //if string is not in triad object, nullify all notes on string
      for (let j = 0; j < neckSlice[i].length; j++) {
        neckSlice[i][j] = null;
      }
    }
  }
  return neckSlice;
};

// function to get neck slice portions in preperation for render
export const getTriadNeckSlices = (currentScale, currentKey) => {
  const guitarNeckSlice = getGuitarNeckSlice(
    currentScale.fretNumber,
    currentScale.modified,
  );
  const {neckSlice, notesInChord} = isolateChordNotes(
    currentKey,
    guitarNeckSlice,
  );

  console.log(notesInChord);
  console.log(neckSlice);
  const triads = getTriads(neckSlice, notesInChord);
  let resultTriads = [];

  for (let i = 0; i < triads.length; i++) {
    const neckSliceCopy = JSON.parse(JSON.stringify(neckSlice));
    resultTriads.push(isolateTriad(triads[i], neckSliceCopy, notesInChord));
  }

  return resultTriads;
};

export const getSecond = (currentKey) => {
  return wholeStep(currentKey);
};

export const getThird = (currentKey) => {
  return wholeStep(wholeStep(currentKey));
};

export const getFourth = (currentKey) => {
  return wholeStep(wholeStep(halfStep(currentKey)));
};

export const getFifth = (currentKey) => {
  return wholeStep(wholeStep(halfStep(wholeStep(currentKey))));
};

export const getSixth = (currentKey) => {
  return wholeStep(wholeStep(halfStep(wholeStep(wholeStep(currentKey)))));
};

export const getSeventh = (currentKey) => {
  return wholeStep(
    wholeStep(halfStep(wholeStep(wholeStep(wholeStep(currentKey))))),
  );
};
