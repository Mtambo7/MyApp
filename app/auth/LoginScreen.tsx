import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import {
  TextInput,
  Button,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import { signIn } from "aws-amplify/auth";
import { Redirect, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText.js";

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

type User = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const onForgotPasswordPressed = () => {
    router.navigate("./ForgotPasswordScreen");
  };

  const onSignUp = () => {
    router.navigate("./SignUpScreen");
  };

  const handleSignIn = async ({ email, password }: User) => {
    setError("");
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { isSignedIn } = await signIn({
        username: email,
        password,
      });
      router.push("../(tabs)");
    } catch (e: any) {
      setError(e.message);
    }
    setIsLoading(false);
    5;
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
      <Text
        style={{
          color: theme.colors.primary,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Login
      </Text>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSignIn}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <TextInput
              style={styles.text}
              label="User Name"
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
                  color={theme.colors.primary}
                />
              }
              onChangeText={handleChange("email")}
            />
            {touched.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              style={{ borderColor: error && "red" }}
              label="Password"
              placeholder="Enter your Password"
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              contentStyle={{ width: 250 }}
              onBlur={() => setFieldTouched("password")}
              mode="outlined"
              outlineStyle={{ borderRadius: 10 }}
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
            {error && <Text style={{ color: "red", margin: 10 }}>{error}</Text>}
            <ActivityIndicator style={{ margin: 10 }} animating={isLoading} />

            <Button
              buttonColor={theme.colors.primary}
              contentStyle={{ width: 290, height: 50 }}
              mode="contained"
              onPress={() => handleSubmit()}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </>
        )}
      </Formik>

      <Button
        style={styles.button}
        textColor={theme.colors.primary}
        mode="text"
        onPress={onForgotPasswordPressed}
      >
        Forgot Password?
      </Button>

      <Button
        style={styles.button}
        textColor={theme.colors.onPrimaryContainer}
        mode="text"
        onPress={onSignUp}
      >
        Don't have an account? create one
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  button: {
    marginVertical: 1,
  },

  image: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
  },

  text: {
    marginBottom: 10,
  },
});
