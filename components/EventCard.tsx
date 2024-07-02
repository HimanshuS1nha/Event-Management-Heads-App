import { View, Text, Image } from "react-native";
import React, { memo } from "react";
import tw from "twrnc";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { MyEventType } from "@/hooks/useMyEvent";

const EventCard = ({ event }: { event: MyEventType }) => {
  return (
    <View style={tw`h-52 flex-row mb-6 px-4`}>
      <View
        style={tw`w-[50%] h-full bg-white rounded-l-lg items-center justify-center gap-y-4`}
      >
        <Text style={tw`text-blue-600 text-xl font-bold text-center`}>
          {event.name}
        </Text>

        <View style={tw`flex-row gap-x-3 items-center`}>
          <AntDesign name="calendar" size={20} color="red" />
          <Text style={tw`font-semibold text-base`}>{event.date}</Text>
        </View>

        <View style={tw`flex-row gap-x-3 items-center`}>
          <AntDesign name="clockcircleo" size={20} color="red" />
          <Text style={tw`font-semibold text-base`}>{event.time}</Text>
        </View>

        <View style={tw`flex-row gap-x-3 items-center`}>
          <Entypo name="location-pin" size={24} color="red" />
          <Text style={tw`font-semibold text-base`}>
            Room no. {event.roomNo}
          </Text>
        </View>
      </View>
      <View style={tw`w-[50%] h-full`}>
        <Image
          source={{ uri: event.image }}
          style={tw`w-full h-full rounded-r-lg`}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

export default memo(EventCard);
