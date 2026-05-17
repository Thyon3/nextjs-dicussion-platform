'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/features/auth';
import { updateUserSettings } from '@/src/features/auth/api/userApi';
import { 
  IoChevronForwardOutline, 
  IoArrowRedoOutline,
  IoCheckmarkOutline,
} from 'react-icons/io5';
import useCustomToast from '@/hooks/useCustomToast';

type TabType = 'Account' | 'Profile' | 'Privacy' | 'Preferences' | 'Notifications' | 'Email';

const SettingsPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('Account');
  const showToast = useCustomToast();

  const handleUpdate = async (newSettings: any) => {
    try {
      const updatedUser = await updateUserSettings(newSettings);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating settings:', error);
      showToast({
        title: 'Error',
        description: 'Failed to update settings',
        status: 'error',
      });
    }
  };

  const tabs: TabType[] = ['Account', 'Profile', 'Privacy', 'Preferences', 'Notifications', 'Email'];

  if (!user) return <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center text-gray-500">Please log in to view settings.</div>;

  const settings = user.settings || {
    account: { gender: 'Man', locationCustomization: 'Use approximate location (based on IP)', twoFactorEnabled: false },
    profile: { about: '', socialLinks: [], nsfw: false, activeCommunityVisibility: true, contentVisibility: true },
    privacy: { allowFollowing: true, chatRequests: 'Everyone', personalizeAds: true },
    preferences: { displayLanguage: 'English (US)', contentLanguages: [], showMatureContent: false, blurMatureMedia: false, showRecommendations: true, autoplayMedia: true, reduceMotion: false, displayMode: 'Auto', useCommunityThemes: true, openInNewTab: false, defaultFeedView: 'Card' },
    notifications: { communityNotifications: true, webPushNotifications: false, chatMessages: 'All on', chatRequests: 'All on', activity: { mentions: true, comments: true, upvotesPosts: true, upvotesComments: true, replies: true, newFollowers: true } }
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white pt-8 pb-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <h1 className="text-[28px] font-bold mb-6">Settings</h1>

        {/* Horizontal Tabs */}
        <div className="flex items-center gap-8 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-bold transition-all relative whitespace-nowrap ${
                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === 'Account' && <AccountSettings settings={settings.account} onUpdate={(val: any) => handleUpdate({ account: val })} />}
          {activeTab === 'Profile' && <ProfileSettings settings={settings.profile} onUpdate={(val: any) => handleUpdate({ profile: val })} />}
          {activeTab === 'Privacy' && <PrivacySettings settings={settings.privacy} onUpdate={(val: any) => handleUpdate({ privacy: val })} />}
          {activeTab === 'Preferences' && <PreferencesSettings settings={settings.preferences} onUpdate={(val: any) => handleUpdate({ preferences: val })} />}
          {activeTab === 'Notifications' && <NotificationsSettings settings={settings.notifications} onUpdate={(val: any) => handleUpdate({ notifications: val })} />}
          {activeTab === 'Email' && <div className="text-gray-500 italic py-10">Email settings coming soon...</div>}
        </div>
      </div>
    </div>
  );
};

/* ── Profile Tab ───────────────────────────────────────────────── */
const ProfileSettings = ({ settings, onUpdate }: any) => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-10">
      <Section title="Profile Information">
        <SettingItem 
          label="Display name (optional)" 
          sublabel="Set a display name that is shown instead of your username" 
          value={user?.displayName || "Set name"} 
          isEditable
          onSave={(val) => onUpdate({ displayName: val })} 
          hasArrow 
        />
        <SettingItem 
          label="About (optional)" 
          sublabel="A brief description of yourself shown on your profile" 
          value={settings.about || "Set description"} 
          isEditable
          onSave={(val) => onUpdate({ about: val })}
          hasArrow 
        />
        <SettingItem label="Social links" sublabel="Add links to your social media profiles" value={settings.socialLinks?.length || "0"} hasArrow />
      </Section>

    <Section title="Images">
      <SettingItem label="Avatar and banner" sublabel="Images shown on your profile" hasArrow />
    </Section>

    <Section title="Profile Visibility">
      <SettingItem 
        label="NSFW" 
        sublabel="Mark your profile as Not Safe for Work" 
        action={<Toggle active={settings.nsfw} onChange={(val) => onUpdate({ nsfw: val })} />} 
      />
      <SettingItem 
        label="Active in communities visibility" 
        sublabel="Show which communities you are active in on your profile" 
        action={<Toggle active={settings.activeCommunityVisibility} onChange={(val) => onUpdate({ activeCommunityVisibility: val })} />} 
      />
      <SettingItem 
        label="Content visibility" 
        sublabel="Allow your posts to be visible in search results and r/all" 
        action={<Toggle active={settings.contentVisibility} onChange={(val) => onUpdate({ contentVisibility: val })} />} 
      />
    </Section>
  </div>
  );
};

