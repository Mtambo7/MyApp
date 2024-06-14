import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Icon, MD3Colors } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getExpertsByCategory, endpoint } from "../api/baseUrl";
import axios from "axios";
import ExpertsItermSmall from "@/components/ExpertsItermSmall";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const queryClient = new QueryClient();

export default function ExpertCategory() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExpertDetailsScreen />
    </QueryClientProvider>
  );
}

const ExpertDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const {
    data: searchByCategory,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery(
    ["searchByCategory", id],
    async () => {
      const query = getExpertsByCategory(id);
      const response = await axios({
        url: endpoint,
        method: "POST",
        data: {
          query,
        },
      });
      return response.data.data;
    },
    {
      enabled: !!id,
    }
  );

  if (isLoadingCategories) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (errorCategories) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Pressable style={{ padding: 20 }} onPress={() => router.back()}>
          <Icon
            source="keyboard-backspace"
            color={MD3Colors.primary20}
            size={30}
          />
        </Pressable>
        <ThemedText style={{ paddingTop: 20 }}>{id}</ThemedText>
      </View>

      {searchByCategory && (
        <FlatList
          style={{ padding: 10 }}
          data={searchByCategory.experts}
          renderItem={({ item, index }) => (
            <View>
              <ExpertsItermSmall exp={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
