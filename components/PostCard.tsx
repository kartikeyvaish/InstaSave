// Packages Imports
import { useState } from "react";
import { View, StyleSheet, FlatList, ToastAndroid } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedScrollHandler,
  useSharedValue,
  Layout as LT,
  withTiming,
} from "react-native-reanimated";
import { Checkbox } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

// Components imports
import AppButton from "./AppButton";
import AppContainer from "./AppContainer";
import AppText from "./AppText";
import NameAndLocationCard from "./NameAndLocationCard";
import PostItem from "./PostItem";

// Helpers
import ColorPallete from "../constants/ColorPallete";
import DotIndicators from "./DotIndicators";
import { get_username } from "../helper/helper";
import Layout from "../constants/Layout";
import { PostCardProps, PostProps } from "../types/ComponentTypes";
import ProgressBar from "./ProgressBar";
import useFlatlist from "./../hooks/useFlatlist";

// Create Animated Flatlist
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

export interface DownloadFileItem {
  uri: string;
  id: string;
  name: string;
}

// Constans
const ScreenWidth = Layout.window.width;

// function component for PostCard
function PostCard(props: PostCardProps) {
  // Destructuring props
  const { owner, coauthor_producers, location, posts } = props;
  const scrollX = useSharedValue(0);
  const downloadProgress = useSharedValue(0);

  // permission hook
  const [status, requestPermission] = MediaLibrary.usePermissions();

  // Get name to be displayed
  const nameToDisplay = get_username(owner?.username, coauthor_producers);

  // Local States
  const [Muted, SetMuted] = useState(false);
  const [SelectedPosts, SetSelectedPosts] = useState<Array<PostProps>>(posts);
  const [DownLoading, SetDownLoading] = useState(false);
  const [DownloadingText, SetDownloadingText] = useState("Download Files");

  // custom hooks
  const { FlatlistRef, ViewableItem, onViewRef, viewConfigRef } = useFlatlist();

  const onScroll = useAnimatedScrollHandler(event => {
    try {
      scrollX.value = event.contentOffset.x;
    } catch (error) {}
  });

  // onTogglepress
  const onCheckBoxPress = (post: PostProps) => {
    // If item is not present in SelectedPosts, then add it
    // Otherwise remove it
    const index = SelectedPosts.findIndex(item => item.id === post.id);

    if (index === -1) {
      SetSelectedPosts([...SelectedPosts, post]);
    } else {
      SetSelectedPosts(SelectedPosts.filter(item => item.id !== post.id));
    }
  };

  // function to download a particular file
  const DownloadFile = async (item: DownloadFileItem) => {
    try {
      const downloadInstance = FileSystem.createDownloadResumable(
        item.uri,
        FileSystem.documentDirectory + item.name
      );

      const downloaded_response = await downloadInstance.downloadAsync();

      if (downloaded_response?.uri)
        return {
          local_uri: downloaded_response.uri,
        };

      return null;
    } catch (error) {
      return null;
    }
  };

  // function to save a file to InstaSave folder
  const SaveFile = async (uri: string) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);

      const album = await MediaLibrary.getAlbumAsync("InstaSave");

      if (album == null) await MediaLibrary.createAlbumAsync("InstaSave", asset, false);
      else await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    } catch (error) {}
  };

  // download selected posts
  const DownloadPost = async () => {
    downloadProgress.value = 0;

    try {
      if (!status?.granted) {
        await requestPermission();
        return;
      }

      // Take out all the uri from SelectedPosts
      const files: any = SelectedPosts.map(post => ({
        uri: post.uri,
        id: post.id,
        name: post.is_video ? `${post.id}.mp4` : `${post.id}.jpg`,
      }));

      // If no files are selected then show toast
      if (files.length === 0) {
        ToastAndroid.show("No files selected", ToastAndroid.LONG);
        return;
      }

      SetDownLoading(true);

      // Download all files
      for (let i = 0; i < files.length; i++) {
        SetDownloadingText(`Downloading ${i + 1} of ${files.length}`);
        const file_download = await DownloadFile(files[i]);
        if (file_download) await SaveFile(file_download?.local_uri);
        downloadProgress.value = withTiming(((i + 1) / files.length) * 100);
      }

      SetDownloadingText(`Download Files`);
      SetDownLoading(false);

      ToastAndroid.show("Saved Selected Files successfully", 5000);
    } catch (error) {
      SetDownloadingText(`Download Files`);
      SetDownLoading(false);
    }
  };

  // render
  return (
    <AppContainer>
      <NameAndLocationCard
        name={nameToDisplay}
        profile_picture={owner.profile_pic_url}
        location={location}
        is_verified={owner?.is_verified}
      />

      <View style={{ width: ScreenWidth, height: ScreenWidth, marginBottom: 10 }}>
        <AnimatedFlatlist
          ref={FlatlistRef}
          data={posts}
          keyExtractor={(item: any, index: number) => item.id?.toString() || index.toString()}
          renderItem={({ item }: any) => (
            <PostItem
              {...item}
              selected={SelectedPosts}
              onCheckPress={() => onCheckBoxPress(item)}
              showSelectIcon={posts.length > 1}
              currentItem={ViewableItem}
              isMuted={Muted}
              onItemPress={() => SetMuted(!Muted)}
            />
          )}
          onScroll={onScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef}
        />
      </View>

      <View style={{ flex: 1 }}>
        {posts.length > 1 ? <DotIndicators posts={posts} scrollX={scrollX} /> : null}

        {!DownLoading ? (
          <Animated.View entering={FadeIn} exiting={FadeOut} layout={LT}>
            {posts.length > 1 ? (
              <View style={styles.selectAllContainer}>
                <AppText text="Select All" size={20} />

                <Checkbox
                  status={SelectedPosts.length === posts.length ? "checked" : "unchecked"}
                  onPress={() =>
                    SetSelectedPosts(SelectedPosts.length === posts.length ? [] : posts)
                  }
                />
              </View>
            ) : null}

            {posts.length > 1 ? (
              <AppText
                text={`${SelectedPosts.length}/${posts.length} selected`}
                marginLeft={15}
                size={18}
              />
            ) : null}
          </Animated.View>
        ) : null}

        {DownLoading ? <ProgressBar progress={downloadProgress} /> : null}

        <Animated.View entering={FadeIn} exiting={FadeOut} layout={LT}>
          <AppButton
            title={DownloadingText}
            roundness={100}
            margin={20}
            onPress={DownloadPost}
            backgroundColor={ColorPallete.primary}
            loading={DownLoading}
          />
        </Animated.View>
      </View>
    </AppContainer>
  );
}

// exports
export default PostCard;

// styles
const styles = StyleSheet.create({
  selectAllContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 0,
  },
});
