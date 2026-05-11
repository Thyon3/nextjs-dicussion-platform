'use client';

import React from 'react';
import { Flex, Image, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useAuth, useAuthModal, AuthModal } from '@/src/features/auth';

/**
 * Navbar — driven by the Zustand auth store.
 * Shows user display name and logout when authenticated.
 * Shows login/signup buttons when unauthenticated.
 */
const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { openModal } = useAuthModal();

  return (
    <Flex
      bg={{ base: 'white', _dark: 'gray.800' }}
      height="44px"
      padding="6px 12px"
      justifyContent="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor={{ base: 'gray.300', _dark: 'gray.700' }}
      position="sticky"
      top={0}
      zIndex={10}
      shadow="sm"
    >
      <Link href="/">
        <Flex align="center" cursor="pointer">
          <Image src="/images/logo.svg" height="30px" alt="Circus Logo" />
          <Text
            display={{ base: 'none', md: 'unset' }}
            fontWeight={700}
            fontSize="12pt"
            ml={2}
          >
            Circus
          </Text>
        </Flex>
      </Link>

      <Flex align="center" gap={4}>
        <Link href="/communities">
          <Button variant="ghost" size="sm">Communities</Button>
        </Link>

        {user ? (
          <Flex align="center" gap={3}>
            <Text
              fontSize="9pt"
              fontWeight={700}
              display={{ base: 'none', lg: 'block' }}
            >
              {user.displayName || user.email?.split('@')[0]}
            </Text>
            <Button
              variant="outline"
              height="28px"
              display={{ base: 'none', sm: 'flex' }}
              width={{ base: '70px', md: '110px' }}
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
              display={{ base: 'none', sm: 'flex' }}
              width={{ base: '70px', md: '110px' }}
              onClick={() => openModal('login')}
            >
              Log In
            </Button>
            <Button
              height="28px"
              display={{ base: 'none', sm: 'flex' }}
              width={{ base: '70px', md: '110px' }}
              onClick={() => openModal('signup')}
            >
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>

      {/* Auth modal is rendered here so it's available globally */}
      <AuthModal />
    </Flex>
  );
};

export default Navbar;
