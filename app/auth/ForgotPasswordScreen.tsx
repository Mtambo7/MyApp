import { StyleSheet, View, Text, Image } from "react-native";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  MD3Colors,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";

import { Link, router } from "expo-router";
import { resetPassword, ResetPasswordOutput } from "aws-amplify/auth";

interface User {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
});

const ForgotPasswordScreen = () => {
  const theme = useTheme();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onBackUp = () => {
    router.navigate("./LoginScreen");
  };

  async function handleForgot({ email }: User) {
    setError("");
    if (isLoading) return;
    setIsLoading(true);
    try {
      const {} = await resetPassword({ username: email });
      router.push({
        pathname: "./ResetPasswordScreen",
        params: { addre: email },
      });
    } catch (e: any) {
      setError(e.message);
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
      <Text
        style={{
          color: theme.colors.onPrimaryContainer,
          fontWeight: "bold",
          fontSize: 22,
        }}
      >
        Forgot Password
      </Text>

      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={handleForgot}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <TextInput
              style={styles.text}
              label="Email"
              placeholder="Enter Your Email "
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("email")}
              mode="outlined"
              outlineStyle={{ borderRadius: 10 }}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              right={
                <TextInput.Icon
                  icon="email"
                  color={theme.colors.onPrimaryContainer}
                />
              }
            />

            {!!touched.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
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
              Send
            </Button>
          </>
        )}
      </Formik>

      <Button
        icon={"keyboard-backspace"}
        style={styles.button}
        textColor={theme.colors.primary}
        mode="text"
        onPress={onBackUp}
      >
        Back To Login
      </Button>
    </View>
  );
};

export default ForgotPasswordScreen;

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
