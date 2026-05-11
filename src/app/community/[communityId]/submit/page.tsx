"use client";

import { About, NewPostForm, PageContent } from "@/components";
import { getCommunity } from "@/lib/api/community";
import { Community } from "@/types/community";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

/**
 * Post submission page for a specific community.
 * Ensures user is authenticated and community exists before showing the post creation form.
 * @returns Post creation view with community-specific rules/sidebar.
 */
const SubmitPostPage: React.FC = () => {
  const { communityId } = useParams();
  const { user } = useAuth();
  const [communityData, setCommunityData] = useState<Community | null>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await getCommunity(communityId as string);
        setCommunityData(response);
      } catch (err) {
        console.error("Error fetching community", err);
      }
    };

    if (communityId) {
      fetchCommunity();
    }
  }, [communityId]);

  return (
    <PageContent>
      {/* Left Content */}
      <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
        <Text fontWeight={600}>Create a post</Text>
        {communityData && <NewPostForm communityData={communityData} user={user} />}
      </Box>

      {/* Right Content */}
      <Box>
        {communityData && <About communityData={communityData} />}
      </Box>
    </PageContent>
  );
};

export default SubmitPostPage;
