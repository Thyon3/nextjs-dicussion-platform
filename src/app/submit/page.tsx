'use client';

import React from 'react';
import { PageContent } from '@/components';
import CreatePostForm from '@/src/features/posts/components/CreatePostForm';
import useCommunityState from '@/hooks/community/useCommunityState';

export default function GlobalSubmitPostPage() {
  const { communityStateValue } = useCommunityState();

  return (
    <PageContent>
      {/* Left Content */}
      <div className="flex-1">
        <div className="flex border-b border-border pb-4 mb-4 mt-6">
          <h2 className="text-[18px] font-semibold text-foreground">
            Create a post
          </h2>
        </div>
        
        <CreatePostForm 
          communityId={communityStateValue.currentCommunity?.id || ''} 
          communityImageURL={communityStateValue.currentCommunity?.imageURL} 
        />
      </div>

      {/* Right Content - Sidebar */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-4 mt-14">
          <div className="bg-card p-4 rounded-[12px] border border-border">
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/redditPersonalHome.png" alt="posting rules" className="h-[40px] rounded-md"/>
              <span className="font-bold text-foreground text-[14px]">Posting to Circus</span>
            </div>
            <div className="flex flex-col gap-3 text-[12px] font-medium text-muted-foreground pt-3 border-t border-border">
              <p className="border-b border-border pb-2">1. Remember the human</p>
              <p className="border-b border-border pb-2">2. Behave like you would in real life</p>
              <p className="border-b border-border pb-2">3. Look for the original source of content</p>
              <p className="border-b border-border pb-2">4. Search for duplicates before posting</p>
              <p>5. Read the community's rules</p>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground font-medium text-center">
            Please be mindful of Circus's content policy and practice good etiquette.
          </p>
        </div>
      </div>
    </PageContent>
  );
}
