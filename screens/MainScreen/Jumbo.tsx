import React from "react";
import { StyleSheet, Image, View, Pressable } from "react-native";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";

export default function Jumbo() {
  return (
    <View style={styles.jumbo}>
      <Image
        style={styles.image}
        source={require("../../assets/images/main.jpg")}
      />
      <View style={styles.jumboRight}>
        <CustomText size={26} bold fancy>
          Support the farmers you love
        </CustomText>
        <CustomText size={16}>
          GrownBy makes it easy to shop directly from any participating farm in
          the US. We give farmers the most money for what they grow.
        </CustomText>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            styles.button,
            {
              opacity: pressed ? 0.5 : 1,
              // transform: [{ scale: pressed ? 1.1 : 1 }],
            },
          ]}
        >
          <CustomText size={16} bold style={{ color: Colors.purple }}>
            Shop Now
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  jumbo: {
    backgroundColor: Colors.purple,
    overflow: "hidden",
    height: 350,
    width: "100%",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: Styles.container.paddingVertical,
  },
  image: {
    height: "100%",
    width: "70%",
  },
  jumboRight: {
    height: "100%",
    width: "30%",
    padding: 40,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: Colors.lightGreen,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});
