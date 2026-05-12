'use client';

import React from 'react';
import useComments from '../hooks/useComments';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

interface CommentSectionProps {
  postId: string;
  communityId: string;
  postTitle: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  communityId,
  postTitle
}) => {
  const { comments, loading, createLoading, onCreateComment, onDeleteComment } = 
    useComments(postId, communityId, postTitle);

  // Group comments for hierarchical rendering
  // Top-level comments have no parentId
  const topLevelComments = comments.filter((c) => !c.parentId);

  return (
    <div className="flex flex-col gap-6 w-full py-6">
      {/* ── Input Header ──────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <CommentInput 
          onCreateComment={(text) => onCreateComment(text)}
          loading={createLoading}
        />
      </div>

      {/* ── Sort / Divider ────────────────────────────────── */}
      <div className="h-[1px] bg-white/10 w-full my-2" />

      {/* ── Comment List ─────────────────────────────────── */}
      <div className="flex flex-col">
        {loading ? (
          <div className="flex flex-col gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-white/5" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-32 bg-white/5 rounded" />
                  <div className="h-20 w-full bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
               <span className="text-2xl">💬</span>
            </div>
            <p className="text-[16px] font-bold text-gray-500">No comments yet</p>
            <p className="text-[13px] text-gray-600">Be the first to share what you think!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {topLevelComments.map((comment) => (
              <CommentItem 
                key={comment.id}
                comment={comment}
                replies={comments.filter((c) => c.parentId === comment.id)}
                allComments={comments}
                onCreateComment={onCreateComment}
                onDeleteComment={onDeleteComment}
                loading={createLoading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
