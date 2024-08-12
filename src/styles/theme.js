import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const COLORS = {
  primary: "#ffffff",
  lightGrey: "#CACACA",
  Grey: "#888888",
  red: "#2DD0AF",
};

export const SIZES = {
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  h6: 11,

  width,
  height,
};
