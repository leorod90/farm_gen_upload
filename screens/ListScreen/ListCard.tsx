import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/utils";

export default function ListCard({ item }: any) {
  const { id, storeHours, storeImage, displayName, storePhone } = item;
  const [imageError, setImageError] = React.useState(false);

  const onError = () => {
    setImageError(true);
  };

  const phoneFormat = (phoneNumberString: string) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  const deleteHandler = () => {
    const farmDoc = doc(db, "farms", id);
    deleteDoc(farmDoc);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          // resizeMode='stretch'
          source={
            imageError
              ? require("../../assets/images/no_image.png")
              : { uri: storeImage }
          }
          // onError={onError}
          defaultSource={require("../../assets/images/gray.png")}
        />
        <View style={styles.info}>
          <View style={styles.title}>
            <CustomText fancy bold black size={20}>
              {displayName}
            </CustomText>
            <AntDesign
              onPress={deleteHandler}
              name="delete"
              size={Styles.starSize}
              color="red"
            />
          </View>
          <View style={styles.location}>
            <CustomText size={14} color={Colors.gray}>
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
            </CustomText>
          </View>
          <CustomText size={14} black>
            Phone Number: {storePhone ? phoneFormat(storePhone) : "N/A"}
          </CustomText>
          <CustomText size={12} color={Colors.gray}>
            Store Hours:{" "}
            {storeHours.open && storeHours.close
              ? `${storeHours.open} - ${storeHours.close}`
              : "N/A"}
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    height: 130,
    width: "100%",
    marginRight: 20,
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
    flexDirection: "row",
  },
  image: {
    height: "100%",
    width: "30%",
  },
  info: {
    height: "100%",
    width: "70%",
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
});
