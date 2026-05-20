'use client';

import React from 'react';
import { PageContent } from '@/components';
import CreatePostForm from '@/src/features/posts/components/CreatePostForm';
import { useParams } from 'next/navigation';
import useCommunityState from '@/hooks/community/useCommunityState';

export default function SubmitPostPage() {
  const params = useParams();
  const communityId = params.communityId as string;
  const { communityStateValue } = useCommunityState();

  return (
    <PageContent>
      {/* Left Content */}
      <div className="flex-1 mt-6">
        <div className="border-b border-border pb-4 mb-6">
          <h2 className="text-[18px] font-bold text-foreground">
            Create a post
          </h2>
        </div>
        
        <CreatePostForm 
          communityId={communityId || communityStateValue.currentCommunity?.id || ''} 
          communityImageURL={communityStateValue.currentCommunity?.imageURL} 
        />
      </div>

      {/* Right Content - Sidebar */}
      <div className="hidden md:flex flex-col gap-5 mt-14">
        <div className="bg-card p-4 rounded-[12px] border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FF5722] p-2 rounded-lg">
              <img src="/images/logo.svg" alt="logo" className="h-[24px] brightness-0 invert" />
            </div>
            <span className="font-bold text-foreground text-[14px]">Posting Rules</span>
          </div>
          
          <div className="flex flex-col text-[12px] text-muted-foreground font-medium">
            <div className="py-2 border-b border-border">1. Remember the human</div>
            <div className="py-2 border-b border-border">2. Behave like you would in real life</div>
            <div className="py-2 border-b border-border">3. Look for the original source of content</div>
            <div className="py-2 border-b border-border">4. Search for duplicates before posting</div>
            <div className="py-2">5. Read the community's rules</div>
          </div>
        </div>
        
        <p className="text-[12px] text-muted-foreground font-medium text-center px-4 leading-relaxed">
          Please be mindful of the content policy and practice good community etiquette.
        </p>
      </div>
    </PageContent>
  );
}
