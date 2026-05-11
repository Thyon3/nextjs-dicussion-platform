import { Button, Flex, Text } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authModalStateAtom } from "../../../atoms/authModalAtom";
import InputField from "./InputField";
import { signUpSchema, SignUpInput } from "@/schema/auth";
import { register as registerApi } from "@/lib/api/auth";
import { useAuth } from "@/hooks/useAuth";

const SignUp = () => {
  const setAuthModalState = useSetAtom(authModalStateAtom);
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpInput) => {
    setLoading(true);
    setError("");
    try {
      await registerApi({
        email: data.email,
        password: data.password,
        displayName: data.email.split("@")[0],
      });
      await checkAuth(); // Update global auth state
      setAuthModalState({ open: false, view: "login" });
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField placeholder="Email" type="email" {...register("email")} />
      {errors.email && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.email.message}
        </Text>
      )}
      <InputField
        placeholder="Password"
        type="password"
        mb={2}
        mt={2}
        fontSize="10pt"
        bg={{ base: "gray.50", _dark: "gray.800" }}
        borderColor={{ base: "gray.200", _dark: "gray.600" }}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: { base: "white", _dark: "gray.700" },
          border: "1px solid",
          borderColor: { base: "red.500", _dark: "red.400" },
        }}
        _focus={{
          outline: "none",
          bg: { base: "white", _dark: "gray.700" },
          border: "1px solid",
          borderColor: { base: "red.500", _dark: "red.400" },
        }}
        {...register("password")}
      />
      {errors.password && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.password.message}
        </Text>
      )}
      <InputField
        placeholder="Confirm Password"
        type="password"
        mb={2}
        mt={2}
        fontSize="10pt"
        bg={{ base: "gray.50", _dark: "gray.800" }}
        borderColor={{ base: "gray.200", _dark: "gray.600" }}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: { base: "white", _dark: "gray.700" },
          border: "1px solid",
          borderColor: { base: "red.500", _dark: "red.400" },
        }}
        _focus={{
          outline: "none",
          bg: { base: "white", _dark: "gray.700" },
          border: "1px solid",
          borderColor: { base: "red.500", _dark: "red.400" },
        }}
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <Text color="red.500" fontSize="10pt" mt={1}>
          {errors.confirmPassword.message}
        </Text>
      )}
      {error && (
        <Text
          textAlign="center"
          color={{ base: "red.500", _dark: "red.400" }}
          fontSize="10pt"
          fontWeight="800"
          mt={2}
        >
          {error}
        </Text>
      )}
      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        loading={loading}
        disabled={!isValid}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a member? </Text>
        <Text
          color={{ base: "red.500", _dark: "red.400" }}
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;


