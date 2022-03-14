// Packages Imports
import { Video } from "expo-av";
import { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";

// local imports
import AppIcon from "./AppIcon";
import ColorPallete from "../constants/ColorPallete";
import IconNames from "../constants/IconNames";
import { PostVideoProps } from "../types/ComponentTypes";

// function component for PostVideo
function PostVideo(props: PostVideoProps) {
  // Destructuring props
  const { uri, isPlaying, isMuted } = props;

  const VideoPlayerRef = useRef<Video>(null);

  // Pause the video if isPLaying is false
  useEffect(() => {
    if (isPlaying) {
      VideoPlayerRef.current?.playAsync();
    } else {
      VideoPlayerRef.current?.pauseAsync();
    }
  }, [isPlaying, isMuted, uri]);

  // render
  return uri ? (
    <>
      <Video
        ref={VideoPlayerRef}
        source={{ uri: uri }}
        style={styles.file}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted={isMuted}
      />

      <View style={styles.muteContainer}>
        <AppIcon
          family={IconNames.Feather}
          name={isMuted ? "volume-x" : "volume-2"}
          color={ColorPallete.white}
          size={15}
        />
      </View>
    </>
  ) : null;
}

// exports
export default PostVideo;

// styles
const styles = StyleSheet.create({
  file: {
    width: "100%",
    height: "100%",
  },
  muteContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 8,
    borderRadius: 100,
  },
});
