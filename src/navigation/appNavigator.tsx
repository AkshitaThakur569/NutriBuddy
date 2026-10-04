import { createNativeStackNavigator } from "@react-navigation/native-stack";
import homeTabNavigator from "./homeTabNavigatior";
import Welcome from "../screens/Welcome";
import Profile from "../screens/Profile";
import { useApp } from "../context/AppContext";

export type RootStackParamList = {
  HomeScreen: undefined;
  Welcome: undefined;
  Profile: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {


  const { hasProfile, isLoading } = useApp();

  if(isLoading){
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={hasProfile ? 'HomeScreen' : 'Welcome'}>
      <Stack.Screen
        name="HomeScreen"
        component={homeTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
