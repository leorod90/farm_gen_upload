import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import AuthForm from "./AuthForm";

export default function AnimatedModal({ setModalShow }: any) {
  return (
    <TouchableWithoutFeedback onPress={() => setModalShow(false)}>
      <View style={styles.container}>
        <AuthForm setModalShow={setModalShow} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // height: Styles.window.wHeight,
    // height: Styles.window.wHeight,
    height: "100%",
    // width: "100%",
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,.75)",
    zIndex: 50,
  },
});
