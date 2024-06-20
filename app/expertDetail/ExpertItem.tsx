import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Icon, MD2Colors, MD3Colors } from "react-native-paper";

const ExpertItem = ({ business, booking }: any) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: business?.image[0]?.url }} style={styles.image} />
      <View>
        <ThemedText style={{ color: MD3Colors.secondary10 }}>
          {business.name}
        </ThemedText>

        {
          <FlatList
            data={business.categoryS}
            renderItem={({ item }) => (
              <Text
                style={{
                  color: MD2Colors.blue900,
                  borderRadius: 3,
                  alignSelf: "flex-start",
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
            )}
            keyExtractor={(item) => item.id}
          />
        }

        <Text>{booking.time}</Text>
        <Text style={{ fontSize: 11 }}>{booking.date}</Text>
        <Text
          style={{
            color:
              booking.bookingStatus === "Booked"
                ? "blue"
                : booking.bookingStatus === "InProgress"
                ? "orange"
                : booking.bookingStatus === "Canceled"
                ? "red"
                : "green",

            backgroundColor:
              booking.bookingStatus === "Booked"
                ? MD2Colors.blue100
                : booking.bookingStatus === "InProgress"
                ? MD2Colors.orange100
                : booking.bookingStatus === "Canceled"
                ? MD2Colors.red100
                : MD2Colors.green100,

            width: "40%",
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          {booking.bookingStatus}
        </Text>
      </View>
    </View>
  );
};

export default ExpertItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: MD3Colors.secondary99,
    marginBottom: 10,
    flexDirection: "row",
    padding: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
  },
});
