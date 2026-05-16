import useCallCreatePost from "@/hooks/posts/useCallCreatePost";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import CreateCommunityModal from "../modal/create-community/CreateCommunityModal";

const PersonalHome: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { onClick } = useCallCreatePost();

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col bg-[#1A1D23] rounded-[12px] border border-white/10 sticky top-[60px]">
        <div className="flex items-center p-3 px-4 bg-gradient-to-r from-[#FF8A65] to-[#FF5722] h-[50px] rounded-t-[12px]">
          <div className="bg-white/20 p-2 rounded-lg mr-3 border border-white/30 flex items-center justify-center">
            <AiFillHome className="text-white text-[20px]" />
          </div>
          <span className="font-reddit font-bold text-white text-[14pt]">
            Home
          </span>
        </div>
        
        <div className="flex flex-col p-4">
          <p className="text-[10pt] text-gray-400 mb-6">
            Home page personalized based on your subscribed communities. Circus represents a shift back to intentional spaces.
          </p>
          
          <div className="flex flex-col gap-3">
            <button 
              className="font-reddit h-[38px] bg-white text-black hover:bg-gray-200 font-bold rounded-full transition-colors"
              onClick={onClick}
            >
              Create Post
            </button>
            <button
              className="font-reddit h-[38px] text-white border border-white/30 hover:bg-white/10 font-bold rounded-full transition-colors"
              onClick={() => setOpen(true)}
            >
              Create Community
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalHome;
