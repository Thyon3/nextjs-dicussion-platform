import { SetPostState } from "@/atoms/postsAtom";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";

/**
 * A custom hook that handles selection of a post and navigation to its detailed comment view.
 * It updates the global post state to track the currently selected post.
 * @param setPostStateValue - A state setter function to update the global post state.
 * @returns An object containing `onSelectPost` function.
 */
const usePostSelection = (setPostStateValue: SetPostState) => {
  const router = useRouter();

  const onSelectPost = (post: Post, scrollToComments?: boolean) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/community/${post.communityId}/comments/${post.id}${scrollToComments ? "#comments" : ""}`);
  };

  return { onSelectPost };
};

export default usePostSelection;
