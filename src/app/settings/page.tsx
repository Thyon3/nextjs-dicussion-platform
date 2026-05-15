'use client';

import React, { useState } from 'react';
import { 
  IoChevronForwardOutline, 
  IoLogoGoogle, 
  IoLogoApple, 
  IoArrowRedoOutline,
  IoCheckmarkOutline,
  IoMoonOutline,
  IoLanguageOutline
} from 'react-icons/io5';

type TabType = 'Account' | 'Profile' | 'Privacy' | 'Preferences' | 'Notifications' | 'Email';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Account');

  const tabs: TabType[] = ['Account', 'Profile', 'Privacy', 'Preferences', 'Notifications', 'Email'];

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
          {activeTab === 'Account' && <AccountSettings />}
          {activeTab === 'Profile' && <ProfileSettings />}
          {activeTab === 'Privacy' && <PrivacySettings />}
          {activeTab === 'Preferences' && <PreferencesSettings />}
          {activeTab === 'Notifications' && <NotificationsSettings />}
          {activeTab === 'Email' && <div className="text-gray-500 italic py-10">Email settings UI coming soon...</div>}
        </div>
      </div>
    </div>
  );
};

/* ── Profile Tab ───────────────────────────────────────────────── */
const ProfileSettings = () => (
  <div className="space-y-10">
    <Section title="Profile Information">
      <SettingItem label="Display name (optional)" sublabel="Set a display name that is shown instead of your username" value="Set name" hasArrow />
      <SettingItem label="About (optional)" sublabel="A brief description of yourself shown on your profile" value="Set description" hasArrow />
      <SettingItem label="Social links" sublabel="Add links to your social media profiles" value="0" hasArrow />
    </Section>

    <Section title="Images">
      <SettingItem label="Avatar and banner" sublabel="Images shown on your profile" hasArrow />
    </Section>

    <Section title="Profile Visibility">
      <SettingItem label="NSFW" sublabel="Mark your profile as Not Safe for Work" action={<Toggle active={false} />} />
      <SettingItem label="Active in communities visibility" sublabel="Show which communities you are active in on your profile" action={<Toggle active={true} />} />
      <SettingItem label="Content visibility" sublabel="Allow your posts to be visible in search results and r/all" action={<Toggle active={true} />} />
    </Section>
  </div>
);

/* ── Account Tab ───────────────────────────────────────────────── */
const AccountSettings = () => (
  <div className="space-y-10">
    <Section title="General">
      <SettingItem label="Email address" value="user@example.com" hasArrow />
      <SettingItem label="Gender" value="Man" hasArrow />
      <SettingItem label="Location customization" value="Use approximate location (based on IP)" hasArrow />
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
      <SettingItem label="Two-factor authentication" action={<Toggle active={false} />} />
    </Section>

    <Section title="Apps">
      <SettingItem label="App settings" value="0" hasArrow />
      <SettingItem label="Learn about Developer Platform" action={<IoArrowRedoOutline size={18} className="text-gray-500" />} />
    </Section>

    <Section title="Reddit Premium">
      <SettingItem label="Get premium" hasArrow />
    </Section>

    <Section title="Advanced">
      <SettingItem label="Delete account" hasArrow />
    </Section>
  </div>
);

