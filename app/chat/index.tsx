import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Channel as ChannelType } from "stream-chat";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from "stream-chat-expo";
import { router, useLocalSearchParams } from "expo-router";

const ChatScreen = () => {
 

  return (
    <ChannelList
      onSelect={(channel) => router.push(`./channel/${channel.id}`)}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