/* ── Account Tab ───────────────────────────────────────────────── */
const AccountSettings = ({ settings, onUpdate }: any) => (
  <div className="space-y-10">
    <Section title="General">
      <SettingItem label="Email address" value="user@example.com" hasArrow />
      <SettingItem label="Gender" value={settings.gender} hasArrow />
      <SettingItem label="Location customization" value={settings.locationCustomization} hasArrow />
    </Section>

    <Section title="Account authorization">
      <SettingItem 
        label="Google" 
        sublabel="Connect to log in with your Google account" 
        action={<button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-[13px] font-bold transition-all">Disconnect</button>} 
      />
      <SettingItem 
        label="Apple" 
        sublabel="Connect to log in with your Apple account" 
        action={<button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-[13px] font-bold transition-all">Connect</button>} 
      />
      <SettingItem 
        label="Two-factor authentication" 
        action={<Toggle active={settings.twoFactorEnabled} onChange={(val) => onUpdate({ twoFactorEnabled: val })} />} 
      />
    </Section>

    <Section title="Advanced">
      <SettingItem label="Delete account" hasArrow />
    </Section>
  </div>
);

/* ── Privacy Tab ───────────────────────────────────────────────── */
const PrivacySettings = ({ settings, onUpdate }: any) => (
  <div className="space-y-10">
    <Section title="Social interactions">
      <SettingItem 
        label="Allow people to follow you" 
        sublabel="Let people follow you to see your profile posts in their home feed" 
        action={<Toggle active={settings.allowFollowing} onChange={(val) => onUpdate({ allowFollowing: val })} />} 
      />
      <SettingItem label="Who can send you chat requests" value={settings.chatRequests} hasArrow />
      <SettingItem label="Blocked accounts" hasArrow />
    </Section>

    <Section title="Advertising">
      <SettingItem 
        label="Personalize ads based on information from our partners" 
        action={<Toggle active={settings.personalizeAds} onChange={(val) => onUpdate({ personalizeAds: val })} />} 
      />
    </Section>

    <Section title="Advanced">
      <SettingItem label="Third-party app authorizations" action={<IoArrowRedoOutline size={18} className="text-gray-500" />} />
      <SettingItem 
        label="Clear history" 
        sublabel="Delete your post views history" 
        action={<button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-[13px] font-bold transition-all">Clear</button>} 
      />
    </Section>
  </div>
);

/* ── Preferences Tab ───────────────────────────────────────────── */
const PreferencesSettings = ({ settings, onUpdate }: any) => (
  <div className="space-y-10">
    <Section title="Language">
      <SettingItem label="Display language" value={settings.displayLanguage} hasArrow />
      <SettingItem label="Content languages" sublabel="Content in the listed languages won't be translated" value={settings.contentLanguages?.length || "0"} hasArrow />
    </Section>

    <Section title="Content">
      <SettingItem 
        label="Show mature content (I'm over 18)" 
        sublabel="See Not Safe for Work content in your feeds" 
        action={<Toggle active={settings.showMatureContent} onChange={(val) => onUpdate({ showMatureContent: val })} />} 
      />
      <SettingItem 
        label="Show recommendations in home feed" 
        action={<Toggle active={settings.showRecommendations} onChange={(val) => onUpdate({ showRecommendations: val })} />} 
      />
      <SettingItem label="Muted communities" hasArrow />
    </Section>

    <Section title="Accessibility">
      <SettingItem 
        label="Autoplay media" 
        action={<Toggle active={settings.autoplayMedia} onChange={(val) => onUpdate({ autoplayMedia: val })} />} 
      />
      <SettingItem 
        label="Reduce Motion" 
        action={<Toggle active={settings.reduceMotion} onChange={(val) => onUpdate({ reduceMotion: val })} />} 
      />
    </Section>

    <Section title="Experience">
      <SettingItem label="Display Mode" value={settings.displayMode} hasArrow />
      <SettingItem 
        label="Use community themes" 
        action={<Toggle active={settings.useCommunityThemes} onChange={(val) => onUpdate({ useCommunityThemes: val })} />} 
      />
      <SettingItem 
        label="Open posts in new tab" 
        action={<Toggle active={settings.openInNewTab} onChange={(val) => onUpdate({ openInNewTab: val })} />} 
      />
      <SettingItem label="Default feed view" value={settings.defaultFeedView} hasArrow />
    </Section>
  </div>
);

/* ── Notifications Tab ─────────────────────────────────────────── */
const NotificationsSettings = ({ settings, onUpdate }: any) => (
  <div className="space-y-10">
    <Section title="General">
      <SettingItem label="Community notifications" hasArrow />
      <SettingItem 
        label="Web push notifications" 
        action={<Toggle active={settings.webPushNotifications} onChange={(val) => onUpdate({ webPushNotifications: val })} />} 
      />
    </Section>

    <Section title="Activity">
      <SettingItem 
        label="Mentions" 
        action={<Toggle active={settings.activity?.mentions} onChange={(val) => onUpdate({ activity: { mentions: val } })} />} 
      />
      <SettingItem 
        label="Comments" 
        action={<Toggle active={settings.activity?.comments} onChange={(val) => onUpdate({ activity: { comments: val } })} />} 
      />
      <SettingItem 
        label="Upvotes" 
        action={<Toggle active={settings.activity?.upvotesPosts} onChange={(val) => onUpdate({ activity: { upvotesPosts: val } })} />} 
      />
    </Section>
  </div>
);

/* ── Reusable Components ───────────────────────────────────────── */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-4">{title}</h2>
    <div className="flex flex-col">{children}</div>
  </div>
);

const SettingItem: React.FC<{ 
  label: string; 
  sublabel?: string; 
  value?: string; 
  hasArrow?: boolean;
  action?: React.ReactNode;
  isEditable?: boolean;
  onSave?: (val: string) => void;
}> = ({ label, sublabel, value, hasArrow, action, isEditable, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value === "Set name" || value === "Set description" ? "" : value || "");

  const handleSave = () => {
    if (onSave) onSave(inputValue);
    setEditing(false);
  };

  return (
    <div className={`py-4 border-b border-transparent transition-all ${editing ? '' : 'group cursor-pointer hover:border-white/5'}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col min-w-0 pr-4 flex-1">
          <span className="text-[14px] font-bold text-white group-hover:text-[#FF5722] transition-colors">{label}</span>
          {sublabel && <span className="text-[12px] text-gray-500 leading-tight mt-1">{sublabel}</span>}
          
          {editing && (
            <div className="mt-4 flex items-center gap-2 animate-in fade-in zoom-in duration-200">
              <input 
                autoFocus
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-[#1A1D23] text-white text-[14px] px-3 py-2 rounded-[8px] border border-white/10 outline-none focus:border-[#FF5722] w-full max-w-[400px]"
                placeholder={`Enter ${label}...`}
              />
              <button 
                onClick={handleSave}
                className="bg-[#FF5722] text-white px-4 py-2 rounded-full text-[13px] font-bold hover:bg-[#E64A19] transition-all"
              >
                Save
              </button>
              <button 
                onClick={() => setEditing(false)}
                className="text-gray-500 text-[13px] hover:text-white px-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        
        {!editing && (
          <div className="flex items-center gap-3 shrink-0" onClick={() => isEditable && setEditing(true)}>
            {value && <span className="text-[14px] text-gray-400">{value}</span>}
            {hasArrow && <IoChevronForwardOutline className="text-gray-500" size={18} />}
            {action && action}
          </div>
        )}
      </div>
    </div>
  );
};

const Toggle: React.FC<{ active: boolean; disabled?: boolean; onChange?: (val: boolean) => void }> = ({ active, disabled, onChange }) => (
  <div 
    onClick={() => !disabled && onChange && onChange(!active)}
    className={`w-[40px] h-[22px] rounded-full relative transition-all ${
      disabled ? 'bg-white/5 cursor-not-allowed' : 
      active ? 'bg-[#FF5722] cursor-pointer' : 'bg-white/10 cursor-pointer'
    }`}
  >
    <div className={`absolute top-[3px] w-[16px] h-[16px] rounded-full bg-white transition-all shadow-md flex items-center justify-center ${
      active ? 'left-[21px]' : 'left-[3px]'
    }`}>
      {active && <IoCheckmarkOutline size={10} className="text-[#FF5722] stroke-[3px]" />}
    </div>
  </div>
);

export default SettingsPage;

