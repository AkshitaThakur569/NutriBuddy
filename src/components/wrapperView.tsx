import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";

interface WrapperViewProps {
  children: React.ReactNode;
}
const WrapperView: React.FC<WrapperViewProps> = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 bg-[#EAF7F5] ">
      <View className="absolute -top-24 -left-14 h-64 w-64 rounded-full bg-[#FFF4D6]" />
      <View className="absolute -bottom-32 -right-28 h-72 w-72 rounded-full bg-[#d5f1e4]" />
      <View className="absolute h-56 w-56  bg-[#FDEAF1]  top-32 -right-16 rounded-full " />
      <View className="absolute h-56 w-56  bg-[#dfe9fa] bottom-40 -left-20 rounded-full " />
      {children}
    </SafeAreaView>
  );
};

export default WrapperView;
