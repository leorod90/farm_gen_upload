import React from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

const arrowSize = 24;

const PressBtn = ({ direction }: { direction: string }) => {
  const name = "keyboard-arrow-" + direction;

  return (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: pressed ? Colors.green : Colors.babyGray,
        },
      ]}
    >
      {({ pressed }) => (
        <MaterialIcons
          name={name}
          size={arrowSize}
          color={pressed ? "white" : Colors.gray}
        />
      )}
    </Pressable>
  );
};

export default function Pagination() {
  return (
    <View style={styles.container}>
      <CustomText fancy bold black size={20}>
        Featured Farms
      </CustomText>
      <View style={styles.rightSide}>
        <TouchableOpacity>
          <CustomText
            size={20}
            color={Colors.green}
            style={{ fontWeight: 700, marginRight: 10 }}
          >
            See All
          </CustomText>
        </TouchableOpacity>
        <PressBtn direction="left" />
        <PressBtn direction="right" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 20,
    width: "100%",
    marginVertical: Styles.container.paddingVertical,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 2.5,
    marginLeft: 5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
