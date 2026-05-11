import { Community, CommunitySnippet } from "@/types/community";

/**
 * Checks if a user has permission to post in a community based on its privacy settings and their membership status.
 * @param community - The community object to check permissions for.
 * @param mySnippets - The user's community snippets (membership records).
 * @returns True if the user has permission to post, false otherwise.
 */
export const checkCommunityPermission = (
  community: Community,
  mySnippets: CommunitySnippet[]
) => {
  if (community.privacyType === "public") return true;

  const snippet = mySnippets.find((s) => s.communityId === community.id);
  
  if (community.privacyType === "restricted") {
    return !!snippet;
  }

  if (community.privacyType === "private") {
    return !!snippet;
  }

  return false;
};
