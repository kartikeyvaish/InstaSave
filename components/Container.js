import React from "react";
import { View, StyleSheet, StatusBar as SB } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useTheme } from "@react-navigation/native";

function Container({ children, style }) {
  const { dark, colors } = useTheme();
  return (
    <>
      <StatusBar style={dark ? "light" : "dark"} />
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
          style,
        ]}
      >
        {children}
      </View>
    </>
  );
}

export default Container;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: SB.currentHeight },
});
