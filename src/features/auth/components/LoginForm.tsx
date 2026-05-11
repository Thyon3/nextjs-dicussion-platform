'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Text } from '@chakra-ui/react';
import { loginSchema, type LoginFormValues } from '../validators';
import { useAuth, useAuthModal } from '../hooks/useAuth';
import { ApiError } from '@/src/shared/lib/apiClient';
import InputField from './InputField';

/**
 * Login form — handles credential submission, shows validation errors,
 * and updates global auth state on success.
 */
const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { setModalView } = useAuthModal();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setServerError('');
    try {
      await login({ email: data.email, password: data.password });
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
      <InputField placeholder="Email" type="email" {...register('email')} />
      {errors.email && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.email.message}
        </Text>
      )}

      <InputField
        placeholder="Password"
        type="password"
        mt={2}
        mb={2}
        {...register('password')}
      />
      {errors.password && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.password.message}
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
        Log In
      </Button>

      <Flex fontSize="9pt" justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>Forgot your password?</Text>
        <Text
          color={{ base: 'red.500', _dark: 'red.400' }}
          fontWeight={700}
          cursor="pointer"
          onClick={() => setModalView('resetPassword')}
        >
          Reset Password
        </Text>
      </Flex>

      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text
          color={{ base: 'red.500', _dark: 'red.400' }}
          fontWeight={700}
          cursor="pointer"
          onClick={() => setModalView('signup')}
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};

export default LoginForm;
