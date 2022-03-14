// Packages Imports
import { useTheme } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

// Screen imports
import HomeScreen from "../screens/HomeScreen";
import NewDownloadScreen from "../screens/NewDownloadScreen";

// Types/components/Navigators imports
import { AppStackParamsList } from "./NavigationProps";

// Create a Stack Navigator
const Stack = createStackNavigator<AppStackParamsList>();

// Function for AppNavigator
function AppNavigator() {
  // get the theme
  const { colors } = useTheme();

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  // Render
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* App Screens */}
      <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
      <Stack.Screen
        name={"NewDownloadScreen"}
        component={NewDownloadScreen}
        options={{
          headerShown: true,
          headerTitle: "Post",
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Exporting AppNavigator
export default AppNavigator;
