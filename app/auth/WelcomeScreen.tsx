import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { useTheme, Text, Button } from "react-native-paper";
import { Link } from "expo-router";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { ThemedText } from "@/components/ThemedText";

const WelcomeScreen = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
      <ThemedText>Welcome To GARAGE EXPERT FINDER</ThemedText>

      <Link href={"./LoginScreen"} style={styles.button}>
        <Button contentStyle={{ width: 290, height: 50 }} mode="contained">
          LOGIN
        </Button>
      </Link>

      <Link href={"./SignUpScreen"}>
        <Button
          buttonColor={theme.colors.onPrimaryContainer}
          contentStyle={{ width: 290, height: 50 }}
          mode="contained"
        >
          SIGNUP
        </Button>
      </Link>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  button: {
    marginTop: 170,
    marginBottom: 15,
  },

  image: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
  },

  text: {
    alignItems: "center",
    justifyContent: "center",
  },
});
