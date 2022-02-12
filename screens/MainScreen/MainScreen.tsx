import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { RootStackProps } from "../../navigation";
import MainContent from "./MainContent";

export default function MainScreen({ navigation }: RootStackProps<"Main">) {
  const opacity = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      if (opacity.value < 1) {
        opacity.value += 0.01;
      }
    }, 25);

    return () => clearInterval(interval);
  }, [opacity]);

  return (
    <View style={styles.container}>
      <View style={styles.saleHeader}></View>
      <MainContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: Styles.header.height,
  },
  saleHeader: {
    height: 80,
    width: "100%",
    backgroundColor: Colors.beige,
  },
});
