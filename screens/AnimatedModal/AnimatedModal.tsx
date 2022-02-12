import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Styles from "../../constants/Styles";
import AuthForm from "./AuthForm";

const Y_ANIM_START = Styles.window.sHeight;
const Y_ANIM_END = 0;

interface Props {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  modalAnim: boolean;
  setModalAnim: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnimatedModal({
  setModalShow,
  modalAnim,
  setModalAnim,
}: Props) {
  const yAnim = useSharedValue(Y_ANIM_START);

  React.useEffect(() => {
    if (modalAnim == false) {
      yAnim.value = withTiming(Y_ANIM_START);
    } else {
      yAnim.value = withTiming(Y_ANIM_END);
    }
  }, [modalAnim]);

  const mStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: yAnim.value,
        },
      ],
    };
  });

  const closeModal = () => {
    setModalAnim(false);
    setTimeout(() => {
      setModalShow(false);
    }, 500);
  };

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <Animated.View style={[styles.container, mStyle]}>
        <AuthForm setModalShow={setModalShow} />
      </Animated.View>
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
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.75)",
    zIndex: 50,
  },
});
