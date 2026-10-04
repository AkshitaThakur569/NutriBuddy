import { View, Text } from "react-native";
import React from "react";
import { useApp } from "../context/AppContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import WrapperView from "../components/wrapperView";

const Badge = () => {

   const { badges } = useApp();


  const isEarned = (badgeId: string) => {
    return badges.includes(badgeId);
  };

  return (
    <WrapperView>
      <View className="p-4">
        <View className="mt-8 self-center">
          <Text className="text-3xl font-bold text-gray-900 text-center">
            My Badges 🏆
          </Text>

          <Text className="text-gray-500 mt-1 text-base">
            Keep eating, drinking and building your streak!
          </Text>
        </View>

        <View className="flex-row flex-wrap justify-between mt-8">
          <View className="w-[48%] bg-yellow-50 border-1 border-yellow-900 rounded-3xl p-5 mb-4 items-center">
            <View className="w-20 h-20 rounded-full bg-yellow-100 items-center justify-center mb-4">
              <Ionicons name="restaurant" size={38} color="#F59E0B" />
            </View>

            <Text className="text-lg font-bold text-gray-900 text-center">
              First Meal
            </Text>

            <Text className="text-gray-500 text-sm text-center mt-1">
              Complete your first meal
            </Text>

            <View
              className={`mt-3 px-3 py-1 rounded-full ${
                isEarned("first_meal") ? "bg-yellow-400" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  isEarned("first_meal") ? "text-white" : "text-gray-500"
                }`}
              >
                {isEarned("first_meal") ? "EARNED" : "LOCKED"}
              </Text>
            </View>
          </View>

          {/* 3 Day Streak */}
          <View className="w-[48%] bg-orange-50 rounded-3xl p-5 mb-4 items-center">
            <View className="w-20 h-20 rounded-full bg-orange-100 items-center justify-center mb-4">
              <Ionicons name="flame" size={40} color="#F97316" />
            </View>

            <Text className="text-lg font-bold text-gray-900 text-center">
              3-Day Streak
            </Text>

            <Text className="text-gray-500 text-sm text-center mt-1">
              Complete all meals for 3 days
            </Text>

            <View
              className={`mt-3 px-3 py-1 rounded-full ${
                isEarned("three_day_streak") ? "bg-orange-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  isEarned("three_day_streak") ? "text-white" : "text-gray-500"
                }`}
              >
                {isEarned("three_day_streak") ? "EARNED" : "LOCKED"}
              </Text>
            </View>
          </View>

          {/* 7 Day Streak */}
          <View className="w-[48%] bg-purple-50 rounded-3xl p-5 mb-4 items-center">
            <View className="w-20 h-20 rounded-full bg-purple-100 items-center justify-center mb-4">
              <Ionicons name="trophy" size={38} color="#8B5CF6" />
            </View>

            <Text className="text-lg font-bold text-gray-900 text-center">
              7-Day Streak
            </Text>

            <Text className="text-gray-500 text-sm text-center mt-1">
              Complete all meals for 7 days
            </Text>

            <View
              className={`mt-3 px-3 py-1 rounded-full ${
                isEarned("seven_day_streak") ? "bg-purple-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  isEarned("seven_day_streak") ? "text-white" : "text-gray-500"
                }`}
              >
                {isEarned("seven_day_streak") ? "EARNED" : "LOCKED"}
              </Text>
            </View>
          </View>

          {/* Water Hero */}
          <View className="w-[48%] bg-blue-50 rounded-3xl p-5 mb-4 items-center">
            <View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-4">
              <Ionicons name="water" size={40} color="#3B82F6" />
            </View>

            <Text className="text-lg font-bold text-gray-900 text-center">
              Water Hero
            </Text>

            <Text className="text-gray-500 text-sm text-center mt-1">
              Reach your daily water goal
            </Text>

            <View
              className={`mt-3 px-3 py-1 rounded-full ${
                isEarned("water_hero") ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  isEarned("water_hero") ? "text-white" : "text-gray-500"
                }`}
              >
                {isEarned("water_hero") ? "EARNED" : "LOCKED"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </WrapperView>
  );
};

export default Badge;
