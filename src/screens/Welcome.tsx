
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/appNavigator";
import WrapperView from "../components/wrapperView";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate("Profile");
  };

  return (
    <WrapperView >
      <View className="flex-1  px-6">
        <View className="flex-1 items-center justify-center">
         
          <Image
            source={require("../../assets/logo.png")}
            className="h-72 w-72"
            resizeMode="contain"
          />

         
          <Text className="mt-2 text-center text-3xl font-semibold px-12 text-[#527C78]">
            Your little buddy
          </Text>
          <Text className="mt-2 text-center ml-8 text-3xl font-semibold px-12 text-[#527C78] ">
            for healthy eating 🥕
          </Text>
        </View>

      
        <View className="w-full pb-20">
         
          <Text className="mb-5 px-3 text-center text-sm leading-[18px] text-[#607A78]">
            This app gives general food suggestions and is not a substitute for
            advice from a pediatrician or registered dietitian.
          </Text>

         
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGetStarted}
            className="h-14 flex-row items-center justify-center rounded-[18px] bg-[#5FAFA5] shadow-md"
          >
            <Text className="text-[17px] font-bold tracking-wide text-white">
              Get Started
            </Text>

            <Text className="ml-2 mb-2 text-[22px] text-white">→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperView>
  );
}
