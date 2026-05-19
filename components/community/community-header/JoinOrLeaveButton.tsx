import React from "react";

type JoinOrLeaveButtonProps = {
  isJoined: boolean;
  onClick: () => void;
  isLoading?: boolean;
};

const JoinOrLeaveButton: React.FC<JoinOrLeaveButtonProps> = ({
  isJoined,
  onClick,
  isLoading,
}) => {
  return (
    <button
      className={`h-[40px] px-6 rounded-full font-bold transition-all shadow-md w-[130px] flex items-center justify-center ${
        isJoined 
          ? "border border-white/30 text-foreground hover:bg-muted" 
          : "bg-[#FF5722] text-white hover:bg-[#E64A19]"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      ) : isJoined ? (
        "Unsubscribe"
      ) : (
        "Subscribe"
      )}
    </button>
  );
};

export default JoinOrLeaveButton;
