import { savedPostStateAtom } from "@/atoms/savedPostsAtom";
import useSavedPosts from "@/hooks/posts/useSavedPosts";
import { useAtom } from "jotai";
import Link from "next/link";
import React from "react";
import { LuTrash } from "react-icons/lu";
import { FaReddit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SavedPostsModal: React.FC = () => {
  const [savedPostState, setSavedPostState] = useAtom(savedPostStateAtom);
  const { onRemoveSavedPost } = useSavedPosts();

  const handleClose = () => {
    setSavedPostState((prev) => ({ ...prev, isOpen: false }));
  };

  if (!savedPostState.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-card w-full max-w-[550px] max-h-[80vh] rounded-[16px] border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-bold text-foreground">
            Saved Posts
          </h2>
          <button 
            onClick={handleClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="px-6 pb-8 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-4">
            {savedPostState.savedPosts.length === 0 ? (
              <p className="text-muted-foreground text-center py-10 font-medium">
                No saved posts yet.
              </p>
            ) : (
              savedPostState.savedPosts.map((item) => (
                <div
                  key={item.postId}
                  className="p-4 bg-muted border border-border rounded-[12px] flex items-center justify-between hover:border-white/30 transition-all group"
                >
                  <div className="flex items-center flex-1 gap-4">
                    {item.communityImageURL ? (
                      <img
                        src={item.communityImageURL}
                        className="w-[40px] h-[40px] rounded-full object-cover border border-border"
                        alt="Community Image"
                      />
                    ) : (
                      <div className="w-[40px] h-[40px] rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <FaReddit size={24} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <Link
                        href={`/community/${item.communityId}/comments/${item.postId}`}
                        onClick={handleClose}
                        className="text-foreground font-bold text-[16px] hover:underline leading-tight"
                      >
                        {item.postTitle}
                      </Link>
                      <Link
                        href={`/community/${item.communityId}`}
                        onClick={handleClose}
                        className="text-muted-foreground text-[12px] font-semibold hover:underline mt-0.5"
                      >
                        r/{item.communityId}
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveSavedPost(item.postId)}
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all ml-2"
                    title="Remove from saved"
                  >
                    <LuTrash size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPostsModal;
