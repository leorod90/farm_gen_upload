import React from "react";
import { StyleSheet, View } from "react-native";
import Styles from "../../constants/Styles";
import HorizontalFlat from "./HorizontalFlat";
import Jumbo from "./Jumbo";
import Pagination from "./Pagination";

export default function MainContent() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Jumbo />
        <Pagination />
        <HorizontalFlat />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Styles.container.paddingVertical,
    paddingHorizontal: Styles.container.bigPaddingHorizontal,
  },
  wrapper: {
    // flex: 1,
    height: "100%",
    width: "100%",
    maxWidth: Styles.container.maxWidth,
  },
});
