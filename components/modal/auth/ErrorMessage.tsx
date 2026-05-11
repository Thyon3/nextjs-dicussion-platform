import React from "react";
import { Text } from "@chakra-ui/react";

interface ErrorMessageProps {
  error: { message: string } | undefined;
}

/**
 * Displays error messages in the auth block.
 * @param error - Error object containing a message string.
 * @returns Text element when an error exists, otherwise null.
 */
const AuthenticationErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return error ? (
    <Text textAlign="center" color="red" fontSize="10pt" fontWeight="800">
      {error.message}
    </Text>
  ) : null;
};

export default AuthenticationErrorMessage;

