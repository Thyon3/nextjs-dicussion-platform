'use client';

import React from 'react';
import { useAuthModal } from '@/src/features/auth';
import LoginForm from '@/src/features/auth/components/LoginForm';
import RegisterForm from '@/src/features/auth/components/RegisterForm';

const AuthInputs: React.FC = () => {
  const { modal } = useAuthModal();

  return (
    <div className="flex flex-col items-center w-full mt-4">
      {modal.view === 'login' && <LoginForm />}
      {modal.view === 'signup' && <RegisterForm />}
    </div>
  );
};

export default AuthInputs;
