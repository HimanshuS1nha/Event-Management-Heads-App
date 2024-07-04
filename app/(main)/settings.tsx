import { View, Text, ScrollView, Image, Pressable, Alert } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import SafeView from "@/components/SafeView";
import { useUser } from "@/hooks/useUser";
import Header from "@/components/Header";
import { UseMyEvent } from "@/hooks/useMyEvent";

const Settings = () => {
  const { user, setUser } = useUser();
  const { setMyEvent } = UseMyEvent();

  const handleLogout = useCallback(async () => {
    Alert.alert("Warning", "Do you want to logout?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: async () => {
          await SecureStore.deleteItemAsync("user");
          await SecureStore.deleteItemAsync("token");
          setUser(null);
          setMyEvent(null);
          router.replace("/login");
        },
      },
    ]);
  }, []);
  return (
    <SafeView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={tw`items-center gap-y-5 mt-3`}>
          <Image
            source={{
              uri: user?.image,
            }}
            style={tw`w-32 h-32 rounded-full`}
          />

          <View style={tw`gap-y-2 items-center`}>
            <Text style={tw`text-3xl text-white font-semibold`}>
              {user?.name}
            </Text>
            <Text style={tw`text-gray-300`}>Event Head</Text>
            <View style={tw`flex-row gap-x-3 items-center`}>
              <FontAwesome name="phone" size={18} color="gray" />
              <Text style={tw`text-gray-300`}>{user?.phoneNumber}</Text>
            </View>
          </View>
        </View>

        <View style={tw`mt-10 w-full gap-y-6`}>
          <Pressable
            style={tw`flex-row justify-between items-center px-4 bg-gray-700 py-4`}
            onPress={() => router.push("/edit-profile")}
          >
            <View style={tw`flex-row gap-x-5`}>
              <FontAwesome5 name="user-edit" size={24} color="white" />
              <Text style={tw`text-white text-base font-medium`}>
                Edit Profile
              </Text>
            </View>
            <AntDesign name="caretright" size={24} color="white" />
          </Pressable>
          <Pressable
            style={tw`flex-row justify-between items-center px-4 bg-gray-700 py-4`}
            onPress={() => router.push("/change-password")}
          >
            <View style={tw`flex-row gap-x-5`}>
              <Entypo name="lock" size={24} color="white" />
              <Text style={tw`text-white text-base font-medium`}>
                Change Password
              </Text>
            </View>
            <AntDesign name="caretright" size={24} color="white" />
          </Pressable>

          <Pressable
            style={tw`flex-row justify-between items-center px-4 bg-gray-700 py-4`}
            onPress={handleLogout}
          >
            <View style={tw`flex-row gap-x-5`}>
              <MaterialIcons name="logout" size={24} color="red" />
              <Text style={tw`text-rose-500 text-base font-medium`}>
                Logout
              </Text>
            </View>
            <AntDesign name="caretright" size={24} color="red" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Settings;
