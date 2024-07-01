import { View, Text, Image } from "react-native";
import React, { memo } from "react";
import tw from "twrnc";
import { AntDesign, Entypo } from "@expo/vector-icons";

const EventCard = ({ event }: any) => {
  return (
    <View style={tw`h-52 flex-row mb-6 px-4`}>
      <View
        style={tw`w-[50%] h-full bg-white rounded-l-lg items-center justify-center gap-y-4`}
      >
        <View style={tw`items-center gap-y-1.5`}>
          <Text style={tw`text-blue-600 text-xl font-bold`}>SAT</Text>
          <Text style={tw`text-blue-600 text-xl font-bold`}>29</Text>
          <Text style={tw`text-blue-600 text-xl font-bold`}>APRIL</Text>
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
