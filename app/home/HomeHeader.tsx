import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import {
  Avatar,
  Icon,
  TextInput,
  useTheme,
  Searchbar,
  MD3Colors,
} from "react-native-paper";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import useUserAttributes from "../api/authUrl";

const HomeHeader = () => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const {name,email}= useUserAttributes()
  const insert = useSafeAreaInsets();


  const NAME = name.toLowerCase();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: insert.top,
        backgroundColor: MD3Colors.primary50,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.profile}>
          <View>
            <Avatar.Icon
              size={45}
              icon={`alpha-${NAME[0]}-circle-outline`}
              style={{
                margin: 5,
                backgroundColor: MD3Colors.secondary70,
              }}
            />
          </View>
          <View>
            <Text style={{ color: MD3Colors.neutralVariant80 }}> Welcome</Text>
            <Text style={{ color: MD3Colors.secondary95, fontSize: 20 }}>
              {name}
            </Text>
          </View>
        </View>
        <Icon
          size={24}
          source={"bookmark-outline"}
          color={MD3Colors.tertiary100}
        />
      </View>
      {/* Serch bar */}
      <TextInput
        placeholder="Search Expert by Name..."
        style={{
          borderRadius: 30,
          color: MD3Colors.tertiary99,
          backgroundColor: MD3Colors.secondary30,
        }}
        placeholderTextColor={MD3Colors.secondary99}
        value={text}
        onChangeText={setText}
        mode="outlined"
        outlineStyle={{ borderRadius: 15 }}
        right={
          <TextInput.Icon
            icon="account-search-outline"
            color={MD3Colors.secondary90}
          />
        }
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  profile: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  search: {
    width: "80%",
    height: 50,
    marginLeft: 10,
  },
});
