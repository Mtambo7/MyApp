import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton, MD3Colors } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import CalendarPicker from "react-native-calendar-picker";
import { ThemedText } from "./ThemedText";
import { CREATE_BOOKING, endpoint } from "@/app/api/baseUrl";
import { gql, useMutation } from "@apollo/client";

import useUserAttributes from "@/app/api/authUrl";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default function BookingModalScreen({ hideModal, id }: any) {
  return (
    <ApolloProvider client={client}>
      <BookingModal hideModal={hideModal} id={id} />
    </ApolloProvider>
  );
}

const BookingModal = ({ hideModal, id }: any) => {
  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [text, setText] = useState("");
  const { name, email } = useUserAttributes();

  useEffect(() => {
    getTime();
  }, []);
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({ time: i + " : 00 AM" });
      timeList.push({ time: i + " : 30 AM" });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({ time: i + " : 00 PM" });
      timeList.push({ time: i + " : 30 PM" });
    }

    setTimeList(timeList);
  };

  const variables = {
    data: {
      bookingStatus: "Booked",
      expert: { connect: { id } },
      note: text,
      time: selectedTime,
      date: `${selectedDate}`,
      userEmail: email,
      userName: name,
    },
  };
  console.log(typeof variables.data.date);
  console.log("variables:", variables);
  const handleSubmit = () => {
    client
      .mutate({
        mutation: CREATE_BOOKING,
        variables: { data: variables.data },
      })
      .then((result) => console.log(result.data))
      .catch((error) => {
        console.error(error);
        if (error.networkError) {
          console.error("Network Error:", error.networkError.result.errors);
        }
        if (error.graphQLErrors) {
          console.error("GraphQL Errors:", error.graphQLErrors);
        }
      });
  };

  return (
    <ScrollView>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <IconButton
          icon="keyboard-backspace"
          iconColor={MD3Colors.primary20}
          size={30}
          onPress={hideModal}
        />
        <ThemedText style={{ paddingTop: 17, marginLeft: 20 }}>
          Booking
        </ThemedText>
      </View>
      <KeyboardAvoidingView>
        <ThemedText style={{ marginLeft: 10 }}>Select Dates</ThemedText>
        <View style={styles.calenderContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            minDate={Date.now()}
            todayBackgroundColor={MD3Colors.primary50}
            todayTextStyle={{ color: MD3Colors.tertiary99 }}
            selectedDayColor={MD3Colors.primary20}
            selectedDayTextColor={MD3Colors.tertiary99}
          />
        </View>
        <View>
          <ThemedText style={{ marginLeft: 10 }}>Select Time Slot</ThemedText>
          <FlatList
            data={timeList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedTime(item.time)}>
                <Text
                  style={[
                    selectedTime === item.time
                      ? [styles.selectedTime, { color: MD3Colors.tertiary99 }]
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View>
          <ThemedText style={{ marginLeft: 10 }}>Message</ThemedText>
          <View>
            <TextInput
              placeholder="Note"
              numberOfLines={4}
              value={text}
              multiline
              style={styles.nodeText}
              onChangeText={setText}
            />
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.btn}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: MD3Colors.secondary90,
    padding: 20,
    borderRadius: 15,
    margin: 5,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: MD3Colors.primary50,
    borderRadius: 99,
    margin: 10,
    backgroundColor: MD3Colors.primary30,
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: MD3Colors.primary20,
    borderRadius: 99,
    margin: 10,
  },
  nodeText: {
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    padding: 20,
    textAlignVertical: "top",
    borderColor: MD3Colors.primary30,
  },
  btn: {
    textAlign: "center",
    backgroundColor: MD3Colors.primary50,
    color: MD3Colors.tertiary99,
    padding: 15,
    borderRadius: 99,
    margin: 10,
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
