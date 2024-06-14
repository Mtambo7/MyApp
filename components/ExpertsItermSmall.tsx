import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import {
  MD2Colors,
  useTheme,
  MD3Colors,
  MD2DarkTheme,
  Icon,
} from "react-native-paper";
import { router } from "expo-router";

type Prop = {
  image: string;
  name: string;
  categoryS: string;
  about: string;
  contact: string;
  address: string;
  email: string;
};

type Items = {
  exp: Prop;
};
const ExpertsItermSmall = ({ exp }: Items) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "../expertDetail/expert",
          params: {
            name: exp.name,
            image: exp.image[0]?.url,
            about: exp.about,
            contact: exp.contact,
            category: exp.categoryS[0],
            address: exp.address,
            email: exp.email,
          },
        })
      }
    >
      <Image source={{ uri: exp.image[0]?.url }} style={styles.image} />
      <ThemedText style={{ color: MD3Colors.secondary10 }}>
        {exp.name}
      </ThemedText>

      <ScrollView>
        {exp.categoryS.map((item) => (
          <View key={item.id}>
            <Text
              style={{
                color: MD2Colors.blue900,
                borderRadius: 3,
                alignSelf: "flex-start",
              }}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <Icon
          source="map-marker-outline"
          color={MD2Colors.green900}
          size={20}
        />
        <Text>{exp.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExpertsItermSmall;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: MD2Colors.cyan50,
    marginBottom: 10,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
});
