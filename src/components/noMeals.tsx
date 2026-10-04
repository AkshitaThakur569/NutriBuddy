import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { useApp } from "../context/AppContext";



const NoMeals = () => {
  const {  generateMealPlan } =useApp();
  const [loading, setLoading] = useState(false);

  const genearteMealPlan = async () => {
   try {
    setLoading(true);

    const Plan = await generateMealPlan();

    if (!Plan) {return}

  } catch (error) {
    console.error("ACTUAL ERROR:", error);
    Alert.alert("Oops, let's try again! 🥕", "We couldn't create your meal plan right now. Please try again.");
  } finally {
    setLoading(false);
  }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require("../../assets/a-removebg-preview.png")}
        className="h-56 w-56"
      />
      <View className="px-12">
        <Text className="text-3xl text-center font-semibold text-blue-900 ">
          No Meal Plan for Today
        </Text>
        <Text className="text-lg text-blue-950 text-center mt-4">
          We will create a personalized meal plan based on your child's profile.
          Just hit the button below !!
        </Text>
      </View>
      <TouchableOpacity
        className="bg-blue-900 px-6 py-3 rounded-full mt-4"
        onPress={genearteMealPlan}
      >
        {loading ? (
          <View className="flex-row items-center">
            <ActivityIndicator color="white" />
          </View>
        ) : (
          <Text className="text-xl text-white font-semibold">
            Generate Meal Plan ✨
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NoMeals;
