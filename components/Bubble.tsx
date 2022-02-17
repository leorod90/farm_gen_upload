import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import Styles from "../constants/Styles";
import { auth, signOutUser } from "../firebase/utils";
import CustomText from "./CustomText";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

const SCALE_START = 0;
const SCALE_END = 1;
const X_ANIM_START = 85;
const X_ANIM_END = 0;
const Y_ANIM_START = 0;
const Y_ANIM_END = 35;

interface Props {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setModalAnim: React.Dispatch<React.SetStateAction<boolean>>;
  setBubbleShow: React.Dispatch<React.SetStateAction<boolean>>;
  setBubbleAnim: React.Dispatch<React.SetStateAction<boolean>>;
  bubbleAnim: boolean;
}

export default function Bubble({
  setModalShow,
  setModalAnim,
  setBubbleShow,
  setBubbleAnim,
  bubbleAnim,
}: Props) {
  const [user, setUser] = React.useState<any>({});
  const navigation = useNavigation<any>();

  const scaleAnim = useSharedValue(SCALE_START);
  const xAnim = useSharedValue(X_ANIM_START);
  const yAnim = useSharedValue(Y_ANIM_START);

  React.useEffect(() => {
    const checkUser = async () => {
      await onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    };
    checkUser();
  }, [auth]);

  React.useEffect(() => {
    if (bubbleAnim == false) {
      scaleAnim.value = withTiming(SCALE_START);
      xAnim.value = withTiming(X_ANIM_START);
      yAnim.value = withTiming(Y_ANIM_START);
    } else {
      scaleAnim.value = withTiming(SCALE_END);
      xAnim.value = withTiming(X_ANIM_END);
      yAnim.value = withTiming(Y_ANIM_END);
    }
  }, [bubbleAnim]);

  const sStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: xAnim.value,
        },
        {
          translateY: yAnim.value,
        },
        {
          scale: scaleAnim.value,
        },
      ],
    };
  }, []);

  const closeBubble = () => {
    setBubbleAnim(false);
    setTimeout(() => {
      setBubbleShow(false);
    }, 500);
  };

  const logoutHandler = async () => {
    if (user?.email) {
      await signOutUser();
    } else {
      setModalShow(true);
      setModalAnim(true);
    }
    closeBubble();
  };

  const editFarmHandler = () => {
    setBubbleAnim(false);
    navigation.navigate("Edit");
  };

  return (
    <TouchableWithoutFeedback onPress={closeBubble}>
      <View
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          paddingHorizontal: Styles.container.paddingHorizontal,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            maxWidth: Styles.container.maxWidth,
          }}
        >
          <Animated.View style={[styles.bubble, sStyle]}>
            {user?.email ? (
              <>
                <TouchableOpacity
                  onPress={editFarmHandler}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <CustomText
                    size={22}
                    color={Colors.green}
                    style={{ fontWeight: "600" }}
                  >
                    Edit Farms
                  </CustomText>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 0.5,
                  }}
                />
              </>
            ) : null}

            <TouchableOpacity
              onPress={logoutHandler}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <CustomText
                size={22}
                color={Colors.green}
                style={{ fontWeight: "600" }}
              >
                {user?.email ? "Logout" : "Sign In"}
              </CustomText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    // height: 60,
    padding: 10,
    width: 200,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "black",
    top: Styles.header.height - 10 - Y_ANIM_END,
    right: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
