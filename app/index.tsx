import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Text, Image, ActivityIndicator } from "react-native";
import tw from "twrnc";

import SafeView from "@/components/SafeView";
import { useUser } from "@/hooks/useUser";

export default function Index() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();
  useEffect(() => {
    if (rootNavigationState?.key) {
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [rootNavigationState?.key]);
  return (
    <SafeView style={tw`justify-center items-center gap-y-7`}>
      <Image
        source={require("../assets/images/logo.webp")}
        style={tw`w-32 h-32 rounded-full`}
      />
      <Text style={tw`text-white text-2xl font-medium`}>
        Event Management Head App
      </Text>

      <ActivityIndicator size={45} color={"violet"} />
    </SafeView>
  );
}
