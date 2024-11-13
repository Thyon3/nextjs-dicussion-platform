import { firestore } from "@/firebase/clientApp";
import { arrayUnion, doc, increment, runTransaction } from "firebase/firestore";

/**
 * Promotes a user to an admin role within a specific community.
 * This function updates community's admin list and user's membership snippet.
 * If user is not already a member, they are joined to community as an admin.
 * @param communityId - The unique identifier of community.
 * @param userId - The unique identifier of user to be promoted.
 * @param communityImageURL - Optional URL for community's image to be stored in the snippet.
 * @returns A promise that resolves when promotion transaction is complete.
 */
export const addCommunityAdmin = async (
  communityId: string,
  userId: string,
  communityImageURL?: string
): Promise<void> => {
  await runTransaction(firestore, async (transaction) => {
    const communityRef = doc(firestore, "communities", communityId);
    const snippetRef = doc(
      firestore,
      `users/${userId}/communitySnippets/${communityId}`
    );

    const snippetDoc = await transaction.get(snippetRef);

    transaction.update(communityRef, {
      adminIds: arrayUnion(userId),
    });

    if (snippetDoc.exists()) {
      transaction.update(snippetRef, {
        isAdmin: true,
      });
    } else {
      transaction.set(snippetRef, {
        communityId: communityId,
        imageURL: communityImageURL || "",
        isAdmin: true,
      });

      transaction.update(communityRef, {
        numberOfMembers: increment(1),
      });
    }
  });
};
