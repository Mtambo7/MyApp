import { Stack } from "expo-router";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import useUserAttributes from "../api/authUrl";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const API_KEY = "b85hepv7s7ng";

const ChatLayout = () => {
  const { id, name } = useUserAttributes();

  const client = StreamChat.getInstance(API_KEY);
  const connectUser = async () => {
    await client.connectUser(
      {
        id: "Michael",
        name: name,
      },
      client.devToken("Michael")
    );

    const channel = client.channel("livestream", "public", {
      name: "Chat Group",
    });
    await channel.create();
  };

  useEffect(() => {
    connectUser();

    return () => {
      client.disconnectUser();
    };
  }, []);

  //   if (!id) {
  //     return (
  //       <View style={{ justifyContent: "center", flex: 1 }}>
  //         <ActivityIndicator style={{}} />
  //       </View>
  //     );
  //   }

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Message" }} />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
};

export default ChatLayout;
