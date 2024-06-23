import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Channel as ChannelType } from "stream-chat";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";
import { ActivityIndicator } from "react-native-paper";

const ChannelScreen = () => {
  const [channel, setChannel] = useState<ChannelType>();
  const { id } = useLocalSearchParams();
  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      const _id = typeof id === "string" ? id : id[0];
      const channels = await client.queryChannels({ id: { $eq: _id } });
      setChannel(channels[0]);
    };
    fetchChannel();
  }, [id]);

  if (!channel)
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({});
