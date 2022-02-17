import React from "react";
import { TextInput, Text, Button, View, StyleSheet } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { addFarm } from "../../firebase/utils";

interface Props {
  uid: any;
}

export default function AddForm({ uid }: Props) {
  const initialValues = {
    displayName: "",
    storeImage: "",
    storePhone: "",
    storeOpen: "",
    storeClose: "",
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    displayName: yup
      .string()
      .trim()
      .min(1)
      .max(15)
      .required("Please provide a store name"),
    storeImage: yup.string().trim(),
    storePhone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .trim()
      .min(10)
      .max(10),
    storeOpen: yup.string().trim(),
    storeClose: yup.string().trim(),
  });

  const submitHandler = async (values: any) => {
    await addFarm(values, uid);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, onSubmitProps) => {
        submitHandler(values);
        onSubmitProps.resetForm();
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => {
        const { displayName, storeImage, storePhone, storeOpen, storeClose } =
          values;
        return (
          <View style={styles.formContainer}>
            <TextInput
              value={displayName}
              style={styles.inputStyle}
              onChangeText={handleChange("displayName")}
              onBlur={() => setFieldTouched("displayName")}
              placeholder="Enter a store name"
            />
            {touched.displayName && errors.displayName && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.displayName}
              </Text>
            )}
            <TextInput
              value={storeImage}
              style={styles.inputStyle}
              onChangeText={handleChange("storeImage")}
              onBlur={() => setFieldTouched("storeImage")}
              placeholder="Image Url (optional)"
            />
            <TextInput
              value={storePhone}
              style={styles.inputStyle}
              onChangeText={handleChange("storePhone")}
              onBlur={() => setFieldTouched("storePhone")}
              placeholder="Phone Number (optional)"
            />
            {touched.storePhone && errors.storePhone && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.storePhone}
              </Text>
            )}
            <TextInput
              value={storeOpen}
              style={styles.inputStyle}
              onChangeText={handleChange("storeOpen")}
              onBlur={() => setFieldTouched("storeOpen")}
              placeholder="Open Time (optional)"
            />
            <TextInput
              value={storeClose}
              style={styles.inputStyle}
              onChangeText={handleChange("storeClose")}
              onBlur={() => setFieldTouched("storeClose")}
              placeholder="Close Time (optional)"
            />
            <Button
              color="#3740FE"
              title="Submit"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    // padding: 50,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#4e4e4e",
    padding: 12,
    marginBottom: 5,
  },
});
