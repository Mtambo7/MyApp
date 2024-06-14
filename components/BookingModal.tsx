import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { IconButton, MD3Colors } from "react-native-paper";
import { router } from "expo-router";

const BookingModal = ({ hideModal }) => {
  return (
    <View>
      <IconButton
        icon="keyboard-backspace"
        iconColor={MD3Colors.primary20}
        size={30}
        onPress={hideModal}
      />
      <Text>BookingModal</Text>
    </View>
  );
};

export default BookingModal;

const styles = StyleSheet.create({});
