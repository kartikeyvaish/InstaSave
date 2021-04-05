import { useEffect } from "react";
import * as FileSystem from "expo-file-system";

export default useCleaner = () => {
  useEffect(() => {
    ClearCache();
    return () => {};
  }, []);

  const DeleteFolder = async (uri) => {
    try {
      const result = await FileSystem.deleteAsync(uri, {
        idempotent: true,
      });
    } catch (error) {}
  };

  const ClearCache = async () => {
    try {
      const CacheDir = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory
      );
      const DocuDir = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );

      for (let i = 0; i < CacheDir.length; i++) {
        if (CacheDir[i].endsWith(".mp4") || CacheDir[i].endsWith(".jpg")) {
          DeleteFolder(FileSystem.cacheDirectory + CacheDir[i]);
        }
      }
      for (let i = 0; i < DocuDir.length; i++) {
        DeleteFolder(FileSystem.documentDirectory + DocuDir[i]);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
