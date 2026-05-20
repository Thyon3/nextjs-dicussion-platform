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

  const [isFocused, setIsFocused] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border border-border rounded-full max-w-[750px]">
        <p className="text-[14px] text-muted-foreground">Log in or sign up to leave a comment</p>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 text-[13px] font-bold text-foreground border border-white/20 rounded-full hover:bg-muted transition-all">
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
    <div className="flex flex-col gap-2 w-full max-w-[750px]">
      <div 
        className={`relative border rounded-[10px] bg-card transition-all overflow-hidden ${
          isFocused ? 'border-[#FF5722] ring-1 ring-[#FF5722]/10 shadow-sm' : 'border-border hover:border-white/30'
        }`}
      >
        <textarea
          autoFocus={autoFocus}
          value={text}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none resize-none min-h-[44px]"
          rows={Math.max(1, text.split('\n').length)}
        />
        
        {(text.trim() || isFocused || onCancel) && (
          <div className="flex justify-end p-2 border-t border-border bg-muted/20 animate-in fade-in duration-200">
            <div className="flex gap-2">
              {onCancel && (
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onCancel}
                  className="px-4 py-1 text-[12px] font-bold text-muted-foreground hover:bg-muted rounded-full transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                disabled={!text.trim() || loading}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleSubmit}
                className={`px-4 py-1 text-[12px] font-bold text-foreground rounded-full transition-all ${
                  !text.trim() || loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#FF5722] hover:bg-[#E64A19]'
                }`}
              >
                {loading ? 'Posting...' : 'Comment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
