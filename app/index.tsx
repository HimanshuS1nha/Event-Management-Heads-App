import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => router.replace("/home"), 300);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
