// Packages Imports
import { StackScreenProps } from "@react-navigation/stack";
import { PostCardProps } from "../types/ComponentTypes";

// App Navigator Screen Params
export type AppStackParamsList = {
    // App Stack Screens
    HomeScreen: undefined;
    NewDownloadScreen: { PostDetails: PostCardProps };
};

// Props for App Navigator's Screens
export type AppScreenProps<Screen extends keyof AppStackParamsList> = StackScreenProps<
    AppStackParamsList,
    Screen
>;

// Screen Names types for AppNavigator
export type AppScreenNamesTypes = {
    [key in keyof AppStackParamsList]: any;
}; 
