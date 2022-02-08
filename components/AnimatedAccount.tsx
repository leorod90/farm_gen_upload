import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AnimatedAccount() {
  return (
    <View style={styles.animatedBox}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  animatedBox: {
    position: "absolute",
    backgroundColor: "white",
    zIndex:20,
    top: 0,
    // right: Sty,
    height: 200,
    width: 200,
  },
});
