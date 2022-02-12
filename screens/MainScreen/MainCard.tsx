import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import Styles from "../../constants/Styles";
import AnimatedHeart from "../../components/AnimatedHeart";

export default function Card({ item }: any) {
  const { storeHours, storeImage, displayName, storePhone } = item;
  const [image, setImage] = React.useState(storeImage);

  const onError = () => {
    setImage(require("../../assets/images/no_image.png"));
  };

  const phoneFormat = (phoneNumberString: string) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={{ uri: storeImage }} onError={onError} />
        <View style={styles.info}>
          <View style={styles.title}>
            <CustomText fancy bold black size={20}>
              {displayName}
            </CustomText>
            <AnimatedHeart />
          </View>
          <View style={styles.location}>
            <CustomText size={14} color={Colors.gray}>
              Store Hours:{" "}
              {storeHours.open && storeHours.close
                ? `${storeHours.open} - ${storeHours.close}`
                : "N/A"}
            </CustomText>
            {/* <CustomText size={14} color={Colors.gray}>
              Location
            </CustomText>
            <View style={styles.ratings}>
              <AntDesign
                name="star"
                size={Styles.starSize}
                color={Colors.gold}
              />
              <AntDesign
                name="star"
                size={Styles.starSize}
                color={Colors.gold}
              />
              <AntDesign
                name="star"
                size={Styles.starSize}
                color={Colors.lightGray}
              />
              <AntDesign
                name="star"
                size={Styles.starSize}
                color={Colors.lightGray}
              />
              <AntDesign
                name="star"
                size={Styles.starSize}
                color={Colors.lightGray}
              />
            </View>
            <CustomText size={14} color={Colors.gray}>
              (0)
            </CustomText> */}
          </View>
          {/* <CustomText size={14} black style={{ fontWeight: 600 }}>
            69 products in stock
          </CustomText> */}
          <CustomText size={14} black style={{ fontWeight: 600 }}>
            Phone Number: {storePhone ? phoneFormat(storePhone) : "N/A"}
          </CustomText>
          <View style={styles.btnContain}>
            <TouchableOpacity>
              <CustomText
                size={18}
                color={Colors.green}
                style={{ fontWeight: 600 }}
              >
                Shop Now
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 400,
    marginRight: 20,
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  wrapper: {
    flex: 1,
  },
  image: {
    height: "50%",
    width: "100%",
  },
  info: {
    height: "50%",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    display: "flex",
    flexDirection: "row",
  },
  ratings: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  btnContain: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
