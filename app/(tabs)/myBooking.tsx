import { ThemedText } from "@/components/ThemedText";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getExpertsByCategory, endpoint, getBooking } from "../api/baseUrl";
import axios from "axios";
import ExpertsItermSmall from "@/components/ExpertsItermSmall";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useUserAttributes from "@/app/api/authUrl";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import index from ".";
import ExpertItem from "../expertDetail/ExpertItem";
import { ActivityIndicator, MD2Colors, MD3Colors } from "react-native-paper";

const queryClient = new QueryClient();

export default function myBooking() {
  return (
    <QueryClientProvider client={queryClient}>
      <Booking />
    </QueryClientProvider>
  );
}

const Booking = () => {
  const insert = useSafeAreaInsets();
  const { email } = useUserAttributes();
  const [loading, setLoading] = useState(false);
  const {
    refetch,
    data: searchBooking,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery(
    ["searchBooking", email],
    async () => {
      setLoading(true);
      const query = getBooking(email);
      const response = await axios({
        url: endpoint,
        method: "POST",
        data: {
          query,
        },
      });

      setLoading(false);
      return response.data.data;
    },
    // {
    //   staleTime: 6000,
    //   refetchInterval: 6000,
    //   refetchOnWindowFocus: true, // Refetch on window focus
    // }
  );

  if (isLoadingCategories) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
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

  console.log(searchBooking);
  return (
    <View style={[{ paddingTop: insert.top }, styles.container]}>
      <ThemedText
        style={{
          color: MD3Colors.primary10,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        my booking
      </ThemedText>

      {searchBooking && (
        <FlatList
          onRefresh={refetch}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          data={searchBooking.bookings}
          renderItem={({ item, index }) => (
            <View>
              <ExpertItem business={item.expert} booking={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
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
