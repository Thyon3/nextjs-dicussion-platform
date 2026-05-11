"use client";

import {
  About,
  CommunityHeader,
  CreatePostLink,
  NotFound,
  PageContent,
  Posts,
} from "@/components";
import { getCommunity } from "@/lib/api/community";
import { Community } from "@/types/community";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import CommunityLoader from "@/components/loaders/CommunityLoader";

/**
 * Community page displaying header, post feed, and about card.
 * Fetches community data based on route parameters and handles not-found states.
 * @returns The community-specific view with all relevant contextual information.
 */
const CommunityPage: React.FC = () => {
  const { communityId } = useParams();
  const [communityData, setCommunityData] = useState<Community | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCommunity = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await getCommunity(communityId as string);
        setCommunityData(response);
      } catch (err) {
        console.error("Error fetching community", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (communityId) {
      fetchCommunity();
    }
  }, [communityId]);

  if (loading) {
    return <CommunityLoader />;
  }

  if (error || !communityData) {
    return <NotFound />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageContent>
        {/* Left Content */}
        <Stack gap={5}>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </Stack>

        {/* Right Content */}
        <Stack gap={5}>
          <About communityData={communityData} />
        </Stack>
      </PageContent>
    </>
  );
};

export default CommunityPage;
