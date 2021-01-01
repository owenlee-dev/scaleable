export const Slide = {
  out: (value, bounds) => ({
    left: value.interpolate({
      inputValue: [0, 1],
      outputValue: [0, -bounds.width],
    }),
    width: bounds.width,
  }),
  in: (value, bounds) => ({
    left: value.interpolate({
      inputValue: [0, 1],
      outputValue: [bounds.width, 0],
    }),
    width: bounds.width,
  }),
};
