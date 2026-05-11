'use client';

import React, { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { useAuth, useAuthModal } from '../hooks/useAuth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPassword from './ResetPassword';

/**
 * Auth modal — driven entirely by the Zustand auth store.
 * Auto-closes when a user becomes authenticated.
 * Renders the correct form based on modal.view state.
 */
const AuthModal: React.FC = () => {
  const { user } = useAuth();
  const { modal, closeModal } = useAuthModal();

  // Auto-close when user logs in
  useEffect(() => {
    if (user) closeModal();
  }, [user, closeModal]);

  return (
    <DialogRoot
      open={modal.open}
      onOpenChange={({ open }: { open: boolean }) => {
        if (!open) closeModal();
      }}
    >
      <DialogBackdrop bg="rgba(0, 0, 0, 0.4)" backdropFilter="blur(6px)" />
      <DialogPositioner>
        <DialogContent borderRadius={10}>
          <DialogHeader textAlign="center">
            <DialogTitle>
              {modal.view === 'login' && 'Log In'}
              {modal.view === 'signup' && 'Sign Up'}
              {modal.view === 'resetPassword' && 'Reset Password'}
            </DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger position="absolute" top={2} right={2} />
          <DialogBody display="flex" flexDirection="column" alignItems="center" pb={6}>
            <Flex direction="column" align="center" justify="center" width="75%">
              {modal.view === 'login' && <LoginForm />}
              {modal.view === 'signup' && <RegisterForm />}
              {modal.view === 'resetPassword' && <ResetPassword />}
            </Flex>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

export default AuthModal;
