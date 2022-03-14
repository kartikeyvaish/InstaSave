// Packages imports 
import { useRef, useState } from "react";
import { FlatList } from "react-native";

// Custom hook to track of viewable items in flatlist
export default function useFlatlist() {
    // Local Refs and States
    const FlatlistRef = useRef<FlatList>(null);
    const [ViewableItem, SetViewableItem] = useState<string>("");
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });

    // Viewable configuration
    const onViewRef = useRef((viewableItems: any) => {
        if (viewableItems?.viewableItems?.length > 0) {
            SetViewableItem(viewableItems.viewableItems[0].item.id || 0);
        }
    });

    // return necessary values
    return {
        FlatlistRef,
        ViewableItem,
        viewConfigRef: viewConfigRef.current,
        onViewRef,
    };
}