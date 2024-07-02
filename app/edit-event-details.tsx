import {
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";
import * as SecureStore from "expo-secure-store";

import SafeView from "@/components/SafeView";
import Title from "@/components/Title";
import Header from "@/components/Header";
import LoadingModal from "@/components/LoadingModal";
import { MyEventType, UseMyEvent } from "@/hooks/useMyEvent";
import { editEventDetailsValidator } from "@/validators/edit-event-details-validator";
import { router } from "expo-router";

const EditEventDetails = () => {
  const { myEvent, setMyEvent } = UseMyEvent();

  const [name, setName] = useState(myEvent?.name);
  const [location, setLocation] = useState(myEvent?.location);
  const [roomNo, setRoomNo] = useState(myEvent?.roomNo.toString());

  const handleChange = useCallback(
    (type: "name" | "location" | "roomNo" | "time", value: string) => {
      if (type === "name") {
        setName(value);
      } else if (type === "location") {
        setLocation(value);
      } else if (type === "roomNo") {
        setRoomNo(value);
      }
    },
    []
  );

  const { mutate: handleEditEventDetails, isPending } = useMutation({
    mutationKey: ["edit-event-details"],
    mutationFn: async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        throw new Error("Authenication failed. Please login again!");
      }

      if (
        name === myEvent?.name &&
        location === myEvent?.location &&
        roomNo === myEvent?.roomNo
      ) {
        return { myEvent, isChanged: false };
      }

      const parsedData = await editEventDetailsValidator.parseAsync({
        name,
        location,
        roomNo: roomNo ? parseInt(roomNo) : undefined,
      });

      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/edit-event-details`,
        { token, eventId: myEvent?.id, ...parsedData }
      );

      return { myEvent: data.myEvent, isChanged: true } as {
        myEvent: MyEventType;
        isChanged: boolean;
      };
    },
    onSuccess: (data) => {
      if (data.isChanged) {
        setMyEvent(data.myEvent);
      }
      Alert.alert("Success", "Event details edited sucessfully", [
        {
          text: "Ok",
          onPress: router.back,
        },
      ]);
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        Alert.alert("Error", error.errors[0].message);
      } else if (error instanceof AxiosError && error.response?.data.error) {
        Alert.alert("Error", error.response?.data.error);
      } else {
        Alert.alert("Error", "Some error occured. Please try again later!");
      }
    },
  });
  return (
    <SafeView>
      <LoadingModal isVisible={isPending} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header showBackButton />

        <Title>Edit Event Details</Title>

        <View style={tw`gap-y-7 mt-10 items-center`}>
          <View style={tw`gap-y-3 w-[80%]`}>
            <Text style={tw`text-white font-medium text-base ml-1`}>Name</Text>
            <TextInput
              style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
              placeholder="Enter new name"
              placeholderTextColor={"#fff"}
              value={name}
              onChangeText={(text) => handleChange("name", text)}
            />
          </View>
          <View style={tw`gap-y-3 w-[80%]`}>
            <Text style={tw`text-white font-medium text-base ml-1`}>
              Location
            </Text>
            <TextInput
              style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
              placeholder="Enter new location"
              placeholderTextColor={"#fff"}
              value={location}
              onChangeText={(text) => handleChange("location", text)}
            />
          </View>
          <View style={tw`gap-y-3 w-[80%]`}>
            <Text style={tw`text-white font-medium text-base ml-1`}>
              Room Number
            </Text>
            <TextInput
              style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
              placeholder="Enter new room number"
              placeholderTextColor={"#fff"}
              value={roomNo}
              onChangeText={(text) => handleChange("roomNo", text)}
            />
          </View>

          <Pressable
            style={tw`bg-violet-600 w-[80%] items-center py-3 justify-center rounded-lg`}
            onPress={() => handleEditEventDetails()}
            disabled={isPending}
          >
            <Text style={tw`text-white text-base font-semibold`}>
              Edit Event
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default EditEventDetails;
