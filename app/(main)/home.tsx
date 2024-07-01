import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { router } from "expo-router";

import SafeView from "@/components/SafeView";
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";

const Home = () => {
  const event = {
    roomNo: 300,
    image:
      "https://media.istockphoto.com/id/974238866/photo/audience-listens-to-the-lecturer-at-the-conference.jpg?s=612x612&w=0&k=20&c=p_BQCJWRQQtZYnQlOtZMzTjeB_csic8OofTCAKLwT0M=",
    time: "12:00 PM",
    title: "Disco Night",
  };
  return (
    <SafeView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={tw`w-full h-[300px] items-center justify-center`}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=",
            }}
            style={tw`w-full h-full`}
          />

          <Text style={tw`text-sky-400 text-5xl font-bold absolute top-[25%]`}>
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
              router.navigate({ pathname: "/event", params: event })
            }
          >
            <EventCard event={event} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Home;
