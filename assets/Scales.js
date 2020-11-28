// 24 possible keys
//[A, Am, A#, A#m, B, Bm, C, Cm, C#, C#m, D, Dm, D#, D#m, E, Em, F, Fm, F#, F#m, G, Gm, G#, G#m]
// since scales are transferrable like everything on the guitar, if we can determine
// the start point for a scale in one key we have figured out its positions in all keys
export const Scales = [
  {
    id: "pent1",
    name: "Pentatonic Scale",
    position: 1,
    cStart: -2,
    notes: [
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0],
    ],
  },
  {
    id: "pent2",
    name: "Pentatonic Scale",
    position: 2,
    cStart: 1,
    notes: [
      [0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
    ],
  },
  {
    id: "pent3",
    name: "Pentatonic Scale",
    position: 3,
    cStart: 4,
    notes: [
      [0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
    ],
  },
  {
    id: "pent4",
    name: "Pentatonic Scale",
    position: 4,
    cStart: 6,
    notes: [
      [0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
    ],
  },
  {
    id: "pent5",
    name: "Pentatonic Scale",
    position: 5,
    cStart: 8,
    notes: [
      [0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
    ],
  },
];
//prettier-ignore
export const pentatonic = [
  [ 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,0],
  [ 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1,0],
  [ 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,0],
  [ 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,0],
  [ 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1,0],
  [ 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,0],
];

//start on pentatonic[tVal]
//add another instance of pentatonic to the end
