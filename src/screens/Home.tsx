import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoMeals from "../components/noMeals";
import MealPlan from "../components/MealPlan";
import WaterTracker from "../components/waterTracker";
import WrapperView from "../components/wrapperView";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/appNavigator";
import { useApp } from "../context/AppContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
  const [showSettings, setShowSettings] = useState(false);

  const navigation = useNavigation<NavigationProp>();
const {
  clearLocalData,
  kidProfile,
  todaysPlan,
} = useApp();



  return (
    <WrapperView>
      <View className="mt-4 border-1 mx-4  flex-row items-center">
        <View className="flex-1 ">
          <Text className="text-2xl font-bold text-blue-950">
            Hi {kidProfile?.name}
          </Text>

          <Text className="text-base text-slate-600 mt-1">
            {todaysPlan
              ? "Good food = big energy! 💪"
              : "Let's plan something healthy today ☀️"}
          </Text>
        </View>

        {/* Settings */}
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={() => setShowSettings(!showSettings)}
        >
          <Text className="text-2xl">⚙️</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showSettings}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSettings(false)}
      >
        <Pressable
          className="flex-1 bg-black/20"
          onPress={() => setShowSettings(false)}
        >
          <View className="absolute right-4 top-16 bg-white rounded-2xl w-52 shadow-lg">
            {/* Edit Profile */}
            <TouchableOpacity
              className="px-5 py-4 border-b border-slate-200"
              onPress={() => {
                setShowSettings(false);
                console.log("Edit Profile clicked");
                navigation.navigate("Profile");
              }}
            >
              <Text className="text-base font-semibold text-blue-950">
                ✏️ Edit Profile
              </Text>
            </TouchableOpacity>

            {/* Clear Local Data */}
            <TouchableOpacity
              className="px-5 py-4"
              onPress={() => {
                Alert.alert(
                  "Clear Local Data",
                  "Are you Sure you want to clear all Local Data",
                  [
                    {
                      text: "Yes",
                      onPress: async () => {
                        await clearLocalData();
                        setShowSettings(false);
                        navigation.navigate("Welcome");
                      },
                      style: "cancel",
                    },
                    {
                      text: "No",
                      onPress: () => {
                        console.log(
                          "Late we add all async storage will be clear",
                        );
                        setShowSettings(false);
                      },
                    },
                  ],
                );
              }}
            >
              <Text className="text-base font-semibold text-red-600">
                🗑️ Clear Local Data
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      {todaysPlan ? (
        <ScrollView>
          <MealPlan
          />
          <WaterTracker waterGlasses={todaysPlan?.water_goal_glasses} />
        </ScrollView>
      ) : (
        <NoMeals  />
      )}
    </WrapperView>
  );
};

export default Home;
