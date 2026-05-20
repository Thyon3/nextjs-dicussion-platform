'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormValues } from '../validators';
import { useAuth, useAuthModal } from '../hooks/useAuth';
import { ApiError } from '@/src/shared/lib/apiClient';
import InputField from './InputField';

const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const { setModalView } = useAuthModal();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setServerError('');
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        displayName: data.displayName || data.email.split('@')[0],
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message);
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <InputField placeholder="Display Name (optional)" type="text" {...register('displayName')} />
        {errors.displayName && (
          <p className="text-red-500 text-[9pt] mt-1 font-semibold">
            {errors.displayName.message}
          </p>
        )}
      </div>

      <div>
        <InputField placeholder="Email" type="email" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-[9pt] mt-1 font-semibold">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <InputField placeholder="Password" type="password" {...register('password')} />
        {errors.password && (
          <p className="text-red-500 text-[9pt] mt-1 font-semibold">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <InputField
          placeholder="Confirm Password"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-[9pt] mt-1 font-semibold">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-center text-red-400 text-[10pt] font-bold">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={`w-full h-[40px] rounded-full text-foreground font-bold transition-all ${
          !isValid || isLoading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-[#FF5722] hover:bg-[#E64A19]"
        }`}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>

      <div className="flex justify-center text-[9pt] text-muted-foreground gap-1 pt-2">
        <span>Already a member?</span>
        <button
          type="button"
          className="text-[#FF5722] font-bold hover:underline"
          onClick={() => setModalView('login')}
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
