import React from "react";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { LuTrash } from "react-icons/lu";
import moment from "moment";
import Link from "next/link";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  userIsCreator: boolean;
  userIsAdmin?: boolean;
  userVoteValue?: number;
  isSaved?: boolean;
  singlePostPage?: boolean;
  loadingImage: boolean;
  loadingDelete: boolean;
  onVote: (
    event: React.MouseEvent<any, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onSelectPost?: (post: Post) => void;
  onSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onShare: (event: React.MouseEvent) => void;
  setLoadingImage: (v: boolean) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  userIsCreator,
  userIsAdmin = false,
  userVoteValue,
  isSaved,
  singlePostPage,
  loadingImage,
  loadingDelete,
  onVote,
  onSelectPost,
  onSave,
  onDelete,
  onShare,
  setLoadingImage,
}) => {
  const voteColor =
    userVoteValue === 1
      ? "text-[#FF4500]"
      : userVoteValue === -1
      ? "text-[#7193FF]"
      : "text-gray-300";

  return (
    <div
      className={`flex bg-transparent rounded-[12px] transition-all ${
        singlePostPage ? "cursor-default" : "cursor-pointer hover:bg-[#1A1D23]"
      }`}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      {/* ── Vote Rail ────────────────────────────────────── */}
      <div className="flex flex-col items-center py-2 px-2 w-[40px] shrink-0 rounded-l-[12px]">
        <button
          className={`p-1 rounded transition-colors hover:bg-white/10 ${
            userVoteValue === 1 ? "text-[#FF4500]" : "text-gray-400 hover:text-[#FF4500]"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onVote(e, post, 1, post.communityId);
          }}
        >
          <IoChevronUpOutline size={18} />
        </button>
        <span className={`text-[11px] font-bold my-0.5 ${voteColor}`}>
          {post.voteStatus || 0}
        </span>
        <button
          className={`p-1 rounded transition-colors hover:bg-white/10 ${
            userVoteValue === -1 ? "text-[#7193FF]" : "text-gray-400 hover:text-[#7193FF]"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onVote(e, post, -1, post.communityId);
          }}
        >
          <IoChevronDownOutline size={18} />
        </button>
      </div>

      {/* ── Post Content ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 py-2 pr-2">
        {/* Meta line: community • author • time */}
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          {post.communityImageURL ? (
            <img
              src={post.communityImageURL}
              alt={post.communityId}
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
          ) : (
            <IoPeopleCircleOutline size={18} className="text-[#FF5722] shrink-0" />
          )}
          <Link
            href={`/community/${post.communityId}`}
            onClick={(e) => e.stopPropagation()}
            className="text-[12px] font-bold text-white hover:underline"
          >
            r/{post.communityId}
          </Link>
          <span className="text-gray-600 text-[12px]">•</span>
          <span className="text-[12px] text-gray-500">
            Posted by{" "}
            <span className="hover:underline cursor-pointer">
              u/{post.creatorUsername}
            </span>
          </span>
          <span className="text-gray-600 text-[12px]">•</span>
          <span className="text-[12px] text-gray-500">
            {moment(post.createTime).fromNow()}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[15px] font-semibold text-white leading-snug mb-1.5">
          {post.title}
        </h2>

        {/* Body text */}
        {post.body && (
          <p className={`text-[13px] text-gray-400 leading-relaxed mb-2 ${singlePostPage ? "" : "line-clamp-3"}`}>
            {post.body}
          </p>
        )}

        {/* Image */}
        {post.imageURL && (
          <div className="relative flex justify-center items-center mb-2 min-h-[100px] max-h-[512px] overflow-hidden rounded-[8px] bg-black/20">
            {loadingImage && (
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
            )}
            <img
              src={post.imageURL}
              alt="Post"
              className={`max-w-full max-h-[512px] object-contain ${
                loadingImage ? "opacity-0" : "opacity-100"
              } transition-opacity`}
              onLoad={() => setLoadingImage(false)}
            />
          </div>
        )}

        {/* Video */}
        {post.videoURL && (
          <video
            src={post.videoURL}
            controls
            className="max-h-[512px] w-full rounded-[8px] mb-2 object-contain bg-black"
          />
        )}

        {/* Link */}
        {post.linkURL && (
          <a
            href={post.linkURL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block text-[12px] text-[#0DD3BB] hover:underline mb-2 truncate"
          >
            🔗 {post.linkURL}
          </a>
        )}

        {/* ── Action Bar ───────────────────────────────────── */}
        <div className="flex items-center gap-1 mt-0.5 -ml-1 flex-wrap">
          {/* Comments */}
          <ActionBtn 
            icon={<FaRegCommentAlt size={14} />} 
            label={`${post.numberOfComments || 0} ${post.numberOfComments === 1 ? 'Comment' : 'Comments'}`} 
            onClick={(e) => e.stopPropagation()} 
          />

          {/* Share */}
          <ActionBtn icon={<FiShare2 size={15} />} label="Share" onClick={onShare} />

          {/* Save */}
          <ActionBtn
            icon={
              isSaved ? (
                <BsBookmarkFill size={14} className="text-[#FF8A65]" />
              ) : (
                <BsBookmark size={14} />
              )
            }
            label={isSaved ? "Saved" : "Save"}
            onClick={onSave}
            className={isSaved ? "text-[#FF8A65]" : ""}
          />

          {/* Delete */}
          {(userIsCreator || userIsAdmin) && (
            <ActionBtn
              icon={<LuTrash size={14} />}
              label={loadingDelete ? "Deleting…" : "Delete"}
              onClick={onDelete}
              className="hover:!text-red-400 hover:!bg-red-900/30"
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Reusable action button ────────────────────────────────────── */
const ActionBtn: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}> = ({ icon, label, onClick, className = "" }) => (
  <button
    className={`flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-bold text-gray-500 hover:bg-white/10 hover:text-white rounded transition-all ${className}`}
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default PostCard;
