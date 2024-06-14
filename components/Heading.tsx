import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { useTheme } from "react-native-paper";

const Heading = ({ text, isViewAll }: any) => {
  const theme = useTheme();
  return (
    <View style={styles.text}>
      <ThemedText style={{ color: theme.colors.primary, fontWeight: "bold" }}>
        {text}
      </ThemedText>
      {isViewAll && <Text>View All</Text>}
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  text: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
