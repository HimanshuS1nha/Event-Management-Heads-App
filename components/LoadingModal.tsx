import React, { memo } from "react";
import { Image, Modal, View } from "react-native";
import tw from "twrnc";

const LoadingModal = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <Modal transparent visible={isVisible}>
      <View style={tw`flex-1 items-center justify-center bg-black`}>
        <Image
          source={require("../assets/images/loading.gif")}
          style={tw`w-60 h-60`}
        />
      </View>
    </Modal>
  );
};

export default memo(LoadingModal);
