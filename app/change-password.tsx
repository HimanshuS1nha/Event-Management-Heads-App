import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

import SafeView from "@/components/SafeView";
import Title from "@/components/Title";
import Header from "@/components/Header";
import LoadingModal from "@/components/LoadingModal";
import { changePasswordValidator } from "@/validators/change-password-validator";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = useCallback(
    (
      type: "oldPassword" | "newPassword" | "confirmPassword",
      value: string
    ) => {
      if (type === "oldPassword") {
        setOldPassword(value);
      } else if (type === "newPassword") {
        setNewPassword(value);
      } else if (type === "confirmPassword") {
        setConfirmPassword(value);
      }
    },
    []
  );

  const { mutate: handleChangePassword, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        throw new Error("Authenication failed. Please login again!");
      }

      const parsedData = await changePasswordValidator.parseAsync({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (parsedData.newPassword !== parsedData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/change-password/head`,
        { token, ...parsedData }
      );
      return data as { message: string };
    },
    onSuccess: (data) => {
      Alert.alert("Success", data.message, [
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-4`}
        keyboardShouldPersistTaps="handled"
      >
        <Header showBackButton />

        <Title>Change Password</Title>

        <View style={tw`gap-y-7 mt-10 items-center`}>
          <View style={tw`gap-y-3 w-[80%]`}>
            <Text style={tw`text-white font-medium text-base ml-1`}>
              Old Password
            </Text>
            <TextInput
              style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
              placeholder="Enter old password"
              placeholderTextColor={"#fff"}
              value={oldPassword}
              onChangeText={(text) => handleChange("oldPassword", text)}
              secureTextEntry
            />
          </View>
          <View style={tw`gap-y-3 w-[80%]`}>
            <Text style={tw`text-white font-medium text-base ml-1`}>
              New Password
            </Text>
            <TextInput
              style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
              placeholder="Enter new password"
              placeholderTextColor={"#fff"}
              value={newPassword}
              onChangeText={(text) => handleChange("newPassword", text)}
              secureTextEntry
            />
          </View>
          <View style={tw`gap-y-3 w-[80%]`}>
            <Text style={tw`text-white font-medium text-base ml-1`}>
              Confirm Password
            </Text>
            <TextInput
              style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
              placeholder="Confirm new password"
              placeholderTextColor={"#fff"}
              value={confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              secureTextEntry
            />
          </View>

          <Pressable
            style={tw`bg-violet-600 w-[80%] items-center py-3 justify-center rounded-lg`}
            onPress={() => handleChangePassword()}
            disabled={isPending}
          >
            <Text style={tw`text-white text-base font-semibold`}>
              Change Password
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default ChangePassword;
