'use client';

import React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-4 py-2 text-[10pt] bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF5722] focus:bg-white/10 transition-all ${className}`}
      {...props}
    />
  )
);

InputField.displayName = 'InputField';

export default InputField;
