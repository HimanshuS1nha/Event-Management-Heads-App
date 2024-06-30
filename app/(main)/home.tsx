import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

import SafeView from "@/components/SafeView";

const Home = () => {
  return (
    <SafeView>
      <Text style={tw`text-white`}>Home</Text>
    </SafeView>
  );
};

export default Home;
