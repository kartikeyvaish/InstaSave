import React from "react";
import { useTheme } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

function Icon({ IconName, Name, style, color, size, onPress }) {
  const { colors } = useTheme();

  const Props = {
    name: IconName,
    size: size ? size : 25,
    color: color ? color : colors.text,
    style: style,
    onPress: onPress,
  };

  if (Name === "MaterialCommunityIcons") {
    return <MaterialCommunityIcons {...Props} />;
  } else if (Name === "Ionicons") {
    return <Ionicons {...Props} />;
  } else if (Name === "FontAwesome") {
    return <FontAwesome {...Props} />;
  } else if (Name === "MaterialIcons") {
    return <MaterialIcons {...Props} />;
  } else if (Name === "AntDesign") {
    return <AntDesign {...Props} />;
  } else if (Name === "Entypo") {
    return <Entypo {...Props} />;
  } else if (Name === "Feather") {
    return <Feather {...Props} />;
  } else if (Name === "FontAwesome5") {
    return <FontAwesome5 {...Props} />;
  } else if (Name === "Octicons") {
    return <Octicons {...Props} />;
  } else {
    return null;
  }
}

export default Icon;
