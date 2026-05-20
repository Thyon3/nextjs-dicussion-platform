'use client';

import React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-4 py-2 text-[10pt] bg-muted border border-border rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:border-[#FF5722] focus:bg-muted transition-all ${className}`}
      {...props}
    />
  )
);

InputField.displayName = 'InputField';

export default InputField;
