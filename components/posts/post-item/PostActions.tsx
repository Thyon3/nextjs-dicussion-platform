import React from "react";
import { FiShare2 } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { LuTrash } from "react-icons/lu";
import { FaRegCommentAlt } from "react-icons/fa";

interface PostActionsProps {
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  loadingDelete: boolean;
  userIsCreator: boolean;
  userIsAdmin: boolean;
  postLink: string;
  handleSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSaved: boolean;
  showToast: (options: any) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  handleDelete,
  loadingDelete,
  userIsCreator,
  userIsAdmin,
  postLink,
  handleSave,
  isSaved,
  showToast,
}) => {
  const copyToClipboard = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(postLink);
    showToast({
      title: "Link Copied",
      description: "Link to the post has been saved to your clipboard",
      status: "info",
    });
  };

  return (
    <div className="flex flex-row gap-1 p-2 ml-1 mb-1 font-bold text-muted-foreground">
      <button
        className="flex items-center gap-2 h-[32px] px-3 rounded-md hover:bg-muted hover:text-foreground transition-all text-[9pt]"
      >
        <FaRegCommentAlt className="text-[16px]" />
        <span>Comments</span>
      </button>

      <button
        className="flex items-center gap-2 h-[32px] px-3 rounded-md hover:bg-muted hover:text-foreground transition-all text-[9pt]"
        onClick={copyToClipboard}
      >
        <FiShare2 className="text-[18px]" />
        <span>Share</span>
      </button>

      <button
        className={`flex items-center gap-2 h-[32px] px-3 rounded-md hover:bg-muted transition-all text-[9pt] ${
          isSaved ? "text-[#FF8A65]" : "hover:text-foreground"
        }`}
        onClick={handleSave}
      >
        {isSaved ? <BsBookmarkFill className="text-[18px]" /> : <BsBookmark className="text-[18px]" />}
        <span>{isSaved ? "Saved" : "Save"}</span>
      </button>

      {(userIsCreator || userIsAdmin) && (
        <button
          className="flex items-center gap-2 h-[32px] px-3 rounded-md hover:bg-red-900/50 hover:text-red-200 transition-all text-[9pt]"
          onClick={handleDelete}
          disabled={loadingDelete}
        >
          <LuTrash className="text-[18px]" />
          <span>{loadingDelete ? "Deleting..." : "Delete"}</span>
        </button>
      )}
    </div>
  );
};

export default PostActions;
