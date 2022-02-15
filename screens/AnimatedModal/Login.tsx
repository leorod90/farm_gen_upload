import React from "react";
import { TextInput, Text, Button, View, StyleSheet } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { signInUser } from "../../firebase/utils";
import { useNavigation } from "@react-navigation/native";

export default function Login({ closeModal }: any) {
  const navigate = useNavigation<any>();

  const signInHandler = async (values: any) => {
    const checkUser = await signInUser({
      authEmail: values.email,
      authPassword: values.password,
    });
    if (checkUser) {
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
      }}
      onSubmit={(values, onSubmitProps) => {
        signInHandler(values);
        onSubmitProps.resetForm();
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(6)
          .max(10, "Password should not exceed 10 chars.")
          .required(),
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
console.disableYellowBox = true;
