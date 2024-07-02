import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";

import SafeView from "@/components/SafeView";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { UserType, useUser } from "@/hooks/useUser";
import LoadingModal from "@/components/LoadingModal";
import { router } from "expo-router";

const EditProfile = () => {
  const { user, setUser } = useUser();

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

  const pickImage = useCallback(async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
    });

    if (res.canceled) {
      return;
    }
    const base64 = `data:image/png;base64,${res.assets?.[0].base64}`;
    setImage(base64);
  }, []);

  const { mutate: handleEditProfile, isPending } = useMutation({
    mutationKey: ["edit-profile"],
    mutationFn: async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        throw new Error("Authenication failed. Please login again!");
      }
      if (
        name === user?.name &&
        image === user?.image &&
        phoneNumber === user?.phoneNumber
      ) {
        return { head: user, isChanged: false } as {
          head: UserType;
          isChanged: boolean;
        };
      }
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/edit-profile`,
        { token, name, phoneNumber, image }
      );

      return { head: data.head, isChanged: true } as {
        head: UserType;
        isChanged: true;
      };
    },
    onSuccess: async (data) => {
      if (data.isChanged) {
        await SecureStore.setItemAsync("user", JSON.stringify(data.head));
        setUser(data.head);
      }
      Alert.alert("Success", "Profile edited sucessfully", [
        {
          text: "Ok",
          onPress: router.back,
        },
      ]);
    },
  });
  return (
    <SafeView>
      <LoadingModal isVisible={isPending} />
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
          onPress={() => handleEditProfile()}
          disabled={isPending}
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
