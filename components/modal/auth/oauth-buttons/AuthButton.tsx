import React from "react";

interface AuthButtonProps {
  provider: string;
  loading: boolean;
  onClick: () => void;
  image: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  provider,
  loading,
  onClick,
  image,
}) => {
  return (
    <button
      className={`flex items-center justify-center flex-1 h-[40px] px-4 border border-white/20 rounded-full text-foreground font-bold text-[14px] hover:bg-muted transition-all gap-2 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={loading}
    >
      <img
        src={image}
        alt={`Continue with ${provider}`}
        className="h-[20px] w-auto"
      />
      <span>
        {loading ? "Connecting..." : provider}
      </span>
    </button>
  );
};

export default AuthButton;
