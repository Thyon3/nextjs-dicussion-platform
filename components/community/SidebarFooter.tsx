import React from "react";
import { Flex, Text, Link, Stack } from "@chakra-ui/react";

const SidebarFooter: React.FC = () => {
  return (
    <Flex direction="column" p={4} mt={4}>
      <Flex wrap="wrap" gap={4} mb={4}>
        <Stack direction="row" gap={4}>
          <Link href="#" fontSize="8pt" color="gray.500" _hover={{ textDecoration: 'none', color: 'white' }}>About</Link>
          <Link href="#" fontSize="8pt" color="gray.500" _hover={{ textDecoration: 'none', color: 'white' }}>Careers</Link>
          <Link href="#" fontSize="8pt" color="gray.500" _hover={{ textDecoration: 'none', color: 'white' }}>Terms</Link>
        </Stack>
        <Stack direction="row" gap={4}>
          <Link href="#" fontSize="8pt" color="gray.500" _hover={{ textDecoration: 'none', color: 'white' }}>Content Policy</Link>
          <Link href="#" fontSize="8pt" color="gray.500" _hover={{ textDecoration: 'none', color: 'white' }}>Privacy Policy</Link>
        </Stack>
      </Flex>
      <Text fontSize="8pt" color="gray.600">
        © 2024 Circus Inc. All rights reserved.
      </Text>
    </Flex>
  );
};

export default SidebarFooter;
