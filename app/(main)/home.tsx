import { View, Text, ScrollView, Image, Pressable, Alert } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import SafeView from "@/components/SafeView";
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import LoadingModal from "@/components/LoadingModal";
import { MyEventType, UseMyEvent } from "@/hooks/useMyEvent";

const Home = () => {
  const { myEvent, setMyEvent } = UseMyEvent();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-my-event"],
    queryFn: async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        throw new Error("Authenication failed. Please login again!");
      }

      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/get-my-event`,
        { token }
      );
      return data as { myEvent: MyEventType };
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      Alert.alert("Error", error.response?.data.error);
    } else if (error instanceof Error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Error", "Some error occured. Please try again later!");
    }
  }

  useEffect(() => {
    if (data?.myEvent) {
      setMyEvent(data.myEvent);
    }
  }, [data]);
  return (
    <SafeView>
      <LoadingModal isVisible={isLoading} />
      {myEvent && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />

          <View style={tw`w-full h-[300px] items-center justify-center`}>
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=",
              }}
              style={tw`w-full h-full`}
            />

            <Text
              style={tw`text-sky-400 text-5xl font-bold absolute top-[25%]`}
            >
              Event 2K24
            </Text>

            <Pressable
              style={tw`absolute bottom-[25%] w-40 items-center justify-center py-3 bg-violet-600 rounded-full`}
            >
              <Text style={tw`text-white text-base`}>See Students List</Text>
            </Pressable>
          </View>

          <View style={tw`mt-9 gap-y-5`}>
            <Text style={tw`text-sky-400 text-xl font-semibold pl-4.5`}>
              My Event
            </Text>

            <Pressable
              onPress={() =>
                router.navigate("/event")
              }
            >
              <EventCard event={myEvent} />
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeView>
  );
};

export default Home;
