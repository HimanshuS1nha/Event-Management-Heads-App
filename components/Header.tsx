import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { memo } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const Header = ({ showBackButton = false }: { showBackButton?: boolean }) => {
  return (
    <View style={tw`flex-row justify-between items-center my-4 px-4`}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={20} color="white" />
        </TouchableOpacity>
      ) : (
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/f6/db/9b/f6db9b785d37c154c2be26b7c32604b6.jpg",
          }}
          style={tw`w-10 h-10 rounded-full`}
        />
      )}
    </View>
  );
};

export default memo(Header);
