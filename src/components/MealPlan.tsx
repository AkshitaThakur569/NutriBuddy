import {  useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useApp , MealChecks } from "../context/AppContext";


type MealPlanData = {
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  water_goal_glasses: number;
};

type MealPlanProps = {
  plan: MealPlanData;
};

const MealPlan = () => {
  const [loading, setLoading] = useState(false);
  const { generateMealPlan, mealChecks, saveMealChecks , checkMealBadges , todaysPlan} = useApp();

  const regenerateMealPlan = async () => {
    try {
      setLoading(true);
      const newPlan = await generateMealPlan();
      if (!newPlan) {
        return;
      }
    } catch (error) {
      console.log("Error regenerating meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMeal = async (meal: keyof Omit<MealChecks, "date">) => {
    try {
      const updatedMealChecks:MealChecks = {
        ...(mealChecks ?? {
          breakfast: false,
          lunch: false,
          snack: false,
          dinner: false,
          date: getToday(),
        }),
         [meal]: !(mealChecks?.[meal] ?? false),
         date:getToday()
      };
      await saveMealChecks(updatedMealChecks);
      await checkMealBadges(updatedMealChecks);
    } catch (error) {
      console.log("The error in Toggle Meal is", error);
    }
  };


  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };


  const meals = [
    {
      id: "breakfast" as const,
      title: "Breakfast",
      emoji: "🥞",
      value: todaysPlan?.breakfast,
      bg: "bg-yellow-50",
      border: "border-[#FFD978]",
    },
    {
      id: "lunch" as const,
      title: "Lunch",
      emoji: "🍱",
      value: todaysPlan?.lunch,
      bg: "bg-green-50",
      border: "border-[#A9DFC6]",
    },
    {
      id: "snack" as const,
      title: "Snack",
      emoji: "🥨",
      value: todaysPlan?.snack,
      bg: "bg-red-50",
      border: "border-[#F2B5CC]",
    },
    {
      id: "dinner" as const,
      title: "Dinner",
      emoji: "🍝",
      value: todaysPlan?.dinner,
      bg: "bg-purple-100",
      border: "border-purple-300",
    },
  ];
  return (
    <View className="px-5 mt-10">
      {meals.map((item) => {
        const isCompleted = mealChecks?.[item.id] ?? false;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggleMeal(item.id)}
            className={`${item.bg} rounded-3xl mb-4 border ${item.border} overflow-hidden`}
          >
            <View className="p-4">
              <View className="flex-row items-center">
                <View
                  className={`w-16 h-16  rounded-2xl items-center justify-center mr-4`}
                >
                  <Text className="text-3xl">{item.emoji}</Text>
                </View>
                <View className="flex-1 pr-4">
                  <Text className="text-sm font-semibold text-slate-500">
                    {item.title}
                  </Text>

                  <Text
                    className={`text-base font-bold mt-1 ${
                      isCompleted
                        ? "text-slate-400 line-through"
                        : "text-blue-950"
                    }`}
                  >
                    {item.value}
                  </Text>
                </View>

                {/* Checkbox */}
                <View
                  className={`w-7 h-7 rounded-lg border-2 items-center justify-center ${
                    isCompleted
                      ? "bg-green-500 border-green-500"
                      : "bg-white border-slate-300"
                  }`}
                >
                  {isCompleted && (
                    <Text className="text-white font-bold">✓</Text>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={regenerateMealPlan}
        className="bg-blue-900 rounded-full py-3 w-2/3  self-center items-center"
      >
        <Text className="text-white text-lg font-semibold">
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            "Regenerate Meal Plan ✨"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MealPlan;
