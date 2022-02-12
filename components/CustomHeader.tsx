import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../constants/Colors";
import Styles from "../constants/Styles";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function CustomHeader({
  bubbleAnim,
  setBubbleShow,
  setBubbleAnim,
}: any) {
  const navigate = useNavigation();

  const toggleAccountHandler = () => {
    setBubbleShow(true);
    setBubbleAnim((prevCheck: boolean) => !prevCheck);
  };

  const derived = useDerivedValue(
    () => (!bubbleAnim ? withTiming("180deg") : withTiming("0deg")),
    [bubbleAnim]
  );

  const cStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: derived.value }],
    };
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TouchableWithoutFeedback onPress={() => navigate.navigate("Main")}>
            <Image
              style={styles.image}
              source={require("../assets/images/logo.png")}
            />
          </TouchableWithoutFeedback>
          <Pressable style={styles.account} onPress={toggleAccountHandler}>
            <FontAwesome name="user-circle" size={30} color={Colors.green} />
            <Animated.View style={cStyle}>
              <FontAwesome
                name="chevron-down"
                size={20}
                color={Colors.green}
                style={{ marginBottom: 2.5, marginRight: 2.5 }}
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.darkGreen,
  },
  container: {
    paddingHorizontal: Styles.container.paddingHorizontal,
    height: Styles.header.height,
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    height: Styles.header.height,
    width: "100%",
    maxWidth: Styles.container.maxWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 40,
    width: 180,
  },
  account: {
    height: 40,
    width: 80,
    backgroundColor: "white",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
