'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useAuthModal } from '@/src/features/auth';
import LoginForm from '@/src/features/auth/components/LoginForm';
import RegisterForm from '@/src/features/auth/components/RegisterForm';

/**
 * AuthInputs — migrated to use Zustand auth store.
 * Renders LoginForm or RegisterForm based on modal.view.
 */
const AuthInputs: React.FC = () => {
  const { modal } = useAuthModal();

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {modal.view === 'login' && <LoginForm />}
      {modal.view === 'signup' && <RegisterForm />}
    </Flex>
  );
};

export default AuthInputs;
