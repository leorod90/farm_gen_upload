import React, { useEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import { useState } from "react";

type Prop = {};

const size = 22;

export default function AnimatedHeart({}: Prop) {
  const [active, setActive] = useState(false);
  const show = useSharedValue<boolean>(false);

  const toggleFavHandler = () => {
    setActive((prevCheck) => !prevCheck);
  };

  useEffect(() => {
    show.value = active;
  }, [active]);

  const derived = useDerivedValue(() => show.value, []);

  const offStyle = useAnimatedStyle(() => {
    const scale = interpolate(derived.value, [true, false], [0, 1]);
    return {
      transform: [
        {
          scale,
        },
      ],
    };
  }, []);

  const activeStyle = useAnimatedStyle(() => {
    const scale = interpolate(derived.value, [false, true], [0, 1]);
    return {
      transform: [
        {
          scale: withSpring(scale),
        },
      ],
    };
  }, []);

  return (
    <Pressable
      onPress={toggleFavHandler}
      style={({ pressed }) => [styles.barItem]}
    >
      <Animated.View style={[styles.current, offStyle]}>
        <AntDesign name="hearto" size={size} color={Colors.gray} />
      </Animated.View>
      <Animated.View style={[styles.current, activeStyle]}>
        <AntDesign name="heart" size={size} color="red" />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  barItem: {
    height: size,
    width: size,
    justifyContent: "center",
    alignItems: "center",
  },
  current: {
    position: "absolute",
  },
});
