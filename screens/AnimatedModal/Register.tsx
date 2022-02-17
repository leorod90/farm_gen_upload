import React from "react";
import {
  TextInput,
  Text,
  Button,
  View,
  StyleSheet,
  LogBox,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { registerUser } from "../../firebase/utils";
import { useNavigation } from "@react-navigation/native";

export default function Register({ closeModal }: any) {
  const navigate = useNavigation<any>();

  const registerHandler = async (values: any) => {
    const checkUser = await registerUser({
      authEmail: values.email,
      authPassword: values.password,
    });
    if (checkUser?.email) {
      closeModal();
      navigate.navigate("Edit");
    } else {
      alert("could not sign in");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values, onSubmitProps) => {
        registerHandler(values);
        onSubmitProps.resetForm();
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(6)
          .max(10, "Password should not excced 10 chars.")
          .required(),
        confirmPassword: yup
          .string()
          .required()
          .equals([yup.ref("password"), null], "Password does not match"),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.formContainer}>
          <TextInput
            value={values.email}
            style={styles.inputStyle}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
            placeholder="E-mail"
          />
          {touched.email && errors.email && (
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errors.email}
            </Text>
          )}
          <TextInput
            value={values.password}
            style={styles.inputStyle}
            onChangeText={handleChange("password")}
            placeholder="Password"
            onBlur={() => setFieldTouched("password")}
            secureTextEntry={true}
          />
          {touched.password && errors.password && (
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errors.password}
            </Text>
          )}
          <TextInput
            value={values.confirmPassword}
            style={styles.inputStyle}
            onChangeText={handleChange("confirmPassword")}
            placeholder="Confirm Password"
            onBlur={() => setFieldTouched("confirmPassword")}
            secureTextEntry={true}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errors.confirmPassword}
            </Text>
          )}
          <Button
            color="#3740FE"
            title="Submit"
            disabled={!isValid}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 50,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#4e4e4e",
    padding: 12,
    marginBottom: 5,
  },
});
LogBox.ignoreAllLogs(true);
