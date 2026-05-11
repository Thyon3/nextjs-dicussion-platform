import { Button, Flex, Text } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authModalStateAtom } from "../../../atoms/authModalAtom";
import InputField from "./InputField";
import { loginSchema, LoginInput } from "@/schema/auth";
import { login as loginApi } from "@/lib/api/auth";
import { useAuth } from "@/hooks/useAuth";

type LoginProps = {};

/**
 * Allows user to input log in credentials (email and password) to log into the site.
 * Contains 2 input fields, `Email` and `Password` and a log in button.
 *
 * If credentials are correct, user is signed in.
 * If credentials are incorrect, error messages are displayed.
 *
 * Buttons for resetting password and signing up are present.
 * Clicking these buttons would change the modal to the appropriate view.
 * @returns {React.FC} - Login component
 */
const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetAtom(authModalStateAtom); // Set global state
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError("");
    try {
      await loginApi({
        email: data.email,
        password: data.password,
      });
      await checkAuth(); // Update global auth state
      setAuthModalState((prev) => ({ ...prev, open: false }));
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
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
        Log In
      </Button>
      <Flex fontSize="9pt" justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          color={{ base: "red.500", _dark: "red.400" }}
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        >
          Reset Password
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Want to join circus? </Text>
        <Text
          color={{ base: "red.500", _dark: "red.400" }}
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};

export default Login;


