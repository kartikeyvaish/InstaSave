// Packages Imports
import { View, StyleSheet, Image, Pressable } from "react-native";
import { Checkbox } from "react-native-paper";

// Local Imports
import PostVideo from "./PostVideo";

// Helpers and Types
import ColorPallete from "../constants/ColorPallete";
import Layout from "../constants/Layout";
import { PostItemProps } from "../types/ComponentTypes";

const ScreenWidth = Layout.window.width;

// function component for PostItem
function PostItem(props: PostItemProps) {
  // Destructuring props
  const {
    uri,
    currentItem,
    is_video,
    id,
    selected,
    onCheckPress,
    showSelectIcon,
    isMuted = false,
    onItemPress,
  } = props;

  // render
  return (
    <Pressable style={styles.container} onPress={onItemPress}>
      {is_video ? (
        <PostVideo
          uri={uri}
          isPlaying={currentItem?.toString() === id?.toString() ? true : false}
          isMuted={isMuted}
        />
      ) : (
        <Image source={{ uri: uri }} style={styles.file} />
      )}

      {showSelectIcon ? (
        <View style={styles.checkBoxContainer}>
          <Checkbox
            status={selected?.findIndex(item => item.id === id) !== -1 ? "checked" : "unchecked"}
            color={ColorPallete.primary}
            onPress={onCheckPress}
            uncheckedColor={ColorPallete.gmailLogoColor}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

// exports
export default PostItem;

// styles
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenWidth,
  },
  file: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  checkBoxContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderBottomLeftRadius: 10,
  },
});
