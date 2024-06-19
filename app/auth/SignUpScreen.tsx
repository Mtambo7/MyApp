import { StyleSheet, View, Text, Image, Alert } from "react-native";
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
import { signUp } from "aws-amplify/auth";

import { Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const validationSchema = Yup.object({
  name: Yup.string().required().min(4).max(30).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .min(4)
    .label("Confim Password")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

type User = {
  name: string;
  email: string;
  password: string;
};

const SignupScreen = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isPasswordComfirmSecure, setIsPasswordComfirmSecure] = useState(true);

  const onTermsPressed = () => {
    console.warn("on Terms Pressed");
  };

  const onLogin = () => {
    router.navigate("./LoginScreen");
  };
  const handleSignup = async ({ name, email, password }: User) => {
    setError("");
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            name,
          },
          autoSignIn: true,
        },
      });
      router.push({
        pathname: "./ConfirmPasswordScreen",
        params: { addres: email },
      });
    } catch (e: any) {
      setError(e.message);
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
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
        Create an Account
      </ThemedText>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <TextInput
              style={styles.text}
              label="Name"
              placeholder="Enter your Name"
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("name")}
              mode="outlined"
              outlineStyle={[
                { borderRadius: 10 },
                {
                  borderColor: touched.name && errors.name ? "red" : undefined,
                },
              ]}
              autoCorrect={false}
              right={
                <TextInput.Icon
                  icon="account-outline"
                  color={theme.colors.onPrimaryContainer}
                />
              }
              onChangeText={handleChange("name")}
            />
            {touched.name && (
              <Text style={{ color: "red" }}>{errors.name}</Text>
            )}
            <TextInput
              style={styles.text}
              label="Email"
              placeholder="Enter your Email"
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
            {touched.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.text}
              label="Password"
              placeholder="Enter your Password"
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("password")}
              mode="outlined"
              outlineStyle={[
                { borderRadius: 10 },
                {
                  borderColor:
                    touched.password && errors.password ? "red" : undefined,
                },
              ]}
              autoCorrect={false}
              secureTextEntry={isPasswordSecure}
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
              onChangeText={handleChange("password")}
            />
            {!!touched.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}

            <TextInput
              style={styles.text}
              label="Confirm Password"
              placeholder="Confirm Password"
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("confirmPassword")}
              mode="outlined"
              outlineStyle={[
                { borderRadius: 10 },
                {
                  borderColor:
                    touched.confirmPassword && errors.confirmPassword
                      ? "red"
                      : undefined,
                },
              ]}
              autoCorrect={false}
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
              onChangeText={handleChange("confirmPassword")}
            />
            {!!touched.confirmPassword && (
              <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
            )}
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 5,
                color: theme.colors.outline,
              }}
            >
              By signing up, you agree to follow our{" "}
              <Text
                onPress={onTermsPressed}
                style={{ color: theme.colors.primary, fontStyle: "italic" }}
              >
                Terms of Use{" "}
              </Text>
              and{" "}
              <Text
                onPress={onTermsPressed}
                style={{ color: theme.colors.tertiary, fontStyle: "italic" }}
              >
                Privancy Policy.
              </Text>
            </Text>
            <ActivityIndicator animating={isLoading} />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Button
              buttonColor={theme.colors.onPrimaryContainer}
              contentStyle={{ width: 290, height: 50 }}
              mode="contained"
              onPress={() => handleSubmit()}
            >
              {isLoading ? "Loading..." : "Signup"}
            </Button>
          </>
        )}
      </Formik>

      <Button
        style={styles.button}
        textColor={theme.colors.primary}
        mode="text"
        onPress={onLogin}
      >
        Have an account? Login
      </Button>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  button: {
    marginVertical: 1,
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
