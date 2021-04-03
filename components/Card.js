import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";

function Card({ children, style, backgroundColor, borderColor, onPress }) {
  const { dark, colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.background,
          borderColor: borderColor ? borderColor : colors.text,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <TouchableRipple
        onPress={onPress}
        rippleColor="rgba(0, 0, 0, .1)"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>{children}</>
      </TouchableRipple>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({});
