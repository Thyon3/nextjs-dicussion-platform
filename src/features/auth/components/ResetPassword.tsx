'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Icon, Image, Input, Text } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { loginSchema } from "../validators"; // We'll just use a simple email check or create a specific schema
import { useAuthModal } from "../hooks/useAuth";
import InputField from "./InputField";
import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

/**
 * ResetPassword component — migrated to the auth feature.
 */
const ResetPassword: React.FC = () => {
  const { setModalView } = useAuthModal();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    setLoading(true);
    // TODO: Implement backend password reset
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Image src="/images/logo.svg" height="40px" mb={2} alt="Website logo" />
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={4} textAlign="center">
          If an account exists for this email, 
          you will receive a reset link shortly.
        </Text>
      ) : (
        <>
          <Text fontSize="sm" textAlign="center" mb={2}>
            Enter email associated with your account and we will send you a
            reset link
          </Text>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <InputField
              placeholder="Email"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <Text color="red.500" fontSize="10pt" mt={1}>
                {errors.email.message}
              </Text>
            )}
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              loading={loading}
              disabled={!isValid}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color={{ base: "red.500", _dark: "red.400" }}
        fontWeight={700}
        cursor="pointer"
        mt={2}
      >
        <Text onClick={() => setModalView("login")}>LOGIN</Text>
        <Icon as={BsDot} />
        <Text onClick={() => setModalView("signup")}>SIGN UP</Text>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;
