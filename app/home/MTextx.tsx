import React, { memo } from "react";
import axios from "axios";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import {
  SLIDES_QUERY,
  CATEGORY_QUERY,
  endpoint,
  EXPERT_QUARY,
} from "../api/baseUrl";
import Heading from "@/components/Heading";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import ExpertsItermSmall from "@/components/ExpertsItermSmall";
import { useRouter } from "expo-router";

const queryClient = new QueryClient();

export default function MTextx() {
  return (
    <QueryClientProvider client={queryClient}>
      <MTextxContent />
    </QueryClientProvider>
  );
}

function MTextxContent() {
  const route = useRouter();
  const {
    data: slides,
    isLoading: isLoadingSlides,
    error: errorSlides,
  } = useQuery("slides", async () => {
    const response = await axios({
      url: endpoint,
      method: "POST",
      data: {
        query: SLIDES_QUERY,
      },
    });
    return response.data.data;
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery("categories", async () => {
    const response = await axios({
      url: endpoint,
      method: "POST",
      data: {
        query: CATEGORY_QUERY,
      },
    });
    return response.data.data;
  });

  const {
    refetch,
    data: experts,
    isLoading: isLoadingExperts,
    error: errorExperts,
  } = useQuery("experts", async () => {
    const response = await axios({
      url: endpoint,
      method: "POST",
      data: {
        query: EXPERT_QUARY,
      },
    });
    return response.data.data;
  });

  return (
    <View style={Styles.container}>
      <Heading text={"Choose your best Expert"} />
      {isLoadingCategories && <ActivityIndicator animating />}
      {errorSlides && errorSlides}
      {slides && (
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={3}
          autoplayLoopKeepAnimation
          showsHorizontalScrollIndicator={false}
          data={slides.sliders}
          horizontal
          renderItem={({ item, index }) => (
            <View
              style={{
                margin: 10,
              }}
            >
              <Image
                source={{ uri: item.image?.url }}
                style={Styles.image}
                resizeMode="cover"
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <View>
        <Heading text={"Categories"} isViewAll={true} />
        {isLoadingCategories && <ActivityIndicator animating />}
        {isLoadingCategories && errorCategories}
        {categories && (
          <FlatList
            numColumns={4}
            data={categories.categoryS}
            renderItem={({ item, index }) => (
              <View style={{ alignItems: "center", flex: 1 }}>
                <Pressable
                  style={Styles.icon}
                  onPress={() => route.push(`../detail/${item.name} `)}
                >
                  <Image
                    source={{ uri: item.icon?.url }}
                    style={{ width: 30, height: 30 }}
                  />
                </Pressable>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: MD2Colors.blue500,
                      marginBottom: 10,
                    }}
                  >
                    {item?.name}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <View>
        <Heading text={"Experts"} isViewAll={true} />
        {isLoadingExperts && <ActivityIndicator animating />}
        {isLoadingExperts && errorExperts}
        {experts && (
          <FlatList
            data={experts.experts}
            renderItem={({ item, index }) => (
              <View>
                <ExpertsItermSmall exp={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {},

  image: {
    width: 270,
    height: 150,
    borderRadius: 20,
    objectFit: "cover",
  },
  icon: {
    backgroundColor: " #EDEDED ",
    padding: 17,
    borderRadius: 99,
    alignItems: "center",
  },
});
