'use client';

import React from 'react';
import { Input } from '@chakra-ui/react';

/**
 * Shared input field used inside auth forms.
 * Wraps Chakra UI Input with consistent styling.
 */
const InputField = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ ...props }, ref) => (
    <Input
      ref={ref}
      required
      fontSize="10pt"
      bg={{ base: 'gray.50', _dark: 'gray.800' }}
      borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
      _placeholder={{ color: 'gray.500' }}
      _hover={{
        bg: { base: 'white', _dark: 'gray.700' },
        border: '1px solid',
        borderColor: { base: 'red.500', _dark: 'red.400' },
      }}
      _focus={{
        outline: 'none',
        bg: { base: 'white', _dark: 'gray.700' },
        border: '1px solid',
        borderColor: { base: 'red.500', _dark: 'red.400' },
      }}
      {...props}
    />
  )
);

InputField.displayName = 'InputField';

export default InputField;
