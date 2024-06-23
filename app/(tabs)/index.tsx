import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";
import HomeHeader from "../home/HomeHeader";
import MTextx from "../home/MTextx";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  } from "react-native-safe-area-context";
  import { Amplify } from "aws-amplify";
  import amplifyconfig from "@/src/amplifyconfiguration.json";
import { useTheme } from "react-native-paper";

Amplify.configure(amplifyconfig);

const index = () => {
  const theme = useTheme();
  const insert = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insert.top }}>
      <ScrollView>
        <HomeHeader />
        <View style={{ padding: 20 }}>
          <MTextx />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
});
