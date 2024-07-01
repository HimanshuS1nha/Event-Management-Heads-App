import { View, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";

import SafeView from "@/components/SafeView";
import LoadingModal from "@/components/LoadingModal";
import Header from "@/components/Header";
import Title from "@/components/Title";
import StudentCard from "@/components/StudentCard";

const Students = () => {
  const students = [
    {
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712620800&semt=sph",
      name: "Test Student",
      branch: "CSE",
      year: "3rd",
    },
  ];
  return (
    <SafeView>
      <LoadingModal isVisible={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={tw`mb-4`} />

        <Title>Registered Students</Title>

        <View style={tw`h-full mt-6 w-full px-2`}>
          <FlashList
            data={students}
            keyExtractor={(_, i) => i.toString()}
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
