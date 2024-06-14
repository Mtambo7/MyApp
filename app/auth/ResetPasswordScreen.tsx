import { StyleSheet, Text, Image } from "react-native";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  useTheme,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  confirmResetPassword,
  type ConfirmResetPasswordInput,
} from "aws-amplify/auth";

import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface User {
  email: string;
  newPassword: string;
  confirmationCode: string;
}

const validationSchema = Yup.object({
  confirmationCode: Yup.string().required().min(6).label("Code"),
  newPassword: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .min(4)
    .label("Confim Password")
    .oneOf([Yup.ref("newPassword")], "Passwords does not match"),
});

const ResetPasswordScreen = () => {
  const theme = useTheme();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isPasswordComfirmSecure, setIsPasswordComfirmSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { addre }: any = useLocalSearchParams();

  const onBackUp = () => {
    router.navigate("./auth//LoginScreen");
  };

  async function handleConfirmResetPassword({
    confirmationCode,
    newPassword,
  }: User) {
    setError("");
    if (isLoading) return;
    setIsLoading(true);
    try {
      await confirmResetPassword({
        username: addre,
        confirmationCode,
        newPassword,
      });

      router.push("./LoginScreen");
    } catch (e: any) {
      setError(e.message);
    }

    setIsLoading(false);
  }

  return (
    <ThemedView style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
      <ThemedText
        style={{
          color: theme.colors.primary,
          fontWeight: "bold",
          fontSize: 22,
        }}
      >
        Reset Password
      </ThemedText>

      <Formik
        initialValues={{
          confirmationCode: "",
          email: "",
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={handleConfirmResetPassword}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <TextInput
              style={styles.text}
              label="Email"
              value={addre}
              placeholder="Enter your Email"
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("email")}
              mode="outlined"
              outlineStyle={{ borderRadius: 10 }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              right={
                <TextInput.Icon
                  icon="email-outline"
                  color={theme.colors.onPrimaryContainer}
                />
              }
              onChangeText={handleChange("email")}
            />

            <TextInput
              style={styles.text}
              label="code"
              placeholder="Enter Confirmation Code"
              maxLength={6}
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("confirmationCode")}
              mode="outlined"
              outlineStyle={{ borderRadius: 10 }}
              autoCorrect={false}
              onChangeText={handleChange("confirmationCode")}
              right={
                <TextInput.Icon
                  icon="barcode"
                  color={theme.colors.onPrimaryContainer}
                />
              }
            />
            {!!touched.confirmationCode && (
              <Text style={{ color: "red" }}>{errors.confirmationCode}</Text>
            )}

            <TextInput
              style={styles.text}
              label="New Password"
              placeholder="Enter Your New Password"
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("newPassword")}
              mode="outlined"
              outlineStyle={{ borderRadius: 10 }}
              autoCorrect={false}
              secureTextEntry={isPasswordSecure}
              onChangeText={handleChange("newPassword")}
              right={
                <TextInput.Icon
                  icon={isPasswordSecure ? "eye-off-outline" : "eye-outline"}
                  color={theme.colors.onPrimaryContainer}
                  onPress={() => {
                    isPasswordSecure
                      ? setIsPasswordSecure(false)
                      : setIsPasswordSecure(true);
                  }}
                />
              }
            />
            {!!touched.newPassword && (
              <Text style={{ color: "red" }}>{errors.newPassword}</Text>
            )}

            <TextInput
              style={styles.text}
              label="Confirm Password"
              placeholder="Enter Verification Code "
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("confirmPassword")}
              mode="outlined"
              outlineStyle={{ borderRadius: 10 }}
              autoCorrect={false}
              onChangeText={handleChange("confirmPassword")}
              secureTextEntry={isPasswordComfirmSecure}
              right={
                <TextInput.Icon
                  icon={
                    isPasswordComfirmSecure ? "eye-off-outline" : "eye-outline"
                  }
                  color={theme.colors.onPrimaryContainer}
                  onPress={() => {
                    isPasswordComfirmSecure
                      ? setIsPasswordComfirmSecure(false)
                      : setIsPasswordComfirmSecure(true);
                  }}
                />
              }
            />

            {!!touched.confirmPassword && (
              <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
            )}

            <ActivityIndicator animating={isLoading} />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Button
              style={styles.button}
              buttonColor={theme.colors.onPrimaryContainer}
              contentStyle={{ width: 290, height: 50 }}
              mode="contained"
              onPress={() => handleSubmit()}
            >
              {isLoading ? "Loading..." : "SUBMIT"}
            </Button>
          </>
        )}
      </Formik>

      <Button
        icon={"keyboard-backspace"}
        style={styles.button}
        textColor={theme.colors.onPrimaryContainer}
        mode="text"
        onPress={onBackUp}
      >
        Back To Login
      </Button>
    </ThemedView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  button: {
    marginVertical: 5,
    fontStyle: "italic",
  },

  image: {
    width: 200,
    height: 100,
    justifyContent: "center",
    alignSelf: "center",
  },

  text: {
    marginBottom: 5,
  },
});
