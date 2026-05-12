import React from "react";
import { IoAlertCircle } from "react-icons/io5";

type Props = {
  error: boolean;
};

const PostCreateError: React.FC<Props> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="p-4 mt-2 bg-red-500/10 border border-red-500/20 rounded-[10px] flex items-center gap-3">
      <IoAlertCircle className="text-red-500 text-xl shrink-0" />
      <span className="text-red-500 text-[14px] font-bold">
        There has been an error when creating your post
      </span>
    </div>
  );
};

export default PostCreateError;
