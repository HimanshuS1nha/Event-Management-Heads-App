import { View, Text, TextInput, Pressable, Image } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";

import SafeView from "@/components/SafeView";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { useUser } from "@/hooks/useUser";

const EditProfile = () => {
  const { user } = useUser();

  const [name, setName] = useState(user?.name);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [image, setImage] = useState(user?.image);

  const handleChange = useCallback(
    (type: "name" | "phoneNumber", value: string) => {
      if (type === "name") {
        setName(value);
      } else if (type === "phoneNumber") {
        setPhoneNumber(value);
      }
    },
    []
  );

  const pickImage = useCallback(() => {}, []);
  return (
    <SafeView>
      <Header showBackButton />

      <Title>Edit Profile</Title>

      <View style={tw`gap-y-7 mt-10 items-center`}>
        <View style={tw`gap-y-3 w-[80%]`}>
          <View style={tw`items-center`}>
            <View>
              <Image
                source={{
                  uri: image,
                }}
                style={tw`w-32 h-32 rounded-full`}
              />
              <Pressable
                style={tw`absolute bottom-0 right-0`}
                onPress={pickImage}
              >
                <MaterialIcons name="change-circle" size={40} color="white" />
              </Pressable>
            </View>
          </View>
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
            Phone Number
          </Text>
          <TextInput
            style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
            placeholder="Enter new phone number"
            placeholderTextColor={"#fff"}
            value={phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
          />
        </View>

        <Pressable
          style={tw`bg-violet-600 w-[80%] items-center py-3 justify-center rounded-lg`}
        >
          <Text style={tw`text-white text-base font-semibold`}>
            Edit Profile
          </Text>
        </Pressable>
      </View>
    </SafeView>
  );
};

export default EditProfile;
