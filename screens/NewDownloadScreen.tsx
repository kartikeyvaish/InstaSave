// Local Imports
import AppContainer from "../components/AppContainer";
import { AppScreenProps } from "../navigation/NavigationProps";
import PostCard from "../components/PostCard";

// function component for NewDownloadScreen
function NewDownloadScreen(props: AppScreenProps<"NewDownloadScreen">) {
  // Destructuring props
  const { route } = props;
  const { PostDetails } = route.params ?? {};

  if (!PostDetails) return null;

  // render
  return (
    <AppContainer style={{ flex: 1 }}>
      {PostDetails ? <PostCard {...PostDetails} /> : null}
    </AppContainer>
  );
}

// exports
export default NewDownloadScreen;
