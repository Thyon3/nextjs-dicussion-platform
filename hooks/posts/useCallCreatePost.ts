import { authModalStateAtom } from "@/atoms/authModalAtom";
import { communityStateAtom } from "@/atoms/communitiesAtom";
import { useAuth } from "@/hooks/useAuth";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";

const useCallCreatePost = () => {
  const router = useRouter();
  const { user } = useAuth();
  const setAuthModalState = useSetAtom(authModalStateAtom);
  const communityStateValue = useAtomValue(communityStateAtom);

  const onClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    const { currentCommunity } = communityStateValue;

    if (currentCommunity) {
      router.push(`/community/${currentCommunity.id}/submit`);
      return;
    }

    // Default to home if no community is selected (though this component is usually used within a community context)
    router.push("/submit");
  };

  return {
    onClick,
  };
};

export default useCallCreatePost;
