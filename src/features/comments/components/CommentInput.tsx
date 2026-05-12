'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface CommentInputProps {
  placeholder?: string;
  onCreateComment: (text: string) => Promise<boolean>;
  loading: boolean;
  onCancel?: () => void;
  autoFocus?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({
  placeholder = "Join the conversation",
  onCreateComment,
  loading,
  onCancel,
  autoFocus = false
}) => {
  const [text, setText] = useState('');
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!text.trim()) return;
    const success = await onCreateComment(text);
    if (success) {
      setText('');
      if (onCancel) onCancel();
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1D23] border border-white/10 rounded-full">
        <p className="text-[14px] text-gray-500">Log in or sign up to leave a comment</p>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 text-[13px] font-bold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all">
            Log In
          </button>
          <button className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#FF5722] rounded-full hover:bg-[#E64A19] transition-all">
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative border border-white/10 rounded-[20px] bg-[#161719] focus-within:border-white/30 transition-all overflow-hidden">
        <textarea
          autoFocus={autoFocus}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none resize-none min-h-[44px]"
          rows={Math.max(1, text.split('\n').length)}
        />
        
        <div className={`flex justify-end p-2 ${text.trim() ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          <div className="flex gap-2">
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-1 text-[12px] font-bold text-gray-400 hover:bg-white/5 rounded-full transition-all"
              >
                Cancel
              </button>
            )}
            <button
              disabled={!text.trim() || loading}
              onClick={handleSubmit}
              className={`px-4 py-1 text-[12px] font-bold text-white rounded-full transition-all ${
                !text.trim() || loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#FF5722] hover:bg-[#E64A19]'
              }`}
            >
              {loading ? 'Posting...' : 'Comment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
