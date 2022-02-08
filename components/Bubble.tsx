import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../constants/Colors";
import Styles from "../constants/Styles";
import { auth } from "../firebase/utils";
import CustomText from "./CustomText";

export default function Bubble({ setBubbleShow, setModalShow }: any) {
  const [user, setUser] = React.useState<any>({});
  const navigation = useNavigation();

  React.useEffect(() => {
    const checkUser = async () => {
      await onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    };
    checkUser();
  }, [auth]);

  const onPress = async () => {
    if (user?.email) {
      await signOut(auth);
    } else {
      setModalShow((prevCheck: boolean) => !prevCheck);
    }
    setBubbleShow((current: boolean) => !current);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setBubbleShow(false)}>
      <View
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
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
          <View style={styles.bubble}>
            {user?.email ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("List")}
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
                  style={{ fontWeight: 600 }}
                >
                  Edit Farms
                </CustomText>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={onPress}
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
                style={{ fontWeight: 600 }}
              >
                {user?.email ? "Logout" : "Sign In"}
              </CustomText>
            </TouchableOpacity>
          </View>
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
    top: Styles.header.height - 10,
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
