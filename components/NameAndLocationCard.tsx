// Packages Imports
import { View, StyleSheet, Image } from "react-native";

// Component/Types imports
import AppText from "./AppText";
import AppIcon from "./AppIcon";
import ColorPallete from "../constants/ColorPallete";
import IconNames from "../constants/IconNames";
import { NameAndLocationProps } from "../types/ComponentTypes";

// function component for NameAndLocationCard
function NameAndLocationCard(props: NameAndLocationProps) {
  // Destructuring props
  const { name, location, profile_picture, is_verified } = props;

  // render
  return (
    <View style={[styles.container]}>
      {profile_picture ? (
        <View style={styles.innerContainer}>
          <Image source={{ uri: profile_picture }} style={styles.image} />
        </View>
      ) : null}

      <View style={styles.innerContainer}>
        {name ? <AppText text={name} size={15} style={{ fontWeight: "bold" }} /> : null}

        {location ? <AppText text={location} size={13} /> : null}
      </View>

      {is_verified ? (
        <View style={styles.menuIcon}>
          <AppIcon
            name="verified"
            family={IconNames.MaterialIcons}
            size={20}
            color={ColorPallete.dodgerBlue}
          />
        </View>
      ) : null}
    </View>
  );
}

// exports
export default NameAndLocationCard;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: { width: 30, height: 30, borderRadius: 30 },
  innerContainer: { marginLeft: 20 },
  menuIcon: {
    flex: 1,
    flexDirection: "row-reverse",
    height: "100%",
    alignItems: "center",
    paddingLeft: 15,
  },
});
