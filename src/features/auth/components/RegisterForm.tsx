'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Text } from '@chakra-ui/react';
import { registerSchema, type RegisterFormValues } from '../validators';
import { useAuth, useAuthModal } from '../hooks/useAuth';
import { ApiError } from '@/src/shared/lib/apiClient';
import InputField from './InputField';

/**
 * Register form — handles new user sign-up, connects to the Zustand auth store.
 */
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
      // modal auto-closes via store action
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField placeholder="Display Name (optional)" type="text" mb={2} {...register('displayName')} />
      {errors.displayName && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.displayName.message}
        </Text>
      )}

      <InputField placeholder="Email" type="email" mb={2} {...register('email')} />
      {errors.email && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.email.message}
        </Text>
      )}

      <InputField placeholder="Password" type="password" mt={2} mb={2} {...register('password')} />
      {errors.password && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.password.message}
        </Text>
      )}

      <InputField
        placeholder="Confirm Password"
        type="password"
        mt={2}
        mb={2}
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.confirmPassword.message}
        </Text>
      )}

      {serverError && (
        <Text
          textAlign="center"
          color={{ base: 'red.500', _dark: 'red.400' }}
          fontSize="10pt"
          fontWeight="800"
          mt={2}
        >
          {serverError}
        </Text>
      )}

      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        loading={isLoading}
        disabled={!isValid}
      >
        Sign Up
      </Button>

      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a member?</Text>
        <Text
          color={{ base: 'red.500', _dark: 'red.400' }}
          fontWeight={700}
          cursor="pointer"
          onClick={() => setModalView('login')}
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};

export default RegisterForm;
