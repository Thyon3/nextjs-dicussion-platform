'use client';

import React, { useState } from 'react';
import { PageContent } from '@/components';
import { 
  IoNotificationsOutline, 
  IoTrashOutline, 
  IoMailOpenOutline, 
  IoChevronUpCircleOutline, 
  IoChatbubbleEllipsesOutline,
  IoAtOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoSparklesOutline
} from 'react-icons/io5';
import moment from 'moment';

interface NotificationItem {
  id: string;
  type: 'upvote' | 'comment' | 'mention' | 'invite' | 'system';
  content: string;
  sourceName: string;
  communityId?: string;
  postTitle?: string;
  createdAt: Date;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'comment',
      sourceName: 'u/game_expert_99',
      communityId: 'gaming',
      postTitle: 'What is your most anticipated game of 2026?',
      content: 'replied to your comment: "I completely agree! The gameplay reveal looked absolutely stellar, hoping for a beta soon."',
      createdAt: new Date(Date.now() - 1000 * 60 * 35), // 35 mins ago
      isRead: false,
    },
    {
      id: '2',
      type: 'upvote',
      sourceName: 'u/pixel_artist',
      communityId: 'indiegames',
      postTitle: 'My first pixel art environment showcase',
      content: 'upvoted your post! It has reached 50 upvotes.',
      createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      isRead: false,
    },
    {
      id: '3',
      type: 'mention',
      sourceName: 'u/dev_alice',
      communityId: 'nextgamezone',
      postTitle: 'Welcome to the NextGameZone Dev Sandbox',
      content: 'mentioned you in a comment: "We should ask @user about the API design. They worked on something similar."',
      createdAt: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
      isRead: false,
    },
    {
      id: '4',
      type: 'invite',
      sourceName: 'u/esports_network',
      communityId: 'competitive_gaming',
      content: 'invited you to join their community as a moderator.',
      createdAt: new Date(Date.now() - 1000 * 60 * 1440), // 1 day ago
      isRead: true,
    },
    {
      id: '5',
      type: 'system',
      sourceName: 'NextGameZone',
      content: 'Welcome to NextGameZone! Join communities, create posts, share opinions, and have fun!',
      createdAt: new Date(Date.now() - 1000 * 60 * 1440 * 3), // 3 days ago
      isRead: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions' | 'invites'>('all');
  
  // Settings toggles local state
  const [settings, setSettings] = useState({
    postActivity: true,
    replies: true,
    mentions: true,
    invites: true,
    messages: false,
    announcements: true,
  });

  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'upvote':
        return <IoChevronUpCircleOutline size={22} className="text-[#FF4500]" />;
      case 'comment':
        return <IoChatbubbleEllipsesOutline size={20} className="text-[#00B0FF]" />;
      case 'mention':
        return <IoAtOutline size={20} className="text-[#00E676]" />;
      case 'invite':
        return <IoPeopleOutline size={20} className="text-[#D500F9]" />;
      case 'system':
      default:
        return <IoSparklesOutline size={20} className="text-[#FFD600]" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.isRead;
    if (activeTab === 'mentions') return n.type === 'mention';
    if (activeTab === 'invites') return n.type === 'invite';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <PageContent>
      {/* Left/Center Column: Notifications List */}
      <div className="flex flex-col bg-card rounded-[16px] border border-border shadow-xl overflow-hidden animate-in fade-in duration-300">
        {/* Header Block */}
        <div className="p-6 border-b border-border flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <IoNotificationsOutline size={24} className="text-[#FF5722]" />
              <h1 className="text-xl font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-[#FF5722] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-[#FF5722] hover:bg-[#FF5722]/10 rounded-full transition-all border border-[#FF5722]/20"
              >
                <IoMailOpenOutline size={15} />
                Mark all as read
              </button>
            )}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex gap-1 border-b border-border -mb-6 mt-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: `Unread (${unreadCount})` },
              { id: 'mentions', label: 'Mentions' },
              { id: 'invites', label: 'Invites' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-[13px] font-bold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-[#FF5722] border-[#FF5722]'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Body */}
        <div className="flex flex-col divide-y divide-border min-h-[400px]">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 opacity-70">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center text-2xl">
                📭
              </div>
              <p className="text-[16px] font-bold text-muted-foreground">All caught up!</p>
              <p className="text-[13px] text-gray-500 text-center px-6">
                You have no {activeTab !== 'all' ? `${activeTab} ` : ''}notifications at the moment.
              </p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                onClick={() => toggleReadStatus(notification.id)}
                className={`flex gap-4 p-4 md:p-5 hover:bg-muted/30 transition-all cursor-pointer group relative ${
                  !notification.isRead ? 'bg-muted/10 border-l-[3px] border-l-[#FF5722]' : ''
                }`}
              >
                {/* Left side indicator / icon */}
                <div className="mt-0.5 shrink-0">
                  <div className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="text-[13px] text-foreground leading-normal pr-8">
                    <span className="font-bold text-foreground hover:underline cursor-pointer">
                      {notification.sourceName}
                    </span>{' '}
                    {notification.content}
                  </div>

                  {/* Context Metadata (post / community) */}
                  {notification.communityId && (
                    <div className="text-[11px] text-[#0DD3BB] font-semibold mt-0.5 truncate flex items-center gap-1.5">
                      <span>r/{notification.communityId}</span>
                      {notification.postTitle && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="text-muted-foreground font-normal italic truncate max-w-[300px]">
                            &quot;{notification.postTitle}&quot;
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Relative timestamp */}
                  <span className="text-[11px] text-muted-foreground mt-1">
                    {moment(notification.createdAt).fromNow()}
                  </span>
                </div>

                {/* Action buttons on notification item */}
                <div className="absolute right-4 top-4 md:top-5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => deleteNotification(notification.id, e)}
                    title="Delete Notification"
                    className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                  >
                    <IoTrashOutline size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right/Sidebar Column: Notification Settings Panel */}
      <div className="flex flex-col gap-5">
        <div className="bg-card border border-border rounded-[12px] p-5 shadow-md flex flex-col gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <IoSettingsOutline size={18} className="text-[#FF5722]" />
            <h2 className="font-bold text-[14px] text-foreground">Notification Preferences</h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { key: 'postActivity', label: 'Post Activity', desc: 'Upvotes, shares, and milestones on your posts' },
              { key: 'replies', label: 'Comment Replies', desc: 'Direct replies to your posts and comments' },
              { key: 'mentions', label: 'Mentions (@username)', desc: 'When someone tags you in a post or comment' },
              { key: 'invites', label: 'Community Invites', desc: 'Invitations to moderate or join private spaces' },
              { key: 'messages', label: 'Direct Messages', desc: 'Private messages sent directly to your inbox' },
              { key: 'announcements', label: 'Platform Announcements', desc: 'Circus feature updates and digests' },
            ].map(item => (
              <div key={item.key} className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-bold text-foreground leading-tight">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-snug">
                    {item.desc}
                  </span>
                </div>

                {/* Styled Switch Toggle */}
                <button
                  onClick={() => handleToggleSetting(item.key as any)}
                  className={`w-9 h-5 rounded-full transition-all relative shrink-0 border ${
                    settings[item.key as keyof typeof settings]
                      ? 'bg-[#FF5722] border-[#FF5722]'
                      : 'bg-muted border-border'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm ${
                      settings[item.key as keyof typeof settings]
                        ? 'left-[17px]'
                        : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <p className="text-[9px] text-muted-foreground leading-normal">
              Preferences are saved locally and synced with your account.
            </p>
          </div>
        </div>
      </div>
    </PageContent>
  );
}
