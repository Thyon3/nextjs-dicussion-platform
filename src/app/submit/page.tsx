'use client';

import React from 'react';
import { Box, Flex, Text, Stack } from '@chakra-ui/react';
import { PageContent } from '@/components';
import CreatePostForm from '@/src/features/posts/components/CreatePostForm';
import useCommunityState from '@/hooks/community/useCommunityState';

export default function GlobalSubmitPostPage() {
  const { communityStateValue } = useCommunityState();

  return (
    <PageContent>
      {/* Left Content */}
      <Box flex={1}>
        <Flex borderBottom="1px solid" borderColor="whiteAlpha.200" pb={4} mb={4} mt={6}>
          <Text fontSize="18px" fontWeight={600}>
            Create a post
          </Text>
        </Flex>
        
        {/* We pass the current community id if available from the global state */}
        <CreatePostForm 
          communityId={communityStateValue.currentCommunity?.id || ''} 
          communityImageURL={communityStateValue.currentCommunity?.imageURL} 
        />
      </Box>

      {/* Right Content - Sidebar */}
      <Box display={{ base: 'none', md: 'block' }}>
        <Stack gap={4} mt={14}>
          <Box bg={{ base: 'white', _dark: '#1a1a1b' }} p={3} borderRadius={4} border="1px solid" borderColor={{ base: 'gray.200', _dark: '#343536' }}>
            <Flex align="center" gap={2} mb={2}>
              <img src="/images/redditPersonalHome.png" alt="posting rules" height="40px" style={{ borderRadius: '4px' }}/>
              <Text fontWeight={600} fontSize="14px">Posting to Reddit</Text>
            </Flex>
            <Stack gap={2} fontSize="12px" fontWeight={500} borderTop="1px solid" borderColor={{ base: 'gray.200', _dark: '#343536' }} pt={2}>
              <Text borderBottom="1px solid" borderColor={{ base: 'gray.200', _dark: '#343536' }} pb={2}>1. Remember the human</Text>
              <Text borderBottom="1px solid" borderColor={{ base: 'gray.200', _dark: '#343536' }} pb={2}>2. Behave like you would in real life</Text>
              <Text borderBottom="1px solid" borderColor={{ base: 'gray.200', _dark: '#343536' }} pb={2}>3. Look for the original source of content</Text>
              <Text borderBottom="1px solid" borderColor={{ base: 'gray.200', _dark: '#343536' }} pb={2}>4. Search for duplicates before posting</Text>
              <Text pb={2}>5. Read the community's rules</Text>
            </Stack>
          </Box>
          <Text fontSize="12px" color="gray.500" fontWeight={500} textAlign="center">
            Please be mindful of reddit's content policy and practice good reddiquette.
          </Text>
        </Stack>
      </Box>
    </PageContent>
  );
}
