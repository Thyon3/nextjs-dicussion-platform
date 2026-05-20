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
import CommunityLoader from "@/components/loaders/CommunityLoader";

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
        const response = await getCommunity(communityId as string) as any;
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
        <div className="flex flex-col gap-5">
          <div className="block lg:hidden">
            <About communityData={communityData} />
          </div>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-5">
          <About communityData={communityData} />
        </div>
      </PageContent>
    </>
  );
};

export default CommunityPage;
