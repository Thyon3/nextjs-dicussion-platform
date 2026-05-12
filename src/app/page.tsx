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
import { Stack } from "@chakra-ui/react";

/**
 * The root page of the application (Home feed).
 * Displays a two-column layout with the post feed on the left and supplemental cards on the right.
 * @returns The main entry point for the discussion platform.
 */
export default function Home() {
  return (
    <PageContent>
      {/* Left Content: Feed */}
      <Stack gap={5}>
        <CreatePostLink />
        <Posts />
      </Stack>

      {/* Right Content: Sidebar */}
      <Stack gap={5}>
        <Recommendations />
        <PersonalHome />
        <SidebarFooter />
      </Stack>
    </PageContent>
  );
}

