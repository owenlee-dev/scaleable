import scales from "../assets/scales.json";

//helper function to parse the notes array
const getTransValue = (key) => {
  for (let i = 0; i < scales.notes.length; i++) {
    if (scales.notes[i].note === key) {
      return scales.notes[i].transValue;
    }
  }
};

const getScaleObject = (name) => {
  for (let i = 0; i < scales.scales.length; i++) {
    if (scales.scales[i].name === name) {
      return scales.scales[i];
    }
  }
};

// function to transpose scales to different key
export const transposeScale = (scale, newKey) => {
  const transValue = getTransValue(newKey);
  // Re-adjust Pentatonic scale to correct start fret
  let newScale = Array.from(Array(6), () => new Array(scale[0].length));
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < scale[0].length; j++) {
      newScale[i][j] = scale[i][j + transValue];
    }
  }
  return newScale;
};

// function to transpose the places where we need to slice the pentatonic scale to give us smaller scales
export const transposeSlices = (slices, newKey) => {
  const transVal = getTransValue(newKey);
  let newSlices = Array.from(
    Array(slices.length),
    () => new Array(slices[0].length)
  );

  // transpose original slices from C major
  for (let i = 0; i < slices.length; i++) {
    newSlices[i] = [slices[i][0] - transVal, slices[i][1] - transVal];
  }

  //append more slices based off originals until we reach the end of the scale
  for (let i = 0; ; i++) {
    if (newSlices[i][0] + 12 >= 24) {
      break;
    }
    newSlices.push([newSlices[i][0] + 12, newSlices[i][1] + 12]);
  }
  return newSlices;
};

// function to split large scale 2d array into smaller 2d arrays that will go to ScaleGenerator
export const splitScale = (scale, slices) => {
  let splitScales = [];
  let startFrets = [];
  let counter = 0;

  //outer loop to loop through all slices
  for (let i = 0; i < slices.length; i++) {
    if (slices[i][0] < 0) {
      continue;
    }
    const start = slices[i][0];

    //keep a list of start frets for render
    startFrets[counter] = slices[i][0];
    counter++;

    const end = slices[i][1];
    const length = end - start + 1;
    // initialize a new 2d array with dimensions of slice
    let res = Array.from(Array(scale.length), () => new Array(length));
    let row = 0;
    let col = 0;
    // for loops to loop through the 2d array transferring from large 2d array to slice 2d array
    for (let j = 0; j < scale.length; j++) {
      for (let k = start; k < end + 1; k++) {
        //fill new array
        res[row][col] = scale[j][k];
        //update tracking variables
        if (col + 1 >= length) {
          col = 0;
          row++;
        } else {
          col++;
        }
      }
    }

    //modify array to fit the 6x6 array required for ScaleGenerator
    const numOpenColumn = scale.length - length;

    //if 1 extra column tack a 0 onto the end of each row
    if (numOpenColumn === 1) {
      for (let j = 0; j < res.length; j++) {
        res[j].push(0);
      }
    }
    // if 2 extra column tack a 0 onto the beginning and end of each row
    // also set startFret to a negative number so can conditionally render fret number
    else if (numOpenColumn === 2 && startFrets[counter - 1] !== 0) {
      for (let j = 0; j < res.length; j++) {
        res[j].unshift(0);
        res[j].push(0);
      }
      startFrets[counter - 1] = startFrets[counter - 1] * -1;
    }
    splitScales.push(res);
  }
  const splitScaleObject = { startFrets, splitScales };
  return splitScaleObject;
};

export const halfStep = (key) => {
  for (let i = 0; i < scales.notes.length; i++) {
    if (scales.notes[i].note === key) {
      if (key === "G#") {
        return "A";
      } else if (key === "G#m") {
        return "Am";
      }
      return scales.notes[i + 1].note;
    }
  }
};

export const wholeStep = (key) => {
  for (let i = 0; i < scales.notes.length; i++) {
    if (scales.notes[i].note === key) {
      if (key === "G") {
        return "A";
      } else if (key === "G#") {
        return "A#";
      } else if (key === "Gm") {
        return "Am";
      } else if (key === "G#m") {
        return "A#m";
      }
      return scales.notes[i + 2].note;
    }
  }
};

const attatchFlat = (key) => {
  //case1 : is sharp - return the note without flats or sharps
  //case2 : is normal attatch flat
  //case3 : is minor attatch flat in middle
  if (key.includes("#")) {
    if (key.length === 3) {
      return key.charAt(0) + "m";
    } else {
      return key.charAt(0);
    }
  } else if (key.includes("m")) {
    return key.charAt(0) + "bm";
  } else {
    return key + "b";
  }
};

export const getNotesInScale = (name, key, isMinor) => {
  if (!name || !key || isMinor === null) {
    return null;
  }
  let notes = getScaleObject(name).notes;

  if (key.includes("m")) {
    key = key.substring(0, key.length - 1);
  }
  isMinor ? (notes = notes.minor) : (notes = notes.major);
  const first = key;
  const second = wholeStep(first);
  const third = wholeStep(second);
  const fourth = halfStep(third);
  const fifth = wholeStep(fourth);
  const sixth = wholeStep(fifth);
  const seventh = wholeStep(sixth);
  const majorScale = [first, second, third, fourth, fifth, sixth, seventh];
  const notesInScale = [];
  for (let i = 0; i < notes.length; i++) {
    let currentNote = majorScale[Math.abs(notes[i]) - 1];
    if (notes[i] < 0) {
      notesInScale.push(attatchFlat(currentNote));
    } else {
      notesInScale.push(currentNote);
    }
  }
  return notesInScale;
};

export const getScaleDescription = (name, isMinor) => {
  if (isMinor) {
    return getScaleObject(name).description.minor;
  } else {
    return getScaleObject(name).description.major;
  }
};

export const getScaleTips = (name, isMinor) => {
  if (isMinor) {
    return getScaleObject(name).tips.minor;
  } else {
    return getScaleObject(name).tips.major;
  }
};
