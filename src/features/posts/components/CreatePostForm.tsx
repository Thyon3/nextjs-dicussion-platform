'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Flex, Box, Text, Input, Textarea, Button, Icon, Stack, Spinner, Select } from '@chakra-ui/react';
import { IoDocumentText, IoImageOutline, IoLinkOutline } from 'react-icons/io5';
import { BiPoll } from 'react-icons/bi';
import { useAuth } from '@/src/features/auth';
import { useCreatePost } from '../hooks/useCreatePost';
import { PostType, TabItem } from '../types';

const tabs: TabItem[] = [
  { title: 'Post', type: 'text', icon: IoDocumentText },
  { title: 'Images & Video', type: 'image', icon: IoImageOutline },
  { title: 'Link', type: 'link', icon: IoLinkOutline },
  { title: 'Poll', type: 'poll', icon: BiPoll }, // Assuming poll is not fully supported yet but UI exists
];

interface CreatePostFormProps {
  communityId: string;
  communityImageURL?: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ communityId: initialCommunityId, communityImageURL: initialCommunityImageURL }) => {
  const { user } = useAuth();
  const [selectedCommunityId, setSelectedCommunityId] = useState(initialCommunityId || '');
  const [selectedCommunityImageURL, setSelectedCommunityImageURL] = useState(initialCommunityImageURL || '');

  const { submitPost, loading, error } = useCreatePost(selectedCommunityId, selectedCommunityImageURL);
  
  const [selectedTab, setSelectedTab] = useState<PostType>('text');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [linkURL, setLinkURL] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = () => {
    if (!title.trim()) return false;
    if (selectedTab === 'image' && !file) return false;
    if (selectedTab === 'link' && !linkURL.trim()) return false;
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setFilePreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    await submitPost(title, selectedTab, body, file || undefined, linkURL);
  };

  const handleCommunitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cid = e.target.value;
    setSelectedCommunityId(cid);
    if (user?.communitySnippets) {
      const snippet = user.communitySnippets.find(s => s.communityId === cid);
      if (snippet) setSelectedCommunityImageURL(snippet.imageURL || '');
    }
  };

  return (
    <Stack gap={4} w="100%">
      {/* Community Selector (only show if not initialized with a specific community or if on global submit) */}
      {!initialCommunityId && user?.communitySnippets && (
        <Box width="300px">
          <Select 
            placeholder="Choose a community" 
            value={selectedCommunityId}
            onChange={handleCommunitySelect}
            bg={{ base: 'white', _dark: '#1a1a1b' }}
            borderColor={{ base: 'gray.200', _dark: '#343536' }}
            borderRadius="4px"
            _hover={{ bg: { base: 'white', _dark: '#1a1a1b' } }}
          >
            {user.communitySnippets.map((snippet) => (
              <option key={snippet.communityId} value={snippet.communityId}>
                r/{snippet.communityId}
              </option>
            ))}
          </Select>
        </Box>
      )}

      <Box bg={{ base: 'white', _dark: '#1a1a1b' }} borderRadius="md" w="100%" overflow="hidden">
        {/* Tabs */}
        <Flex borderBottom="1px solid" borderColor={{ base: 'gray.200', _dark: '#343536' }}>
        {tabs.map((tab) => (
          <Flex
            key={tab.type}
            flex={1}
            align="center"
            justify="center"
            p="14px 0px"
            cursor={tab.type === 'poll' ? 'not-allowed' : 'pointer'}
            fontWeight={700}
            color={selectedTab === tab.type ? 'blue.500' : 'gray.500'}
            borderBottom={selectedTab === tab.type ? '2px solid' : '2px solid transparent'}
            borderBottomColor={selectedTab === tab.type ? 'blue.500' : 'transparent'}
            borderRight="1px solid"
            borderColor={{ base: 'gray.200', _dark: '#343536' }}
            _hover={{ bg: { base: 'gray.50', _dark: '#272729' } }}
            onClick={() => tab.type !== 'poll' && setSelectedTab(tab.type)}
            opacity={tab.type === 'poll' ? 0.5 : 1}
          >
            <Icon as={tab.icon} mr={2} fontSize="1.2em" />
            <Text fontSize="14px">{tab.title}</Text>
          </Flex>
        ))}
      </Flex>

      <Stack p={4} gap={4}>
        {/* Title Input */}
        <Box position="relative">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={300}
            fontSize="14px"
            borderRadius="4px"
            bg="transparent"
            border="1px solid"
            borderColor={{ base: 'gray.200', _dark: '#343536' }}
            _focus={{ outline: 'none', border: '1px solid', borderColor: { base: 'black', _dark: 'white' } }}
            pr="60px"
          />
          <Text
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            fontSize="12px"
            color="gray.500"
            fontWeight={700}
          >
            {title.length}/300
          </Text>
        </Box>

        {/* Dynamic Content Area based on Tab */}

        {selectedTab === 'image' && (
          <Flex
            justify="center"
            align="center"
            minH="250px"
            border="1px dashed"
            borderColor={{ base: 'gray.300', _dark: '#4f4f51' }}
            borderRadius="4px"
            position="relative"
          >
            {filePreview ? (
              <Box position="relative" p={2}>
                {file?.type.startsWith('video/') ? (
                  <video src={filePreview} controls style={{ maxHeight: '400px', maxWidth: '100%' }} />
                ) : (
                  <img src={filePreview} alt="Preview" style={{ maxHeight: '400px', maxWidth: '100%' }} />
                )}
                <Button
                  size="sm"
                  position="absolute"
                  top={4}
                  right={4}
                  onClick={() => {
                    setFile(null);
                    setFilePreview('');
                  }}
                >
                  Remove
                </Button>
              </Box>
            ) : (
              <Stack align="center" gap={4}>
                <Text color="gray.500" fontWeight={500}>Drag and drop images or</Text>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  Upload
                </Button>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </Stack>
            )}
          </Flex>
        )}

        {selectedTab === 'link' && (
          <Input
            placeholder="Url"
            value={linkURL}
            onChange={(e) => setLinkURL(e.target.value)}
            fontSize="14px"
            borderRadius="4px"
            border="1px solid"
            borderColor={{ base: 'gray.200', _dark: '#343536' }}
            _focus={{ outline: 'none', border: '1px solid', borderColor: { base: 'black', _dark: 'white' } }}
          />
        )}

        {/* Description / Text Area (Available for all post types) */}
        <Textarea
          placeholder={selectedTab === 'text' ? "Text (optional)" : "Description (optional)"}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fontSize="14px"
          minH="150px"
          borderRadius="4px"
          border="1px solid"
          borderColor={{ base: 'gray.200', _dark: '#343536' }}
          _focus={{ outline: 'none', border: '1px solid', borderColor: { base: 'black', _dark: 'white' } }}
        />

        {error && (
          <Text color="red.500" fontSize="14px" mt={2}>
            {error}
          </Text>
        )}

        {/* Footer Actions */}
        <Flex justify="flex-end" align="center" pt={2}>
          <Button variant="outline" mr={2} borderRadius="999px" height="32px" fontSize="14px" fontWeight={700}>
            Save Draft
          </Button>
          <Button
            borderRadius="999px"
            height="32px"
            fontSize="14px"
            fontWeight={700}
            disabled={!isFormValid() || loading}
            onClick={handleSubmit}
          >
            {loading ? <Spinner size="sm" /> : 'Post'}
          </Button>
        </Flex>
      </Stack>
    </Box>
  </Stack>
  );
};

export default CreatePostForm;
