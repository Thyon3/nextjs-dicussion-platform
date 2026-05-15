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
  IoShieldCheckmarkOutline
} from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { updateProfileImage } from '../api/userApi';
import useCustomToast from '@/hooks/useCustomToast';

const UserMenu: React.FC = () => {
  const { user, logout, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showToast = useCustomToast();

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
        className="flex items-center gap-1 p-1 pr-2 rounded-full hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/10">
          {user.photoURL ? (
            <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
          ) : (
            <IoPersonCircleOutline size={30} className="text-gray-400" />
          )}
        </div>
        <IoChevronDownOutline size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[280px] bg-[#1A1D23] border border-white/10 rounded-xl shadow-2xl z-[1000] overflow-hidden py-2 animate-in fade-in zoom-in duration-150">
          {/* User Info Header */}
          <div className="px-4 py-3 flex items-center gap-3 border-b border-white/5 mb-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/10">
               {user.photoURL ? (
                 <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
               ) : (
                 <IoPersonCircleOutline size={40} className="text-gray-400" />
               )}
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-[14px] font-bold text-white truncate">
                 {user.displayName || user.email?.split('@')[0]}
               </span>
               <span className="text-[12px] text-gray-500 truncate">u/{user.email?.split('@')[0]}</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col">
            <MenuBtn icon={<CgProfile size={20} />} label="View Profile" onClick={() => {}} />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-gray-300 hover:bg-white/5 transition-all w-full text-left"
            >
               <IoColorPaletteOutline size={20} className="text-gray-400" />
               <span>{isUploading ? 'Uploading...' : 'Edit Avatar'}</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />

            <div className="h-[1px] bg-white/5 my-2" />
            
            <MenuBtn icon={<IoShieldCheckmarkOutline size={20} />} label="Premium" onClick={() => {}} />
            <MenuBtn icon={<IoMegaphoneOutline size={20} />} label="Advertise" onClick={() => {}} />
            <MenuBtn icon={<IoSettingsOutline size={20} />} label="Settings" onClick={() => {}} />
            
            <div className="h-[1px] bg-white/5 my-2" />
            
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
    className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-gray-300 hover:bg-white/5 transition-all w-full text-left"
  >
     <div className="text-gray-400">{icon}</div>
     <span>{label}</span>
  </button>
);

export default UserMenu;
