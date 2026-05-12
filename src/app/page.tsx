"use client";

import {
  CreatePostLink,
  PageContent,
  PersonalHome,
  Posts,
  Recommendations,
  SidebarFooter,
} from "@/components";
import React from "react";

export default function Home() {
  return (
    <PageContent>
      {/* Left Content: Feed */}
      <div className="flex flex-col gap-5">
        <CreatePostLink />
        <Posts />
      </div>

      {/* Right Content: Sidebar */}
      <div className="flex flex-col gap-5">
        <Recommendations />
        <PersonalHome />
        <SidebarFooter />
      </div>
    </PageContent>
  );
}
