import { Dimensions } from "react-native";

const wWidth = Dimensions.get("window").width;
const wHeight = Dimensions.get("window").height;

const sWidth = Dimensions.get("screen").width;
const sHeight = Dimensions.get("screen").height;

// 320px — 480px: Mobile devices
// 481px — 768px: iPads, Tablets
// 769px — 1024px: Small screens, laptops
// 1025px — 1200px: Desktops, large screens
// 1201px and more —  Extra large screens, TV

let isBig = wWidth <= 768 ? false : true;

export default {
  starSize: 16,
  header: {
    height: 80,
  },
  window: {
    wWidth,
    wHeight,
    sWidth,
    sHeight,
  },
  container: {
    maxWidth: 1200,
    paddingHorizontal: "2.5%",
    bigPaddingHorizontal: "10%",
    paddingVertical: 20,
  },
  isSmallDevice: wWidth < 375,
};
