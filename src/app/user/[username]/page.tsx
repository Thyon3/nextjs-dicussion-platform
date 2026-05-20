'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import moment from 'moment';
import { useAuth } from '@/hooks/useAuth';
import { 
  PageContent, 
  PostItem, 
  PostLoader, 
  NotFound 
} from '@/components';
import { 
  getUserProfileByUsername, 
  getUserPosts, 
  getUserComments 
} from '@/src/features/auth/api/userApi';
import usePostState from '@/hooks/posts/usePostState';
import usePostSelection from '@/hooks/posts/usePostSelection';
import usePostVote from '@/hooks/posts/usePostVote';
import usePostDeletion from '@/hooks/posts/usePostDeletion';
import usePostVoteSync from '@/hooks/posts/usePostVoteSync';
import { AuthUser } from '@/src/features/auth/types';
import { 
  IoPersonCircleOutline, 
  IoShareOutline, 
  IoSettingsOutline, 
  IoAddOutline, 
  IoLinkOutline,
  IoRibbonOutline,
  IoShieldOutline
} from 'react-icons/io5';

type ProfileTab = 'overview' | 'posts' | 'comments' | 'saved';

export default function UserProfilePage() {
  const { username } = useParams() as { username: string };
  const router = useRouter();
  const { user: currentUser } = useAuth();
  
  const [profileUser, setProfileUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Lists state
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  // Global post state hook integration for voting/interaction
  const { postStateValue, setPostStateValue } = usePostState();
  const { onSelectPost } = usePostSelection(setPostStateValue);
  const { onVote } = usePostVote(postStateValue, setPostStateValue);
  const { onDeletePost } = usePostDeletion(setPostStateValue);
  usePostVoteSync(setPostStateValue);

  const isOwnProfile = currentUser && (
    currentUser.email?.split('@')[0].toLowerCase() === username.toLowerCase() ||
    currentUser.displayName?.toLowerCase() === username.toLowerCase()
  );

  // Fetch User profile details
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getUserProfileByUsername(username);
        setProfileUser(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (username) {
      fetchProfile();
    }
  }, [username]);

  // Fetch posts/comments lists based on active tab
  useEffect(() => {
    if (!profileUser) return;

    const fetchListData = async () => {
      setLoadingList(true);
      try {
        if (activeTab === 'posts' || activeTab === 'overview') {
          const fetchedPosts = await getUserPosts(username);
          setPosts(fetchedPosts);
          // Sync with global post state for interactions
          setPostStateValue(prev => ({
            ...prev,
            posts: fetchedPosts,
          }));
        } else if (activeTab === 'comments') {
          const fetchedComments = await getUserComments(username);
          setComments(fetchedComments);
        }
      } catch (err) {
        console.error('Error fetching list data:', err);
      } finally {
        setLoadingList(false);
      }
    };

    fetchListData();
  }, [profileUser, activeTab, username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !profileUser) {
    return <NotFound />;
  }

  return (
    <PageContent>
      {/* ── Left Content: Feed & Navigation ────────────────────── */}
      <div className="flex flex-col gap-5 w-full">
        {/* User Card Header for Mobile/Tablet */}
        <div className="flex flex-col gap-4 p-5 bg-card rounded-[16px] border border-border shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-[#FF5722] shadow-lg shrink-0">
              {profileUser.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profileUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <IoPersonCircleOutline size={64} className="text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="font-reddit text-2xl font-bold text-foreground leading-tight truncate">
                {profileUser.displayName || profileUser.email?.split('@')[0]}
              </h1>
              <p className="font-reddit text-[14px] text-muted-foreground">
                u/{profileUser.email?.split('@')[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 border-b border-border overflow-x-auto no-scrollbar py-1">
          {(['overview', 'posts', 'comments', ...(isOwnProfile ? ['saved'] : [])] as ProfileTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[14px] font-bold font-reddit rounded-full transition-all capitalize shrink-0 ${
                activeTab === tab
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Feed List content */}
        <div className="flex flex-col gap-4 min-h-[300px]">
          {loadingList ? (
            <PostLoader />
          ) : activeTab === 'posts' || activeTab === 'overview' ? (
            posts.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-[16px] border border-border p-6">
                <p className="text-muted-foreground font-reddit">No posts submitted yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {postStateValue.posts.map((post) => (
                  <PostItem
                    key={post.id}
                    post={post}
                    userIsCreator={currentUser?.id === post.creatorId}
                    userIsAdmin={false}
                    userVoteValue={
                      postStateValue.postVotes.find((vote) => vote.postId === post.id)
                        ?.voteValue
                    }
                    onVote={onVote}
                    onSelectPost={onSelectPost}
                    onDeletePost={onDeletePost}
                  />
                ))}
              </div>
            )
          ) : activeTab === 'comments' ? (
            comments.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-[16px] border border-border p-6">
                <p className="text-muted-foreground font-reddit">No comments left yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className="p-5 bg-card border border-border rounded-[16px] shadow-sm hover:border-border/80 transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                      <span className="font-bold text-foreground">u/{comment.creatorDisplayText}</span>
                      <span>•</span>
                      <span>commented on a post</span>
                      <span>•</span>
                      <span>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                    <p className="text-foreground text-[14px] leading-relaxed whitespace-pre-wrap">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            )
          ) : activeTab === 'saved' ? (
            currentUser?.savedPosts?.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-[16px] border border-border p-6">
                <p className="text-muted-foreground font-reddit">No saved posts yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {currentUser?.savedPosts?.map((saved) => (
                  <div
                    key={saved.postId}
                    onClick={() => router.push(`/community/${saved.communityId}/comments/${saved.postId}`)}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-[16px] hover:border-border/80 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-[11px] text-muted-foreground font-reddit">r/{saved.communityId}</span>
                      <h4 className="font-reddit text-[14px] font-bold text-foreground truncate mt-1">
                        {saved.postTitle}
                      </h4>
                    </div>
                    {saved.communityImageURL && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={saved.communityImageURL} 
                        alt="Community Logo" 
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-border"
                      />
                    )}
                  </div>
                ))}
              </div>
            )
          ) : null}
        </div>
      </div>

      {/* ── Right Content: Sidebar ────────────────────────────── */}
      <div className="flex flex-col gap-5">
        {/* Reddit-Style Profile Summary Card */}
        <div className="bg-card rounded-[16px] border border-border shadow-lg overflow-hidden flex flex-col">
          {/* Header Banner */}
          <div className="h-[96px] bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 relative">
            <div className="absolute -bottom-8 left-5">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-muted flex items-center justify-center border-4 border-card shadow-lg">
                {profileUser.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profileUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <IoPersonCircleOutline size={72} className="text-muted-foreground" />
                )}
              </div>
            </div>
          </div>

          {/* Profile Card Body */}
          <div className="px-5 pt-10 pb-5 flex flex-col gap-4">
            <div>
              <h2 className="font-reddit text-xl font-bold text-foreground">
                {profileUser.displayName || profileUser.email?.split('@')[0]}
              </h2>
              <span className="font-reddit text-[12px] text-muted-foreground">
                u/{profileUser.email?.split('@')[0]}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5">
              <button className="flex-1 py-1.5 bg-muted text-foreground text-[13px] font-bold font-reddit rounded-full hover:bg-muted/80 transition-all flex items-center justify-center gap-1.5">
                <IoShareOutline size={16} />
                <span>Share</span>
              </button>
              {isOwnProfile && (
                <button 
                  onClick={() => router.push('/settings')}
                  className="p-2 bg-muted text-foreground rounded-full hover:bg-muted/80 transition-all"
                  title="Settings"
                >
                  <IoSettingsOutline size={16} />
                </button>
              )}
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
              <div className="flex flex-col">
                <span className="font-reddit text-[14px] font-bold text-foreground">1</span>
                <span className="font-reddit text-[11px] text-muted-foreground">Karma</span>
              </div>
              <div className="flex flex-col">
                <span className="font-reddit text-[14px] font-bold text-foreground">0</span>
                <span className="font-reddit text-[11px] text-muted-foreground">Followers</span>
              </div>
              <div className="flex flex-col">
                <span className="font-reddit text-[14px] font-bold text-foreground">
                  {moment().diff(moment(profileUser.createdAt), 'months') || 1} m
                </span>
                <span className="font-reddit text-[11px] text-muted-foreground">Reddit Age</span>
              </div>
              <div className="flex flex-col">
                <span className="font-reddit text-[14px] font-bold text-foreground">Active</span>
                <span className="font-reddit text-[11px] text-muted-foreground">Online Status</span>
              </div>
            </div>

            {/* Bio description */}
            {profileUser.settings?.profile?.about && (
              <div className="border-t border-border pt-4">
                <p className="font-reddit text-[13px] text-foreground leading-relaxed italic">
                  &quot;{profileUser.settings.profile.about}&quot;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Achievements Card */}
        <div className="p-5 bg-card rounded-[16px] border border-border shadow-md flex flex-col gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IoRibbonOutline size={18} />
            <h3 className="font-reddit text-[12px] font-bold tracking-wider uppercase">
              Achievements
            </h3>
          </div>
          <div className="flex gap-3 items-center overflow-x-auto no-scrollbar py-1">
            <div className="flex flex-col items-center shrink-0" title="Joined the community">
              <div className="w-10 h-10 rounded-full bg-[#FF5722]/10 flex items-center justify-center text-[#FF5722]">
                <IoAddOutline size={20} />
              </div>
              <span className="text-[9px] text-muted-foreground mt-1 font-reddit">Newcomer</span>
            </div>
            <div className="flex flex-col items-center shrink-0" title="Verifying email">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <IoShieldOutline size={20} />
              </div>
              <span className="text-[9px] text-muted-foreground mt-1 font-reddit">Verified</span>
            </div>
          </div>
        </div>

        {/* Quick Settings Action Card (Own Profile only) */}
        {isOwnProfile && (
          <div className="p-5 bg-card rounded-[16px] border border-border shadow-md flex flex-col gap-4">
            <h3 className="font-reddit text-[12px] font-bold text-muted-foreground tracking-wider uppercase">
              Profile Settings
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-foreground font-reddit">Customize</span>
                  <span className="text-[11px] text-muted-foreground font-reddit">Update display details</span>
                </div>
                <button 
                  onClick={() => router.push('/settings')} 
                  className="px-3 py-1 bg-muted hover:bg-muted/80 text-foreground text-[11px] font-bold rounded-full transition-all"
                >
                  Update
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-foreground font-reddit">Preferences</span>
                  <span className="text-[11px] text-muted-foreground font-reddit">Languages and media settings</span>
                </div>
                <button 
                  onClick={() => router.push('/settings')} 
                  className="px-3 py-1 bg-muted hover:bg-muted/80 text-foreground text-[11px] font-bold rounded-full transition-all"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContent>
  );
}
