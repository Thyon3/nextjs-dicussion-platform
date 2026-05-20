'use client';

import React, { useEffect } from 'react';
import { useAuth, useAuthModal } from '../hooks/useAuth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPassword from './ResetPassword';
import { IoClose } from 'react-icons/io5';

const AuthModal: React.FC = () => {
  const { user } = useAuth();
  const { modal, closeModal } = useAuthModal();

  // Auto-close when user logs in
  useEffect(() => {
    if (user) closeModal();
  }, [user, closeModal]);

  if (!modal.open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal Content */}
      <div className="relative bg-card w-full max-w-[400px] rounded-[16px] border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-bold text-foreground">
            {modal.view === 'login' && 'Log In'}
            {modal.view === 'signup' && 'Sign Up'}
            {modal.view === 'resetPassword' && 'Reset Password'}
          </h2>
          <button 
            onClick={closeModal}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="px-6 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-full">
              {modal.view === 'login' && <LoginForm />}
              {modal.view === 'signup' && <RegisterForm />}
              {modal.view === 'resetPassword' && <ResetPassword />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