/* ── Privacy Tab ───────────────────────────────────────────────── */
const PrivacySettings = () => (
  <div className="space-y-10">
    <Section title="Social interactions">
      <SettingItem label="Allow people to follow you" sublabel="Let people follow you to see your profile posts in their home feed" action={<Toggle active={true} />} />
      <SettingItem label="Who can send you chat requests" value="Everyone" hasArrow />
      <SettingItem label="Blocked accounts" hasArrow />
    </Section>

    <Section title="Discoverability">
      <SettingItem label="List your profile on old.reddit.com/users" sublabel="List your profile and allow posts to appear in r/all" action={<Toggle active={true} />} />
      <SettingItem label="Show up in search results" sublabel="Allow search engines like Google to link to your profile" action={<Toggle active={true} />} />
    </Section>

    <Section title="Advertising">
      <SettingItem label="Personalize ads based on information from our partners" action={<Toggle active={true} />} />
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
const PreferencesSettings = () => (
  <div className="space-y-10">
    <Section title="Language">
      <SettingItem label="Display language" value="English (US)" hasArrow />
      <SettingItem label="Content languages" sublabel="Content in the listed languages won't be translated" value="1" hasArrow />
    </Section>

    <Section title="Content">
      <SettingItem label="Show mature content (I'm over 18)" sublabel="See Not Safe for Work content in your feeds" action={<Toggle active={false} />} />
      <SettingItem label="Blur mature (18+) images and media" action={<Toggle active={false} disabled />} />
      <SettingItem label="Show recommendations in home feed" action={<Toggle active={true} />} />
      <SettingItem label="Muted communities" hasArrow />
    </Section>

    <Section title="Accessibility">
      <SettingItem label="Autoplay media" action={<Toggle active={true} />} />
      <SettingItem label="Reduce Motion" action={<Toggle active={false} />} />
    </Section>

    <Section title="Experience">
      <SettingItem label="Display Mode" value="Auto (follow system settings)" hasArrow />
      <SettingItem label="Use community themes" action={<Toggle active={true} />} />
      <SettingItem label="Open posts in new tab" action={<Toggle active={false} />} />
      <SettingItem label="Default feed view" value="Card" hasArrow />
    </Section>
  </div>
);

/* ── Notifications Tab ─────────────────────────────────────────── */
const NotificationsSettings = () => (
  <div className="space-y-10">
    <Section title="General">
      <SettingItem label="Community notifications" hasArrow />
      <SettingItem label="Web push notifications" action={<Toggle active={false} disabled />} />
    </Section>

    <Section title="Messages">
      <SettingItem label="Chat messages" value="All on" hasArrow />
      <SettingItem label="Chat requests" value="All on" hasArrow />
      <SettingItem 
        label="Mark all as read" 
        sublabel="Mark all chat conversations as read" 
        action={<button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-[13px] font-bold transition-all">Mark as read</button>} 
      />
    </Section>

    <Section title="Activity">
      <SettingItem label="Mentions of u/username" value="All on" hasArrow />
      <SettingItem label="Comments on your posts" value="All on" hasArrow />
      <SettingItem label="Upvotes on your posts" value="All on" hasArrow />
      <SettingItem label="New followers" value="All on" hasArrow />
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
}> = ({ label, sublabel, value, hasArrow, action }) => (
  <div className="flex items-center justify-between py-4 group cursor-pointer border-b border-transparent hover:border-white/5 transition-all">
    <div className="flex flex-col min-w-0 pr-4">
      <span className="text-[14px] font-bold text-white group-hover:text-[#FF5722] transition-colors">{label}</span>
      {sublabel && <span className="text-[12px] text-gray-500 leading-tight mt-1">{sublabel}</span>}
    </div>
    <div className="flex items-center gap-3 shrink-0">
      {value && <span className="text-[14px] text-gray-400">{value}</span>}
      {hasArrow && <IoChevronForwardOutline className="text-gray-500" size={18} />}
      {action && action}
    </div>
  </div>
);

const Toggle: React.FC<{ active: boolean; disabled?: boolean }> = ({ active, disabled }) => (
  <div className={`w-[40px] h-[22px] rounded-full relative transition-all ${
    disabled ? 'bg-white/5 cursor-not-allowed' : 
    active ? 'bg-[#FF5722] cursor-pointer' : 'bg-white/10 cursor-pointer'
  }`}>
    <div className={`absolute top-[3px] w-[16px] h-[16px] rounded-full bg-white transition-all shadow-md flex items-center justify-center ${
      active ? 'left-[21px]' : 'left-[3px]'
    }`}>
      {active && <IoCheckmarkOutline size={10} className="text-[#FF5722] stroke-[3px]" />}
    </div>
  </div>
);

export default SettingsPage;
