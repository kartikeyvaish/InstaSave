// Packages Imports
import { ActivityIndicatorProps, ColorValue, GestureResponderEvent, ImageStyle, ScrollViewProps, StyleProp, TextProps, TextStyle, ViewProps, ViewStyle } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";

// Other Types
import { ChildrenProps, SeperateMarginProps } from "./GlobalTypes";
import { ReactNativePaperButtonProps, ReactNativePaperSnackbarProps, ReactNativePaperTextInputProps } from "./PaperTypes";
import { VideoProps } from "expo-av";

// interface for AlertDialogProps
export interface AlertDialogProps {
    dialogTitle?: string;
    dialogTitleProps?: AppTextProps;
    subTitle?: string;
    subTitleProps?: AppTextProps;
    firstButtonText?: string;
    firstButtonOnPress?: () => void;
    firstButtonProps?: MenuCardProps;
    secondButtonText?: string;
    secondButtonOnPress?: () => void;
    secondButtonProps?: MenuCardProps;
}

// AnimatedText Props interface
export interface AnimatedTextProps
    extends AppTextProps,
    Animated.AnimateProps<any> { }

// AnimatedView Props interface
export interface AnimatedViewProps extends Animated.AnimateProps<ViewStyle>, ChildrenProps {
    style?: StyleProp<ViewStyle>;
}

// type for AppButton  
export type AppButtonProps = {
    title?: string;
    children?: any;
    height?: number;
    roundness?: number;
    backgroundColor?: string;
    color?: string;
    elevation?: number;
} & Omit<ReactNativePaperButtonProps, 'children'> & ChildrenProps & SeperateMarginProps;

// interface for AppContainer
export interface AppContainerProps extends ChildrenProps {
    style?: StyleProp<ViewStyle>;
    backgroundColor?: ColorValue;
}

// interface for AppScrollContainer
export interface AppScrollContainerProps extends ChildrenProps, AppContainerProps, ScrollViewProps {
    onRefresh?: () => void;
    refreshing?: boolean;
}

// interface for AppForm
export interface AppFormProps {
    initialValues: {};
    onSubmit: (values: {}) => void;
    validationSchema: any;
    children?: any;
}

// interface for AppFormField
export interface AppFormFieldProps extends AppTextInputProps {
    title: string;
}

// interface for AppHeaderProps
export interface AppHeaderProps extends AppTextProps {
    badgeCount?: number;
    onMessageIconPress?: () => void;
    onNewIconPress?: () => void;
}

// AppHeaderBar interface
export interface AppHeaderBarProps {
    title?: string;
    onIconPress?: () => void;
    backgroundColor?: ColorValue;
    isHeaderVisible?: boolean;
    titleColor?: ColorValue;
    style?: StyleProp<ViewStyle>;
}

// AppIcon props interface
export interface AppIconProps extends SeperateMarginProps {
    name?: any;
    family?: string;
    color?: ColorValue;
    size?: number;
    onPress?: ((event: GestureResponderEvent) => void) | any;
    loading?: boolean;
    style?: StyleProp<TextStyle>;
}

// interface for AppIconButton
export interface AppIconButtonProps {
    containerStyle?: StyleProp<ViewStyle>;
    iconProps?: AppIconProps;
    onPress?: ((event: GestureResponderEvent) => void) | any;
    size?: number;
    backgroundColor?: string;
    loading?: boolean;
}

// AppImage interface
export interface AppImageProps {
    size?: number;
    uri?: string;
    style?: StyleProp<ImageStyle>;
    resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
    onPress?: () => void;
    borderRadius?: number;
    borderColor?: ColorValue;
    borderWidth?: number;
    showBorder?: boolean;
    backgroundColor?: string;
}

// interface for AppLoading
export interface AppLoadingProps {
    visible?: boolean;
    loadingText?: string;
    loadingTextProps?: AppTextProps;
    indicatorProps?: ActivityIndicatorProps;
    containerStyles?: StyleProp<ViewStyle>;
}

// interface for Submit Button
export interface AppSubmitButtonProps extends AppButtonProps {
    CustomButton?: React.ComponentType<any>;
}

// interface for AppSnackBarProps
export interface AppSnackBarProps extends Omit<ReactNativePaperSnackbarProps, "children"> {
    text?: string;
    backgroundColor?: string;
}

// interface for AppText
export interface AppTextProps extends TextProps, SeperateMarginProps {
    text?: string;
    color?: ColorValue;
    size?: number;
    family?: string;
}

// final type for AppButton 
export type AppTextInputProps = Omit<ReactNativePaperTextInputProps, 'error'> & {
    error?: string;
    helperTextProps?: HelperTextProps;
    containerStyle?: StyleProp<ViewStyle>;
    leftIconProps?: AppIconProps;
    rightIconProps?: AppIconProps;
    controlled?: boolean;
    roundness?: number;
    showHelper?: boolean;
};


// interface for AppVideo
export interface AppVideoProps extends VideoProps { }

// interface for AppView
export interface AppViewProps extends ViewProps {
    flex?: number;
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
}

// interface for BackDropProps
export interface BackDropProps {
    style?: any;
    children?: any;
    onBackDropPress?: any;
    visible?: boolean;
}

// interface for DotIndicators
export interface DotIndicatorsProps {
    posts?: Array<PostProps>;
    scrollX: SharedValue<number>;
}

// interface for Dots
export interface DotsProps {
    visible?: boolean;
    scrollX: SharedValue<number>;
    index: number;
}

// interface for HelperText
export interface HelperTextProps {
    text?: string;
    type?: "error" | "info";
    visible?: boolean;
    padding?: "none" | "normal";
    style?: StyleProp<TextStyle>;
}


// interface for MenuCard
export interface MenuCardProps extends AppTextProps {
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    icon?: AppIconProps;
}

// interface for NameAndLocationCard
export interface NameAndLocationProps {
    name?: string;
    location?: string;
    profile_picture?: string;
    is_verified?: boolean;
}

export interface OwnerProps {
    full_name?: string;
    id?: string;
    is_private?: boolean;
    is_verified?: boolean;
    profile_pic_url?: string;
    username?: string;
}

export interface PostProps {
    id?: string;
    uri?: string;
    is_video?: boolean;
    thumbnail_image?: string;
}

export interface PostCardProps {
    id: string;
    owner: OwnerProps;
    coauthor_producers?: Array<OwnerProps>;
    location?: string;
    posts: Array<PostProps>;
    taken_at_timestamp?: number;
}

export interface PostItemProps extends PostProps {
    selected?: Array<PostProps>;
    onCheckPress?: () => void;
    showSelectIcon?: boolean;
    currentItem?: string;
    isMuted?: boolean;
    onItemPress?: () => void;
}

export interface PostVideoProps extends PostProps {
    isPlaying?: boolean;
    isMuted?: boolean;
}

// interface for PlaybackStatus
export interface PlaybackStatus {
    androidImplementation?: string;
    isLoaded?: boolean;
    uri?: string;
    progressUpdateIntervalMillis?: number;
    durationMillis?: number;
    positionMillis?: number;
    playableDurationMillis?: number;
    seekMillisToleranceBefore?: number;
    seekMillisToleranceAfter?: number;
    shouldPlay?: boolean;
    isPlaying?: boolean;
    isBuffering?: boolean;
    rate?: number;
    shouldCorrectPitch?: boolean;
    volume?: number;
    isMuted?: boolean;
    isLooping?: boolean;
    didJustFinish?: boolean;
} 