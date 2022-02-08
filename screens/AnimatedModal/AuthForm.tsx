import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import Styles from "../../constants/Styles";
import { auth, registerUser, signInUser } from "../../firebase/utils";
import Register from "./Register";
import Login from "./Login";
import CustomText from "../../components/CustomText";

export default function AuthForm({ setModalShow }: any) {
  const [mode, setMode] = useState("register");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const registerHandler = () => {
    registerUser({ authEmail: registerEmail, authPassword: registerPassword });
  };

  const closeModal = () => {
    setModalShow(false);
  };

  const switchMode = () => {
    if (mode == "register") {
      setMode("login");
    } else {
      setMode("register");
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.formBg}>
          <CustomText black size={24}>
            {mode}
          </CustomText>
          {mode == "register" ? (
            <Register closeModal={closeModal} />
          ) : (
            <Login closeModal={closeModal} />
          )}
          <Button
            title={`Switch to ${mode == "register" ? "Login" : "Register"}`}
            onPress={switchMode}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    height: Styles.window.wHeight,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    zIndex: 100,
  },
  formBg: {
    backgroundColor: "white",
    height: "80%",
    maxHeight: 680,
    borderRadius: 10,
    width: "90%",
    maxWidth: 540,
    justifyContent: "center",
    alignItems: "center",
  },
});
