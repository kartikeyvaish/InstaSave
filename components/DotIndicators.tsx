// Packages Imports
import { View, StyleSheet, FlatList } from "react-native";

// Local Imports
import Dots from "./Dots";
import { DotIndicatorsProps } from "../types/ComponentTypes";

// function component for DotIndicators
function DotIndicators(props: DotIndicatorsProps) {
  // Destructuring props
  const { posts, scrollX } = props;

  // render
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id?.toString()}
        renderItem={({ item, index }) => <Dots key={index} index={index} scrollX={scrollX} />}
        horizontal
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
}

// exports
export default DotIndicators;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
