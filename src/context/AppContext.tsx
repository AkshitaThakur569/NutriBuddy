import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateDietPlan } from "../services/gemini";

export type KidProfile = {
  name: string;
  age: number;
  height?: number;
  weight?: number;
  allergies: string;
  likedFood: string;
  dislikeFood: string;
};

export type TodaysPlan = {
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  water_goal_glasses: number;
};
export type MealChecks = {
  breakfast: boolean;
  lunch: boolean;
  snack: boolean;
  dinner: boolean;
  date: string;
};
export type WaterCount = {
  count: number;
  date: string;
};

type AppContextType = {
  hasProfile: boolean;
  isLoading: boolean;
  badges: string[];
  completedDays: string[];

  kidProfile: KidProfile | null;
  todaysPlan: TodaysPlan | null;
  mealChecks: MealChecks | null;
  waterCount: WaterCount | null;

  saveProfile: (profile: KidProfile) => Promise<void>;
  saveTodaysPlan: (plan: TodaysPlan) => Promise<void>;
  saveMealChecks: (checks: MealChecks) => Promise<void>;
  saveWaterCount: (water: WaterCount) => Promise<void>;
  saveBadges: (badges: string[]) => Promise<void>;
  saveCompletedDays: (days: string[]) => Promise<void>;

  clearLocalData: () => Promise<void>;
  generateMealPlan: () => Promise<TodaysPlan | null>;
  checkMealBadges: (meals: MealChecks) => Promise<void>;
  resetDailyData: () => Promise<void>;
  checkWaterBadge: (count: number, waterGoal: number) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [kidProfile, setKidProfile] = useState<KidProfile | null>(null);
  const [todaysPlan, setTodaysPlan] = useState<TodaysPlan | null>(null);
  const [mealChecks, setMealChecks] = useState<MealChecks | null>(null);
  const [waterCount, setWaterCount] = useState<WaterCount | null>(null);
  const [badges, setBadges] = useState<string[]>([]);
  const [completedDays, setCompletedDays] = useState<string[]>([]);

  const loadProfile = async () => {
    try {
      const storedData = await AsyncStorage.getItem("kidProfile");
      if (storedData) {
        const profile = JSON.parse(storedData);
        setKidProfile(profile);
        setHasProfile(true);
      } else {
        setHasProfile(false);
        setKidProfile(null);
      }
    } catch (error) {
      console.log("Oops, something went wrong:", error);
      setHasProfile(false);
      setKidProfile(null);
    } 
  };

  const loadTodaysPlan = async () => {
    try {
      const storedData = await AsyncStorage.getItem("todaysPlan");

      if (storedData) {
        const plan = JSON.parse(storedData);
        setTodaysPlan(plan);
      } else {
        setTodaysPlan(null);
      }
    } catch (error) {
      console.log("Error loading today's plan:", error);
      setTodaysPlan(null);
    }
  };
  const loadMealChecks = async () => {
    try {
      const storedData = await AsyncStorage.getItem("mealChecks");

      if (storedData) {
        const checks = JSON.parse(storedData);
        setMealChecks(checks);
      } else {
        setMealChecks(null);
      }
    } catch (error) {
      console.log("Error loading meal checks:", error);
      setMealChecks(null);
    }
  };
  const loadWaterCount = async () => {
    try {
      const storedData = await AsyncStorage.getItem("waterCount");

      if (storedData) {
        const water = JSON.parse(storedData);
        setWaterCount(water);
      } else {
        setWaterCount(null);
      }
    } catch (error) {
      console.log("Error loading water count:", error);
      setWaterCount(null);
    }
  };
  const loadBadges = async () => {
    try {
      const storedData = await AsyncStorage.getItem("badges");

      if (storedData) {
        const savedBadges = JSON.parse(storedData);
        setBadges(savedBadges);
      } else {
        setBadges([]);
      }
    } catch (error) {
      console.log("Error loading badges:", error);
      setBadges([]);
    }
  };

  const loadCompletedDays = async () => {
    try {
      const storedData = await AsyncStorage.getItem("completedDays");
      if (storedData) {
        const savedDays = JSON.parse(storedData);
        setCompletedDays(savedDays);
      } else {
        setCompletedDays([]);
      }
    } catch (error) {
      console.log("Error loading completed days:", error);
      setCompletedDays([]);
    }
  };

  const saveProfile = async (profile: KidProfile) => {
    await AsyncStorage.setItem("kidProfile", JSON.stringify(profile));
    setKidProfile(profile);
    setHasProfile(true);
  await resetDailyData();
  };
  const saveTodaysPlan = async (plan: TodaysPlan) => {
    await AsyncStorage.setItem("todaysPlan", JSON.stringify(plan));
    setTodaysPlan(plan);
  };

  const saveMealChecks = async (checks: MealChecks) => {
    await AsyncStorage.setItem("mealChecks", JSON.stringify(checks));
    setMealChecks(checks);
  };

  const saveWaterCount = async (water: WaterCount) => {
    await AsyncStorage.setItem("waterCount", JSON.stringify(water));
    setWaterCount(water);
  };
  const saveBadges = async (newBadges: string[]) => {
    await AsyncStorage.setItem("badges", JSON.stringify(newBadges));
    setBadges(newBadges);
  };

  const saveCompletedDays = async (days: string[]) => {
    await AsyncStorage.setItem("completedDays", JSON.stringify(days));
    setCompletedDays(days);
  };

  const generateMealPlan = async (): Promise<TodaysPlan | null> => {
    if (!kidProfile) {
      return null;
    }
    const plan = await generateDietPlan(kidProfile);
    if (!plan) {
      return null;
    }

    const today = new Date().toISOString().split("T")[0];

    const initialMealChecks: MealChecks = {
      breakfast: false,
      lunch: false,
      snack: false,
      dinner: false,
      date: today,
    };

    const initialWaterCount: WaterCount = {
      count: 0,
      date: today,
    };

    await saveTodaysPlan(plan);
    await saveMealChecks(initialMealChecks);
    await saveWaterCount(initialWaterCount);

    return plan;
  };

 const checkAndResetDailyData = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const storedData = await AsyncStorage.getItem("mealChecks");

    if (!storedData) {
      return;
    }
    const savedMealChecks: MealChecks = JSON.parse(storedData);

    if (savedMealChecks.date !== today) {
      console.log("New day detected. Resetting daily data...");
      await resetDailyData();
    }
  } catch (error) {
    console.error("Error checking daily data:", error);
  }
};

  const checkMealBadges = async (meals: MealChecks) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      let updatedCompletedDays = [...completedDays];
      let updatedBadges = [...badges];

      const allMealsCompleted =
        meals.breakfast && meals.lunch && meals.snack && meals.dinner;

      if (allMealsCompleted) {
        if (!updatedCompletedDays.includes(today)) {
          updatedCompletedDays.push(today);
        }

        if (!updatedBadges.includes("first_meal")) {
          updatedBadges.push("first_meal");
        }
      } else {
        updatedCompletedDays = updatedCompletedDays.filter(
          (day) => day !== today,
        );
      }

      let streak = 0;

      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const day = date.toISOString().split("T")[0];

        if (updatedCompletedDays.includes(day)) {
          streak++;
        } else {
          break;
        }
      }

      if (streak >= 3 && !updatedBadges.includes("three_day_streak")) {
        updatedBadges.push("three_day_streak");
      }

      if (streak >= 7 && !updatedBadges.includes("seven_day_streak")) {
        updatedBadges.push("seven_day_streak");
      }

      await saveCompletedDays(updatedCompletedDays);
      await saveBadges(updatedBadges);

    } catch (error) {
      console.log("Badge error:", error);
    }
  };

 const checkWaterBadge = async (count: number, waterGoal: number) => {
  try {
    if (count < waterGoal) {
      return;
    }

    const savedBadges = await AsyncStorage.getItem("badges");
    let badges = savedBadges ? JSON.parse(savedBadges) : [];

    if (!badges.includes("water_hero")) {
      badges.push("water_hero");

      await saveBadges(badges);
    }
  } catch (error) {
    console.log("Error saving water badge:", error);
  }
};

  const resetDailyData = async () => {
    await AsyncStorage.removeItem("mealChecks");
    await AsyncStorage.removeItem("todaysPlan");
    await AsyncStorage.removeItem("waterCount");

    setMealChecks(null);
    setTodaysPlan(null);
    setWaterCount(null);
  };

  const clearLocalData = async () => {
    await AsyncStorage.multiRemove([
      "kidProfile",
      "todaysPlan",
      "mealChecks",
      "waterCount",
      "completedDays",
      "badges",
    ]);
    setHasProfile(false);
    setKidProfile(null);
    setTodaysPlan(null);
    setMealChecks(null);
    setWaterCount(null);
    setBadges([]);
    setCompletedDays([]);
  };

  useEffect(() => {
    const initializeApp = async () => {
      await checkAndResetDailyData();

      await loadProfile();
      await loadTodaysPlan();
      await loadMealChecks();
      await loadWaterCount();
      await loadBadges();
      await loadCompletedDays();

      setIsLoading(false);
    };

    initializeApp();
  }, []);

  return (
    <AppContext.Provider
      value={{
        hasProfile,
        isLoading,

        kidProfile,
        todaysPlan,
        mealChecks,
        waterCount,
        badges,
        completedDays,

        saveProfile,
        saveTodaysPlan,
        saveMealChecks,
        saveWaterCount,
        saveBadges,
        saveCompletedDays,

        clearLocalData,
        generateMealPlan,
        checkMealBadges,
        resetDailyData,
        checkWaterBadge
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppContextProvider");
  }

  return context;
};
