import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import DownloadingScreen from "../screens/DownloadingScreen";
import useCleaner from "../hooks/useCleaner";

const Stack = createStackNavigator();

function AppNavigator() {
  const { colors } = useTheme();

  useCleaner();

  const HeaderOptions = {
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
    headerTitleStyle: { fontFamily: "Inter" },
    headerShown: false,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Navigator screenOptions={HeaderOptions}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DownloadingScreen" component={DownloadingScreen} />
      </Stack.Navigator>
    </View>
  );
}

export default AppNavigator;
