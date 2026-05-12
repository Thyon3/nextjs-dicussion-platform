import React from "react";
import { Flex } from "@chakra-ui/react";

import { Text, Icon } from "@chakra-ui/react";
import { FaChartLine } from "react-icons/fa";

const SuggestionsHeader: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      p="16px 16px 8px 16px"
    >
      <Text
        fontSize="8pt"
        fontWeight={700}
        color="gray.500"
        letterSpacing="1px"
      >
        TOP COMMUNITIES
      </Text>
      <Icon as={FaChartLine} color="gray.500" fontSize="10pt" />
    </Flex>
  );
};

export default SuggestionsHeader;
