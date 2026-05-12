import React from "react";
import { IoAlertCircle } from "react-icons/io5";

interface PostItemErrorProps {
  error: boolean;
  message: string;
}

const PostItemError: React.FC<PostItemErrorProps> = ({ error, message }) => {
  if (!error) return null;

  return (
    <div className="flex items-center justify-center w-full p-2">
      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-[10px] w-[95%]">
        <IoAlertCircle className="text-xl shrink-0" />
        <span className="text-[14px] font-bold">
          {message}
        </span>
      </div>
    </div>
  );
};

export default PostItemError;
