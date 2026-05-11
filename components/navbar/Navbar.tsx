"use client";

import React from "react";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { useSetAtom } from "jotai";
import { authModalStateAtom } from "@/atoms/authModalAtom";
import Link from "next/link";
import AuthModal from "../modal/auth/AuthModal";

/**
 * Navigation bar component for the application.
 * Features a logo, search bar (placeholder), and user authentication controls.
 * @returns A persistent header with navigation and auth actions.
 */
const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const setAuthModalState = useSetAtom(authModalStateAtom);

  return (
    <Flex
      bg={{ base: "white", _dark: "gray.800" }}
      height="44px"
      padding="6px 12px"
      justifyContent="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor={{ base: "gray.300", _dark: "gray.700" }}
      position="sticky"
      top={0}
      zIndex={10}
      shadow="sm"
    >
      <Link href="/">
        <Flex align="center" cursor="pointer">
          <Image src="/images/logo.svg" height="30px" alt="Reddit Logo" />
          <Text
            display={{ base: "none", md: "unset" }}
            fontWeight={700}
            fontSize="12pt"
            ml={2}
          >
            Reddit Clone
          </Text>
        </Flex>
      </Link>

      <Flex align="center" gap={4}>
        <Link href="/communities">
            <Button variant="ghost" size="sm">Communities</Button>
        </Link>
        {user ? (
          <Flex align="center" gap={3}>
            <Text fontSize="9pt" fontWeight={700} display={{ base: "none", lg: "block" }}>
              {user.displayName || user.email?.split("@")[0]}
            </Text>
            <Button
              variant="outline"
              height="28px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              mr={2}
              onClick={logout}
            >
              Log Out
            </Button>
          </Flex>
        ) : (
          <Flex gap={2}>
            <Button
              variant="outline"
              height="28px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              Log In
            </Button>
            <Button
              height="28px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              onClick={() => setAuthModalState({ open: true, view: "signup" })}
            >
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>
      <AuthModal />
    </Flex>
  );
};

export default Navbar;

