'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IoPeopleCircleOutline, IoSearchOutline, IoChevronDownOutline, IoCloseOutline } from 'react-icons/io5';
import { getCommunities } from '@/lib/api/community';
import { Community } from '@/types/community';
import useCommunityState from '@/hooks/community/useCommunityState';

interface CommunitySelectorProps {
  selectedCommunityId: string;
  onSelect: (community: Community) => void;
}

const CommunitySelector: React.FC<CommunitySelectorProps> = ({ selectedCommunityId, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue } = useCommunityState();
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const joinedIds = new Set(communityStateValue.mySnippets.map((s) => s.communityId));

  // Load all communities once
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getCommunities() as Community[];
        setAllCommunities(data);
      } catch (e) {
        console.error('Failed to load communities', e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Focus search when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = allCommunities.filter((c) =>
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  // Joined communities first, then the rest
  const joined = filtered.filter((c) => joinedIds.has(c.id));
  const others = filtered.filter((c) => !joinedIds.has(c.id));
  const sorted = [...joined, ...others];

  const selectedCommunity = allCommunities.find((c) => c.id === selectedCommunityId);

  const handleSelect = useCallback((community: Community) => {
    onSelect(community);
    setOpen(false);
    setSearch('');
  }, [onSelect]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[380px]">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 h-[42px] px-4 pr-3 rounded-full border transition-all w-full text-left ${
          selectedCommunityId
            ? 'border-white/30 bg-card text-foreground'
            : 'border-white/20 bg-card text-muted-foreground'
        } hover:border-border0`}
      >
        {selectedCommunity ? (
          <>
            {selectedCommunity.imageURL ? (
              <img src={selectedCommunity.imageURL} className="w-6 h-6 rounded-full object-cover shrink-0" alt="" />
            ) : (
              <IoPeopleCircleOutline size={22} className="text-[#FF5722] shrink-0" />
            )}
            <span className="text-[14px] font-semibold flex-1 truncate">
              r/{selectedCommunity.id}
            </span>
          </>
        ) : (
          <>
            <IoPeopleCircleOutline size={22} className="text-muted-foreground shrink-0" />
            <span className="text-[14px] flex-1">Select Community</span>
          </>
        )}
        <IoChevronDownOutline
          size={16}
          className={`ml-auto shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute top-[48px] left-0 w-[380px] bg-card border border-border rounded-[12px] shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-[14px] font-bold text-foreground">Post to</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <IoCloseOutline size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2 bg-muted rounded-full px-3 h-[36px]">
              <IoSearchOutline size={16} className="text-muted-foreground shrink-0" />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search communities"
                className="bg-transparent flex-1 text-[13px] text-foreground placeholder-gray-500 focus:outline-none"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} className="text-muted-foreground hover:text-foreground">
                  <IoCloseOutline size={14} />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto max-h-[360px]">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-5 h-5 border-2 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
              </div>
            ) : sorted.length === 0 ? (
              <p className="text-center text-muted-foreground text-[13px] py-8">No communities found</p>
            ) : (
              <>
                {joined.length > 0 && (
                  <div>
                    <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Your Communities
                    </p>
                    {joined.filter((c) => c.id.toLowerCase().includes(search.toLowerCase())).map((c) => (
                      <CommunityOption
                        key={c.id}
                        community={c}
                        isJoined
                        isSelected={selectedCommunityId === c.id}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                )}
                {others.length > 0 && (
                  <div>
                    <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {joined.length > 0 ? 'Other Communities' : 'All Communities'}
                    </p>
                    {others.map((c) => (
                      <CommunityOption
                        key={c.id}
                        community={c}
                        isJoined={false}
                        isSelected={selectedCommunityId === c.id}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Single Community Row ─────────────────────────────────────── */
const CommunityOption: React.FC<{
  community: Community;
  isJoined: boolean;
  isSelected: boolean;
  onSelect: (c: Community) => void;
}> = ({ community, isJoined, isSelected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(community)}
    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-left ${
      isSelected ? 'bg-muted' : ''
    }`}
  >
    {community.imageURL ? (
      <img src={community.imageURL} className="w-8 h-8 rounded-full object-cover shrink-0" alt="" />
    ) : (
      <div className="w-8 h-8 rounded-full bg-[#FF5722]/20 flex items-center justify-center shrink-0">
        <IoPeopleCircleOutline size={20} className="text-[#FF5722]" />
      </div>
    )}
    <div className="flex flex-col min-w-0 flex-1">
      <span className="text-[13px] font-semibold text-foreground truncate">r/{community.id}</span>
      <span className="text-[11px] text-muted-foreground">
        {community.numberOfMembers?.toLocaleString() ?? 0} members
        {isJoined && <span className="ml-1.5 text-[#FF5722]">· Joined</span>}
      </span>
    </div>
    {isSelected && (
      <span className="text-[11px] font-bold text-[#FF5722] shrink-0">✓</span>
    )}
  </button>
);

export default CommunitySelector;
