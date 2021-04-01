import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";
import Card from "./Card";
import ColorPallete from "../config/ColorPallete";

function AppButton({
  style,
  Active = false,
  backgroundColor = ColorPallete.primary,
  onPress,
  Title,
  marginTop,
  marginBottom,
}) {
  return (
    <Card
      style={[
        styles.container,
        style,
        {
          opacity: Active ? 1 : 0.5,
          marginTop: marginTop,
          marginBottom: marginBottom,
        },
      ]}
      backgroundColor={backgroundColor}
      onPress={Active ? onPress : null}
    >
      <AppText Title={Title} color="white" size={20} />
    </Card>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
