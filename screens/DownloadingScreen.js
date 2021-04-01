import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import API from "../api/API";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Container from "../components/Container";
import PostTopBar from "../components/PostTopBar";
import Preview from "../components/Preview";
import ProgressBar from "../components/ProgressBar";
import TopBar from "../components/TopBar";
import AppConfiguration from "../config/AppConfiguration";
import Toast from "../components/Toast";
import ColorPallete from "../config/ColorPallete";
import { useBackHandler } from "../hooks/useBackHandler";

function DownloadingScreen({ route }) {
  const [File, SetFile] = useState(null);
  const [Status, SetStatus] = useState("Stop");
  const [LoadingText, SetLoadingText] = useState("Fetching Post...");
  const [Progress, SetProgress] = useState(0);

  useEffect(() => {
    GetMediaData();

    return () => {};
  }, []);

  useBackHandler(() => {
    if (Status === "Start") {
      ToastAndroid.show("Download is in Progress cannot go back!", 3000);
      return true;
    }
    return false;
  });

  const GetMediaData = async () => {
    try {
      SetLoadingText("Fetching Post...");
      let s = route.params.Link.replace(AppConfiguration.BaseURL, "");
      let endpoint = s.split("/")[0] + "/" + s.split("/")[1] + "/?__a=1";
      const response = await API.GetMediaData(endpoint);
      if (response.ok) {
        SetFile(response.data.graphql.shortcode_media);
      } else {
        SetLoadingText("Unable to get Post Details");
      }
    } catch (error) {
      SetLoadingText("Unable to get Post Details");
    }
  };

  const DownloadStatus = ({ totalBytesExpectedToWrite, totalBytesWritten }) => {
    SetProgress(
      (totalBytesWritten / totalBytesExpectedToWrite).toFixed(1) * 100
    );
  };

  const SaveToGallery = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      if (File.__typename === "GraphSidecar") {
        try {
          let arr = File.edge_sidecar_to_children.edges;
          for (let i = 0; i < arr.length; i++) {
            SetStatus("Start");
            let uri = "";
            let name =
              arr[i].node.shortcode.toString() +
              "_" +
              arr[i].node.id.toString();
            if (arr[i].node.is_video) {
              name += ".mp4";
              uri = arr[i].node.video_url;
            } else {
              name += ".jpg";
              uri = arr[i].node.display_url;
            }
            const result = FileSystem.createDownloadResumable(
              uri,
              FileSystem.cacheDirectory + name
            );
            let response = await result.downloadAsync();
            if (response.status === 200) {
              SetProgress((100 / arr.length) * (i + 1));
              const asset = await MediaLibrary.createAssetAsync(response.uri);
              MediaLibrary.createAlbumAsync("InstaSave", asset, false)
                .then(() => {})
                .catch(() => {});
            }
          }
          Toast.show("Saved in Gallery", "success");
          SetStatus("Stop");
        } catch (error) {}
      } else {
        let uri = "";
        let name = File.shortcode.toString() + "_" + File.id.toString();
        if (File.is_video) {
          name += ".mp4";
          uri = File.video_url;
        } else {
          name += ".jpg";
          uri = File.display_url;
        }
        const permission = await MediaLibrary.requestPermissionsAsync();
        SetStatus("Start");
        try {
          const result = FileSystem.createDownloadResumable(
            uri,
            FileSystem.cacheDirectory + name,
            {},
            DownloadStatus
          );
          const response = await result.downloadAsync();
          if (response.status === 200) {
            const asset = await MediaLibrary.createAssetAsync(response.uri);
            MediaLibrary.createAlbumAsync("InstaSave", asset, false)
              .then(() => {
                SetStatus("Stop");
                Toast.show("Saved in Gallery", "success");
                SetProgress(0);
              })
              .catch(() => {
                SetStatus("Stop");
                Toast.show("Error In Saving File");
                SetProgress(0);
              });
          } else {
            SetStatus("Stop");
            Toast.show("Error In Saving File");
            SetProgress(0);
          }
        } catch (error) {
          SetStatus("Stop");
          Toast.show("Error In Saving File");
          SetProgress(0);
        }
      }
    } else {
      Toast.show("Need Storage Permission to save File");
    }
  };

  return (
    <Container>
      <TopBar Name="Download" />
      <View style={styles.container}>
        {File ? (
          <>
            <PostTopBar
              uri={File.owner.profile_pic_url}
              Name={File.owner.username}
              Verified={File.owner.is_verified}
            />

            <Preview uri={File.display_url} />

            {Status !== "Stop" ? (
              <>
                <ProgressBar Percent={Progress} />
                <ActivityIndicator
                  size={60}
                  color={ColorPallete.primary}
                  style={{ marginTop: 10 }}
                />
              </>
            ) : null}

            <AppButton
              Title={
                Status === "Start" ? "Downloading..." : "Download and Save"
              }
              Active={Status === "Stop" ? true : false}
              onPress={() => SaveToGallery()}
              marginTop={10}
              marginBottom={10}
            />
          </>
        ) : (
          <>
            <AppText
              Title={LoadingText}
              size={20}
              family="MuliBold"
              style={{ paddingLeft: 10, paddingTop: 10 }}
            />
            {LoadingText === "Unable to get Post Details" ? (
              <AppButton
                Title="Retry"
                marginTop={10}
                marginBottom={10}
                style={{ height: 50 }}
                Active={true}
                onPress={() => GetMediaData()}
              />
            ) : null}
          </>
        )}
      </View>
    </Container>
  );
}

export default DownloadingScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  ProfilePicture: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 20,
  },
});
