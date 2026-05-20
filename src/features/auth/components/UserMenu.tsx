'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  IoChevronDownOutline, 
  IoPersonCircleOutline, 
  IoLogOutOutline, 
  IoSettingsOutline,
  IoColorPaletteOutline,
  IoMegaphoneOutline,
  IoShieldCheckmarkOutline,
  IoMoonOutline,
  IoSunnyOutline
} from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { updateProfileImage } from '../api/userApi';
import useCustomToast from '@/hooks/useCustomToast';
import { useColorMode } from '@/components/ui/color-mode';
import { useRouter } from 'next/navigation';

const UserMenu: React.FC = () => {
  const { user, logout, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showToast = useCustomToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const updatedUser = await updateProfileImage(file);
      setUser(updatedUser);
      showToast({
        title: 'Success',
        description: 'Profile picture updated successfully',
        status: 'success',
      });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      showToast({
        title: 'Error',
        description: 'Failed to update profile picture',
        status: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-1 pr-2 rounded-full hover:bg-muted transition-all border border-transparent hover:border-border"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border">
          {user.photoURL ? (
            <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
          ) : (
            <IoPersonCircleOutline size={30} className="text-muted-foreground" />
          )}
        </div>
        <IoChevronDownOutline size={14} className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[280px] bg-card border border-border rounded-xl shadow-2xl z-[1000] overflow-hidden py-2 animate-in fade-in zoom-in duration-150">
          {/* User Info Header */}
          <div className="px-4 py-3 flex items-center gap-3 border-b border-border mb-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border">
               {user.photoURL ? (
                 <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
               ) : (
                 <IoPersonCircleOutline size={40} className="text-muted-foreground" />
               )}
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-[14px] font-bold text-foreground truncate">
                 {user.displayName || user.email?.split('@')[0]}
               </span>
               <span className="text-[12px] text-muted-foreground truncate">u/{user.email?.split('@')[0]}</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col">
            <MenuBtn 
              icon={<CgProfile size={20} />} 
              label="View Profile" 
              onClick={() => {
                setIsOpen(false);
                router.push(`/user/${user.email?.split('@')[0]}`);
              }} 
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-foreground hover:bg-muted transition-all w-full text-left"
            >
               <IoColorPaletteOutline size={20} className="text-muted-foreground" />
               <span>{isUploading ? 'Uploading...' : 'Edit Avatar'}</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />

            <div className="h-[1px] bg-muted my-2" />
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleColorMode}
              className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-foreground hover:bg-muted transition-all w-full text-left"
            >
              {colorMode === 'dark' ? (
                <>
                  <IoSunnyOutline size={20} className="text-muted-foreground" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <IoMoonOutline size={20} className="text-muted-foreground" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <MenuBtn icon={<IoShieldCheckmarkOutline size={20} />} label="Premium" onClick={() => {}} />
            <MenuBtn icon={<IoMegaphoneOutline size={20} />} label="Advertise" onClick={() => {}} />
            <MenuBtn icon={<IoSettingsOutline size={20} />} label="Settings" onClick={() => {}} />
            
            <div className="h-[1px] bg-muted my-2" />
            
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-red-400 hover:bg-red-400/10 transition-all w-full text-left"
            >
               <IoLogOutOutline size={20} />
               <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuBtn: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-foreground hover:bg-muted transition-all w-full text-left"
  >
     <div className="text-muted-foreground">{icon}</div>
     <span>{label}</span>
  </button>
);

export default UserMenu;
