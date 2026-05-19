'use client';

import React, { useState } from 'react';
import { Comment } from '@/types/comment';
import { IoChevronUpOutline, IoChevronDownOutline, IoPeopleCircleOutline } from 'react-icons/io5';
import { FaRegCommentAlt } from 'react-icons/fa';
import moment from 'moment';
import CommentInput from './CommentInput';

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  allComments: Comment[];
  onCreateComment: (text: string, parentId?: string, depth?: number) => Promise<boolean>;
  onDeleteComment: (comment: Comment) => Promise<boolean>;
  loading: boolean;
  userIsCreator?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  replies,
  allComments,
  onCreateComment,
  onDeleteComment,
  loading,
  userIsCreator = false
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleReply = async (text: string) => {
    return await onCreateComment(text, comment.id, comment.depth + 1);
  };

  if (isCollapsed) {
    return (
      <div className="flex items-center gap-2 py-2">
        <button 
          onClick={() => setIsCollapsed(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="w-5 h-5 flex items-center justify-center border border-gray-600 rounded-sm">
            <span className="text-[14px] font-bold">+</span>
          </div>
        </button>
        <span className="text-[12px] font-bold text-muted-foreground">u/{comment.creatorDisplayText}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* ── Main Comment Body ──────────────────────────────── */}
      <div className="flex gap-3 py-3">
        {/* Left Rail (Avatar + Hierarchy Line) */}
        <div className="flex flex-col items-center shrink-0 w-8">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mb-2 overflow-hidden border border-border">
             {comment.creatorPhotoURL ? (
               <img src={comment.creatorPhotoURL} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
               <IoPeopleCircleOutline size={28} className="text-muted-foreground" />
             )}
          </div>
          <div className="flex-1 w-full flex justify-center">
            <button 
              onClick={() => setIsCollapsed(true)}
              title="Collapse thread"
              className="group w-[2px] bg-muted hover:bg-[#FF5722]/50 transition-colors relative cursor-pointer"
            >
              <div className="absolute top-0 bottom-0 left-[-8px] right-[-8px]" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[13px] font-bold text-foreground hover:underline cursor-pointer">
              u/{comment.creatorDisplayText}
            </span>
            <span className="text-gray-600 text-[12px]">•</span>
            <span className="text-[12px] text-muted-foreground">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {/* Text */}
          <div className="text-[14px] text-gray-200 leading-relaxed mb-2 whitespace-pre-wrap">
            {comment.text}
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-muted rounded-full px-1">
               <button className="p-1.5 hover:bg-muted rounded-full text-muted-foreground hover:text-[#FF4500] transition-colors">
                 <IoChevronUpOutline size={16} />
               </button>
               <span className="text-[12px] font-bold text-gray-300 px-1">0</span>
               <button className="p-1.5 hover:bg-muted rounded-full text-muted-foreground hover:text-[#7193FF] transition-colors">
                 <IoChevronDownOutline size={16} />
               </button>
            </div>

            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-muted-foreground hover:bg-muted rounded-full transition-all"
            >
              <FaRegCommentAlt size={12} />
              <span>Reply</span>
            </button>
            
            <button className="px-3 py-1.5 text-[12px] font-bold text-muted-foreground hover:bg-muted rounded-full transition-all">
              Share
            </button>
          </div>

          {/* Reply Input */}
          {isReplying && (
            <div className="mt-4 mb-2 ml-1">
              <CommentInput 
                autoFocus
                placeholder={`Reply to u/${comment.creatorDisplayText}`}
                onCreateComment={handleReply}
                loading={loading}
                onCancel={() => setIsReplying(false)}
              />
            </div>
          )}

          {/* Nested Replies */}
          {replies.length > 0 && (
            <div className="mt-2 flex flex-col">
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  replies={allComments.filter((c) => c.parentId === reply.id)}
                  allComments={allComments}
                  onCreateComment={onCreateComment}
                  onDeleteComment={onDeleteComment}
                  loading={loading}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
