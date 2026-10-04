import { View, Text, Pressable } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useApp, WaterCount } from "../context/AppContext";

interface WaterProps {
  waterGlasses: number;
}
const WaterTracker: React.FC<WaterProps> = ({ waterGlasses }) => {

  const { waterCount, saveWaterCount , checkWaterBadge } = useApp();
  const count = waterCount?.count ?? 0;


const addWater = async () => {
  if (!waterCount) {
    return;
  }

  if (waterCount.count >= waterGlasses) {
    return;
  }

  const newCount = waterCount.count + 1;

  const newWaterCount: WaterCount = {
    ...waterCount,
    count: newCount,
  };

  try {
    await saveWaterCount(newWaterCount);
    await checkWaterBadge(newCount , waterGlasses);
  } catch (error) {
    console.log("Error saving water count:", error);
  }
};
  return (
    <View className="mx-5 mt-6 rounded-3xl bg-sky-50 p-5">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-sky-200">
            <Text className="text-2xl">💧</Text>
          </View>

          <View>
            <Text className="text-lg font-bold text-slate-800">
              Water tracker
            </Text>

            <Text className="text-sm text-slate-500">Keep going!</Text>
          </View>
        </View>

        <Text className="font-semibold text-sky-500">
          {count} / {waterGlasses}
        </Text>
      </View>

      {/* Glasses */}
      <View className="mt-5 flex-row justify-between">
        {Array.from({ length: waterGlasses }).map((_, index) => {
          const filled = index < count;

          return (
            <FontAwesome6
              key={index}
              name="glass-water"
              size={28}
              color={filled ? "#38BDF8" : "#000000"}
            />
          );
        })}
      </View>

      {/* Add Water */}
      <Pressable
        onPress={addWater}
        disabled={count >= waterGlasses}
        className={`mt-5 h-12 items-center justify-center rounded-2xl ${
         count >= waterGlasses ? "bg-slate-300" : "bg-sky-400"
        }`}
      >
        <Text className="text-base font-bold text-white">
          {count >= waterGlasses
            ? "Goal complete 🎉"
            : "+ Add glass"}
        </Text>
      </Pressable>

      {/* Count */}
      <Text className="mt-3 text-center text-sm text-slate-500">
        {count} / {waterGlasses} glasses
      </Text>
    </View>
  );
};

export default WaterTracker;
