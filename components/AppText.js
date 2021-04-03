import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

function AppText({
  Title,
  onPress,
  color,
  size,
  weight,
  family,
  style,
  HeaderPress,
  HeaderColor,
  Header,
  headerWeight,
  ellipsizeMode,
  numberOfLines,
  letterSpacing,
}) {
  const { dark, colors } = useTheme();

  return Header ? (
    <Text
      style={[
        {
          color: HeaderColor ? HeaderColor : colors.text,
          fontSize: size,
          fontWeight: headerWeight ? headerWeight : weight,
          fontFamily: family,
          letterSpacing: letterSpacing,
        },
        style,
      ]}
      onPress={HeaderPress}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
    >
      {Header}
      <Text
        style={[
          {
            color: color ? color : colors.text,
            fontSize: size,
            fontWeight: weight,
            fontFamily: family,
            letterSpacing: letterSpacing,
          },
          style,
        ]}
        onPress={onPress}
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
      >
        {Title}
      </Text>
    </Text>
  ) : (
    <Text
      style={[
        {
          color: color ? color : colors.text,
          fontSize: size,
          fontWeight: weight,
          fontFamily: family,
          letterSpacing: letterSpacing,
        },
        style,
      ]}
      onPress={onPress}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
    >
      {Title}
    </Text>
  );
}

export default AppText;

const styles = StyleSheet.create({
  container: {},
});
