import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  useTheme,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";
import { signOut, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { router } from "expo-router";
import useUserAttributes from "../api/authUrl";

const details = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const { name, email } = useUserAttributes();

  const hideDialog = () => setVisible(false);

  const { signOut } = useAuthenticator((context) => [context.authStatus]);

  const handleMessage = () => {
    router.navigate("../chat");
  };

  console.log(email);

  const NAME = name.toLocaleLowerCase();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Avatar.Icon
          size={45}
          icon={`alpha-${NAME[0]}-circle-outline`}
          style={{ margin: 5, backgroundColor: theme.colors.primary }}
        />
        <View style={styles.detailsContainer}>
          <Text
            style={{
              color: theme.colors.onSurfaceVariant,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <Text style={{ color: theme.colors.onPrimaryContainer }}>
            {email}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => console.log("my services")}
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Avatar.Icon
          size={45}
          icon={"car-clock"}
          style={{ margin: 5, backgroundColor: theme.colors.primary }}
        />
        <View style={styles.detailsContainer2}>
          <Text
            style={{
              color: theme.colors.secondary,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            My Services
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleMessage}
        style={[
          styles.iconContainer2,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Avatar.Icon
          size={45}
          icon={"chat-outline"}
          style={{ margin: 5, backgroundColor: theme.colors.secondary }}
        />
        <View style={styles.detailsContainer2}>
          <Text
            style={{
              color: theme.colors.secondary,
              fontWeight: "bold",
            }}
          >
            My SMS
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Avatar.Icon
          size={45}
          icon={"logout-variant"}
          style={{ margin: 5, backgroundColor: theme.colors.error }}
        />
        <View style={styles.detailsContainer2}>
          <Text
            style={{
              color: theme.colors.secondary,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </View>
      </TouchableOpacity>

      <View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{ backgroundColor: theme.colors.outlineVariant }}
          >
            <Dialog.Content>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onPrimaryContainer }}
              >
                Are sure you want to logout
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              {error && <Text style={{ color: "red" }}>{error}</Text>}
              <ActivityIndicator size={"large"} animating={isLoading} />
              <Button onPress={signOut}>
                {" "}
                {isLoading ? "Loading..." : "Yes"}
              </Button>
              <Button onPress={() => setVisible(false)}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

export default details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  iconContainer: {
    flexDirection: "row",
    borderRadius: 15,
    marginTop: 40,
    alignContent: "center",
    width: "100%",
  },
  iconContainer2: {
    flexDirection: "row",
    borderRadius: 15,
    alignContent: "center",
    width: "100%",
    marginTop: 5,
  },

  detailsContainer: {
    paddingTop: 5,
    paddingRight: 10,
  },
  dialog: {
    textAlign: "center",
  },

  detailsContainer2: {
    paddingTop: 5,
    paddingRight: 10,
    justifyContent: "center",
  },
});
