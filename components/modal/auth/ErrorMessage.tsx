import React from "react";

interface ErrorMessageProps {
  error: { message: string } | undefined;
}

const AuthenticationErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <p className="text-center text-red-500 text-[10pt] font-extrabold py-2">
      {error.message}
    </p>
  );
};

export default AuthenticationErrorMessage;
