'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import dynamic from 'next/dynamic';

// Lazy-load the picker only on the client side (no SSR)
const EmojiPicker = dynamic(() => import('./EmojiPicker'), { ssr: false });

interface CommentInputProps {
  placeholder?: string;
  onCreateComment: (text: string) => Promise<boolean>;
  loading: boolean;
  onCancel?: () => void;
  autoFocus?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({
  placeholder = 'Join the conversation',
  onCreateComment,
  loading,
  onCancel,
  autoFocus = false,
}) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  /* ─── Insert emoji at cursor position ───────────────────── */
  const handleEmojiSelect = useCallback((emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setText((prev) => prev + emoji);
      return;
    }
    const start = textarea.selectionStart ?? text.length;
    const end = textarea.selectionEnd ?? text.length;
    const newText = text.slice(0, start) + emoji + text.slice(end);
    setText(newText);

    // Restore cursor position after emoji insert
    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPos = start + emoji.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  }, [text]);

  /* ─── Auto-grow textarea ─────────────────────────────────── */
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // auto-grow
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  /* ─── Submit ─────────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!text.trim()) return;
    const success = await onCreateComment(text);
    if (success) {
      setText('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
      if (onCancel) onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  /* ─── Not logged in banner ───────────────────────────────── */
  if (!user) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border border-border rounded-full max-w-[750px]">
        <p className="text-[14px] text-muted-foreground">
          Log in or sign up to leave a comment
        </p>
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

  const showActions = text.trim() || isFocused || !!onCancel;

  return (
    <div className="flex flex-col gap-2 w-full max-w-[750px]">
      <div
        className={`relative border rounded-[10px] bg-card transition-all overflow-visible ${
          isFocused
            ? 'border-[#FF5722] ring-1 ring-[#FF5722]/10 shadow-sm'
            : 'border-border hover:border-white/30'
        }`}
      >
        {/* ── Textarea ─────────────────────────────────────────── */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={1}
          className="w-full resize-none bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground px-4 pt-3 pb-2 pr-[48px] focus:outline-none min-h-[44px] max-h-[200px] overflow-y-auto"
          style={{ height: 'auto' }}
        />

        {/* ── Emoji Trigger Button (Telegram-style) ─────────────── */}
        <button
          id="emoji-picker-btn"
          type="button"
          title="Pick an emoji"
          onMouseDown={(e) => {
            e.preventDefault(); // prevent textarea blur
            setShowEmojiPicker((prev) => !prev);
          }}
          className={`absolute right-3 top-2.5 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 select-none z-10
            ${showEmojiPicker
              ? 'bg-[#FF5722]/20 text-[#FF5722]'
              : 'text-muted-foreground hover:text-[#FF5722] hover:bg-[#FF5722]/10'
            }`}
        >
          <span className="text-[20px] leading-none">😊</span>
        </button>

        {/* ── Emoji Picker Popover ──────────────────────────────── */}
        {showEmojiPicker && (
          <EmojiPicker
            onSelect={(emoji) => {
              handleEmojiSelect(emoji);
              // Keep picker open (like Telegram) — remove next line to close on pick
              // setShowEmojiPicker(false);
            }}
            onClose={() => setShowEmojiPicker(false)}
          />
        )}

        {/* ── Action bar (Cancel / Comment) ────────────────────── */}
        {showActions && (
          <div className="flex justify-between items-center px-3 py-2 border-t border-border bg-muted/20 animate-in fade-in duration-200">
            <span className="text-[11px] text-muted-foreground/60 select-none">
              Ctrl+Enter to post
            </span>
            <div className="flex gap-2">
              {onCancel && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onCancel}
                  className="px-4 py-1 text-[12px] font-bold text-muted-foreground hover:bg-muted rounded-full transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                disabled={!text.trim() || loading}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleSubmit}
                className={`px-4 py-1 text-[12px] font-bold text-foreground rounded-full transition-all ${
                  !text.trim() || loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#FF5722] hover:bg-[#E64A19]'
                }`}
              >
                {loading ? 'Posting…' : 'Comment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
