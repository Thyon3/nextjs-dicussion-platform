import { communityStateAtom } from "@/atoms/communitiesAtom";
import { useAuth } from "@/hooks/useAuth";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth";

const useCallCreatePost = () => {
  const router = useRouter();
  const { user } = useAuth();
  const openModal = useAuthStore((s) => s.openModal);
  const communityStateValue = useAtomValue(communityStateAtom);

  const onClick = () => {
    if (!user) {
      openModal('login');
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
