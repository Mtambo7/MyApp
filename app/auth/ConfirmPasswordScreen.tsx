import { StyleSheet, Image, Text } from "react-native";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";

import { router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const validationSchema = Yup.object({
  confirmationCode: Yup.string().required().min(6).label("confirmationCode"),
});

type User = {
  email: string;
  confirmationCode: string;
};

const ConfirmPasswordScreen = () => {
  const { addres }: any = useLocalSearchParams();
  const theme = useTheme();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUpConfirmation({ email, confirmationCode }: User) {
    setError("");
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: addres,
        confirmationCode,
      });

      router.push("../(tabs)");
    } catch (e: any) {
      setError(e.message);
    }
    setIsLoading(false);
  }

  async function handleResend() {
    setError("");
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { attributeName } = await resendSignUpCode({
        username: addres,
      });
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
        Confirm Email
      </ThemedText>

      <Formik
        initialValues={{
          email: "",
          confirmationCode: "",
        }}
        onSubmit={handleSignUpConfirmation}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <TextInput
              value={addres}
              style={styles.text}
              label="Email"
              placeholder="Enter your Email "
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("email")}
              mode="outlined"
              outlineStyle={[
                { borderRadius: 10 },
                {
                  borderColor:
                    touched.email && errors.email ? "red" : undefined,
                },
              ]}
              onChangeText={handleChange("email")}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.text}
              label="Code"
              placeholder="Enter Verification Code "
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("confirmationCode")}
              mode="outlined"
              outlineStyle={[
                { borderRadius: 10 },
                {
                  borderColor:
                    touched.confirmationCode && errors.confirmationCode
                      ? "red"
                      : undefined,
                },
              ]}
              autoCorrect={false}
              onChangeText={handleChange("confirmationCode")}
            />
            {!!touched.confirmationCode && (
              <Text style={{ color: "red" }}>{errors.confirmationCode}</Text>
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
              {isLoading ? "Loading..." : "Confirm"}
            </Button>

            <Button
              style={styles.button}
              contentStyle={{ width: 290, height: 50 }}
              mode="outlined"
              onPress={handleResend}
            >
              {isLoading ? "Loading..." : "Resend"}
            </Button>
          </>
        )}
      </Formik>

      <Button
        icon={"keyboard-backspace"}
        style={styles.button}
        textColor={theme.colors.onPrimaryContainer}
        mode="text"
        onPress={() => console.log(addres)}
      >
        Back To SignUp
      </Button>
    </ThemedView>
  );
};

export default ConfirmPasswordScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  button: {
    marginVertical: 1,
    fontStyle: "italic",
    marginTop: 30,
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
