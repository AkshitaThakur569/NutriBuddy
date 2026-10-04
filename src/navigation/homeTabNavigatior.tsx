import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "../screens/Home";
import Badge from "../screens/Badge";

export type MainTabParamList = {
  Home: undefined;
  Badges: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-sharp"}
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
          tabBarActiveTintColor: "blue",
        }}
      />

      <Tab.Screen
        name="Badges"
        component={Badge}
        options={{
          headerShown: false,
          title: "Badges",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "trophy" : "trophy-sharp"}
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
          tabBarActiveTintColor: "blue",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
