import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon, IconButton, MD2Colors, MD3Colors } from "react-native-paper";
import BookingModalScreen from "@/components/BookingModal";

const Expert = () => {
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);

  const { name, image, contact, about, category, address, email, id } =
    useLocalSearchParams();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={[{ height: "90%", backgroundColor: MD3Colors.tertiary99 }]}
      >
        <Image source={{ uri: image }} style={styles.image} />

        <IconButton
          icon="keyboard-backspace"
          iconColor={MD3Colors.tertiary99}
          size={30}
          onPress={() => router.back()}
          style={styles.backBtn}
        />

        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.contact}>{contact}</Text>
          <Text>{category}</Text>
          <Text>{email}</Text>
          <View style={{ flexDirection: "row" }}>
            <Icon
              source="map-marker-outline"
              color={MD2Colors.green900}
              size={20}
            />
            <Text style={{ marginLeft: 5 }}>{address}</Text>
          </View>
        </View>
        <View style={{ borderWidth: 0.4 }}></View>
        <View style={{ paddingTop: 10, marginLeft: 10 }}>
          <Text style={styles.name}>About Me</Text>
          <Text>{about}</Text>
        </View>
      </ScrollView>
      <View
        style={{ display: "flex", flexDirection: "row", margin: 8, gap: 8 }}
      >
        <TouchableOpacity style={styles.messageBtn}>
          <Text
            style={{
              textAlign: "center",
              color: MD3Colors.primary20,
              fontWeight: "bold",
            }}
          >
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookingBtn}
          onPress={() => setShowModal(true)}
        >
          <Text
            style={{
              textAlign: "center",
              color: MD3Colors.tertiary99,
              fontWeight: "bold",
            }}
          >
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={showModal}>
        <BookingModalScreen id={id} hideModal={() => setShowModal(false)} />
      </Modal>
    </View>
  );
};

export default Expert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 5,
  },
  content: {
    display: "flex",
    padding: 10,
    gap: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contact: {
    fontSize: 16,
    color: MD2Colors.blue900,
  },
  categoryScroll: {
    maxHeight: 100,
  },
  categoryItem: {},
  categoryText: {
    color: MD2Colors.blue900,
    backgroundColor: MD3Colors.neutralVariant20,
    borderRadius: 3,
    padding: 4,
  },
  address: {
    fontSize: 16,
    color: MD2Colors.grey700,
  },
  messageBtn: {
    padding: 15,
    backgroundColor: MD3Colors.tertiary99,
    borderWidth: 1,
    borderColor: MD3Colors.primary0,
    borderRadius: 99,
    flex: 1,
  },

  bookingBtn: {
    padding: 15,
    backgroundColor: MD3Colors.primary30,
    borderWidth: 1,
    borderColor: MD3Colors.primary0,
    borderRadius: 99,
    flex: 1,
  },
});
