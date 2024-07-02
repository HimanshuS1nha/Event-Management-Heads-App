import { View, ScrollView, Alert, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import SafeView from "@/components/SafeView";
import LoadingModal from "@/components/LoadingModal";
import Header from "@/components/Header";
import Title from "@/components/Title";
import StudentCard from "@/components/StudentCard";
import { UseMyEvent } from "@/hooks/useMyEvent";
import { StudentType } from "@/types";

const Students = () => {
  const { myEvent } = UseMyEvent();
  const students = [
    {
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712620800&semt=sph",
      name: "Test Student",
      branch: "CSE",
      year: "3rd",
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-registered-students"],
    queryFn: async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        throw new Error("Authenication failed. Please login again!");
      }
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/get-registered-students`,
        { token, eventId: myEvent?.id }
      );
      return data as {
        students: StudentType[];
      };
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
  return (
    <SafeView>
      <LoadingModal isVisible={isLoading} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={tw`mb-4`} />

        <Title>Registered Students</Title>

        {data?.students.length === 0 && (
          <Text
            style={tw`text-rose-500 text-center text-base font-medium mt-5`}
          >
            No data to show!
          </Text>
        )}

        <View style={tw`h-full mt-6 w-full px-2`}>
          <FlashList
            data={data?.students}
            keyExtractor={(student) => student.id}
            renderItem={({ item }) => {
              return <StudentCard student={item} />;
            }}
            estimatedItemSize={50}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Students;
