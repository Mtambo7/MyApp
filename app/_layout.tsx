import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { useColorScheme } from "@/hooks/useColorScheme";

import {} from "@aws-amplify/ui-react-native";
import { Provider } from "react-native-paper";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider>
        <Authenticator.Provider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WelcomeScreen" />
            <Stack.Screen name="LoginScreen" />
            <Stack.Screen name="SignUpScreen" />
            <Stack.Screen name="ConfirmScreen" />
            <Stack.Screen name="ForgotPasswordScreen" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </Authenticator.Provider>
      </Provider>
    </ThemeProvider>
  );
}

export default RootLayout;
