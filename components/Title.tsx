import React, { memo } from "react";
import { Text } from "react-native";
import tw from "twrnc";

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text style={tw`text-sky-400 text-4xl text-center font-bold`}>
      {children}
    </Text>
  );
};

export default memo(Title);
