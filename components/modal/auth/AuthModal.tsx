"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { authModalStateAtom } from "@/atoms/authModalAtom";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  Flex,
  Separator,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthInputs from "./AuthInputs";
import ResetPassword from "./ResetPassword";

/**
 * Auth modal that switches between login, signup, and reset views based on atom state.
 * Auto-closes when auth yields a user.
 * @returns Dialog shell with auth form or reset password flow.
 */
const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useAtom(authModalStateAtom);
  const { user } = useAuth();

  /**
   * If a user is authenticated, modal will automatically close.
   */
  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  /**
   * Closes authentication modal by setting its state to `open` state to false.
   */
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <DialogRoot
      open={modalState.open}
      onOpenChange={({ open }: { open: boolean }) => {
        if (!open) handleClose();
      }}
    >
      <DialogBackdrop bg="rgba(0, 0, 0, 0.4)" backdropFilter="blur(6px)" />
      <DialogPositioner>
        <DialogContent borderRadius={10}>
          <DialogHeader textAlign="center">
            <DialogTitle>
              {modalState.view === "login" && "Login"}
              {modalState.view === "signup" && "Sign Up"}
              {modalState.view === "resetPassword" && "Reset Password"}
            </DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger position="absolute" top={2} right={2} />
          <DialogBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="75%"
            >
              {/* If user is trying to authenticate (log in or sign up) */}
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <AuthInputs />
                </>
              ) : (
                // If user is trying to reset password
                <ResetPassword />
              )}
            </Flex>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

export default AuthModal;

