// Packages Imports
import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

// Local Imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import { MenuCardProps } from "../types/ComponentTypes";

// function component for MenuCard
function MenuCard(props: MenuCardProps) {
  // Destructuring props
  const { containerStyle, onPress, icon, ...otherProps } = props;

  const finalcontainerStyle: StyleProp<ViewStyle> = [styles.container, containerStyle];

  // render
  return (
    <TouchableRipple style={finalcontainerStyle} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AppIcon marginRight={20} size={30} {...icon} />
        <AppText size={20} {...otherProps} />
      </View>
    </TouchableRipple>
  );
}

// exports
export default MenuCard;

// styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
