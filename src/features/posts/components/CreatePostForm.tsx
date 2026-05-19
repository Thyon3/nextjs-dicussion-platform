'use client';

import React, { useState, useRef } from 'react';
import { IoDocumentText, IoImageOutline, IoLinkOutline } from 'react-icons/io5';
import { BiPoll } from 'react-icons/bi';
import { useAuth } from '@/src/features/auth';
import { useCreatePost } from '../hooks/useCreatePost';
import { PostType, TabItem } from '../types';
import { Community } from '@/types/community';
import CommunitySelector from './CommunitySelector';

const tabs: TabItem[] = [
  { title: 'Post', type: 'text', icon: IoDocumentText },
  { title: 'Images & Video', type: 'image', icon: IoImageOutline },
  { title: 'Link', type: 'link', icon: IoLinkOutline },
  { title: 'Poll', type: 'poll', icon: BiPoll },
];

interface CreatePostFormProps {
  communityId?: string;
  communityImageURL?: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  communityId: initialCommunityId,
  communityImageURL: initialCommunityImageURL,
}) => {
  const { user } = useAuth();

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    initialCommunityId
      ? ({ id: initialCommunityId, imageURL: initialCommunityImageURL } as Community)
      : null
  );

  const { submitPost, loading, error } = useCreatePost(
    selectedCommunity?.id ?? '',
    selectedCommunity?.imageURL ?? ''
  );

  const [selectedTab, setSelectedTab] = useState<PostType>('text');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [linkURL, setLinkURL] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = () => {
    if (!title.trim()) return false;
    if (!selectedCommunity?.id) return false; // community is always required
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

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Community Selector — only shown when not pre-set by a community page context */}
      {!initialCommunityId && (
        <div className="flex flex-col gap-1.5">
          <CommunitySelector
            selectedCommunityId={selectedCommunity?.id ?? ''}
            onSelect={(community) => setSelectedCommunity(community)}
          />
          {!selectedCommunity && (
            <p className="text-[11px] text-red-400 pl-1">
              A community is required to post.
            </p>
          )}
        </div>
      )}

      <div className="bg-card rounded-[12px] border border-border overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              className={`flex-1 flex items-center justify-center py-3 px-4 sm:px-0 font-bold text-[13px] sm:text-[14px] whitespace-nowrap transition-all border-b-2 border-r border-border last:border-r-0 ${
                selectedTab === tab.type
                  ? 'text-[#FF5722] border-b-[#FF5722] bg-muted'
                  : 'text-muted-foreground border-b-transparent hover:bg-muted'
              } ${tab.type === 'poll' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => tab.type !== 'poll' && setSelectedTab(tab.type)}
              disabled={tab.type === 'poll'}
            >
              <tab.icon className="mr-2 text-[18px]" />
              {tab.title}
            </button>
          ))}
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Title */}
          <div className="relative">
            <input
              placeholder="Title"
              className="w-full bg-transparent border border-border rounded-md h-[40px] px-4 pr-16 text-[14px] text-foreground focus:outline-none focus:border-white/30 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={300}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-muted-foreground">
              {title.length}/300
            </span>
          </div>

          {/* Image / Video upload */}
          {selectedTab === 'image' && (
            <div className="flex justify-center items-center min-h-[250px] border border-dashed border-white/20 rounded-md relative bg-muted">
              {filePreview ? (
                <div className="relative p-2 w-full flex justify-center">
                  {file?.type.startsWith('video/') ? (
                    <video src={filePreview} controls className="max-h-[400px] max-w-full rounded-md" />
                  ) : (
                    <img src={filePreview} alt="Preview" className="max-h-[400px] max-w-full rounded-md" />
                  )}
                  <button
                    className="absolute top-4 right-4 bg-black/60 text-foreground px-3 py-1 rounded-full text-[12px] hover:bg-black/80 transition-colors"
                    onClick={() => { setFile(null); setFilePreview(''); }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-muted-foreground font-medium">Drag and drop images or</p>
                  <button
                    className="px-6 py-2 border border-white/30 text-foreground font-bold rounded-full hover:bg-muted transition-all"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
          )}

          {/* Link */}
          {selectedTab === 'link' && (
            <input
              placeholder="URL"
              className="w-full bg-transparent border border-border rounded-md h-[40px] px-4 text-[14px] text-foreground focus:outline-none focus:border-white/30 transition-all"
              value={linkURL}
              onChange={(e) => setLinkURL(e.target.value)}
            />
          )}

          {/* Body */}
          <textarea
            placeholder={selectedTab === 'text' ? 'Text (optional)' : 'Description (optional)'}
            className="w-full bg-transparent border border-border rounded-md min-h-[150px] p-4 text-[14px] text-foreground focus:outline-none focus:border-white/30 transition-all resize-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          {error && <p className="text-red-500 text-[14px] font-semibold">{error}</p>}

          {/* Footer Actions */}
          <div className="flex justify-end items-center pt-2 gap-3">
            <button className="px-6 py-1.5 text-foreground text-[14px] font-bold border border-white/30 rounded-full hover:bg-muted transition-all">
              Save Draft
            </button>
            <button
              className={`px-8 py-1.5 text-foreground text-[14px] font-bold rounded-full transition-all ${
                !isFormValid() || loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#FF5722] hover:bg-[#E64A19]'
              }`}
              onClick={handleSubmit}
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
