'use client';

import React from 'react';
import { Flex, Image, Text, Button, Input, Box, IconButton, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { useAuth, useAuthModal, AuthModal } from '@/src/features/auth';
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { openModal } = useAuthModal();

  return (
    <Flex
      bg="#0B0E11"
      height="56px"
      padding="0px 24px"
      justifyContent="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      position="sticky"
      top={0}
      zIndex={10}
    >
      {/* Left Section: Logo & Links */}
      <Flex align="center" gap={8}>
        <Link href="/">
          <Flex align="center" cursor="pointer">
            <Image src="/images/logo.svg" height="28px" alt="Circus Logo" fallbackSrc="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png" />
            <Text
              fontWeight={700}
              fontSize="16pt"
              ml={2}
              color="white"
              letterSpacing="-0.5px"
            >
              Circus
            </Text>
          </Flex>
        </Link>

        <Link href="/communities">
          <Box position="relative">
            <Text 
              fontWeight={600} 
              fontSize="11pt" 
              color="white" 
              cursor="pointer"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-18px',
                left: 0,
                width: '100%',
                height: '2px',
                bg: '#FF5722'
              }}
            >
              Communities
            </Text>
          </Box>
        </Link>
      </Flex>

      {/* Center Section: Search Bar */}
      <Flex flex={1} maxW="600px" mx={8} position="relative" align="center">
        <Box
          position="absolute"
          left={4}
          zIndex={1}
          display="flex"
          alignItems="center"
          pointerEvents="none"
        >
          <Icon as={IoSearchOutline} color="gray.400" fontSize="20px" />
        </Box>
        <Input
          placeholder="Search communities..."
          fontSize="10pt"
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="transparent"
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'whiteAlpha.200',
            borderColor: 'whiteAlpha.300'
          }}
          _focus={{
            outline: 'none',
            bg: 'whiteAlpha.200',
            borderColor: '#FF5722'
          }}
          borderRadius="full"
          height="38px"
          paddingLeft="44px"
        />
      </Flex>

      {/* Right Section: Actions */}
      <Flex align="center" gap={4}>
        <IconButton
          aria-label="Notifications"
          icon={<IoNotificationsOutline size={22} />}
          variant="ghost"
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
        />

        {user ? (
          <Flex align="center" gap={3}>
            <Text
              fontSize="9pt"
              fontWeight={700}
              color="white"
              display={{ base: 'none', lg: 'block' }}
            >
              {user.displayName || user.email?.split('@')[0]}
            </Text>
            <Button
              variant="outline"
              height="36px"
              borderRadius="full"
              fontSize="10pt"
              fontWeight={700}
              color="white"
              borderColor="whiteAlpha.300"
              _hover={{ bg: 'whiteAlpha.100' }}
              onClick={logout}
            >
              Log Out
            </Button>
          </Flex>
        ) : (
          <Flex gap={3}>
            <Button
              variant="ghost"
              color="white"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'whiteAlpha.100' }}
              onClick={() => openModal('login')}
            >
              Log In
            </Button>
            <Button
              bg="#FF5722"
              color="white"
              height="36px"
              px={6}
              borderRadius="full"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: '#E64A19' }}
              onClick={() => openModal('signup')}
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
