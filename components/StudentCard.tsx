import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";

import { StudentType } from "@/types";

const StudentCard = ({ student }: { student: StudentType }) => {
  return (
    <View style={tw`bg-gray-700 px-8 rounded-lg py-4 w-[97%] mb-2.5`}>
      <View style={tw`w-[50%] bg-gray-300 h-3 rounded-full mx-auto mb-7`} />
      <View style={tw`items-center gap-y-4`}>
        <Image
          source={{
            uri: student.image,
          }}
          style={tw`w-28 h-28 rounded-full`}
        />

        <View style={tw`gap-y-2 items-center`}>
          <Text style={tw`text-white text-lg text-center font-semibold`}>
            {student.name}
          </Text>
          <Text style={tw`text-gray-300 font-semibold`}>
            {student.branch} {student.year} year
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StudentCard;
