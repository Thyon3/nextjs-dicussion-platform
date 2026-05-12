'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsDot } from "react-icons/bs";
import { useAuthModal } from "../hooks/useAuth";
import InputField from "./InputField";
import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
  const { setModalView } = useAuthModal();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    setLoading(true);
    // TODO: Implement backend password reset
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-lg font-bold text-white mb-4">
        Reset your password
      </h3>
      {success ? (
        <p className="mb-6 text-center text-gray-300 text-[10pt]">
          If an account exists for this email, 
          you will receive a reset link shortly.
        </p>
      ) : (
        <>
          <p className="text-[10pt] text-gray-400 text-center mb-6">
            Enter the email associated with your account and we will send you a reset link.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <div>
              <InputField
                placeholder="Email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-[9pt] mt-1 font-semibold">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full h-[40px] rounded-full text-white font-bold transition-all ${
                !isValid || loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#FF5722] hover:bg-[#E64A19]"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
              ) : "Reset Password"}
            </button>
          </form>
        </>
      )}
      <div className="flex items-center gap-1 text-[9pt] text-[#FF5722] font-bold mt-6">
        <button 
          type="button" 
          className="hover:underline uppercase"
          onClick={() => setModalView("login")}
        >
          Login
        </button>
        <BsDot className="text-gray-500 text-xl" />
        <button 
          type="button" 
          className="hover:underline uppercase"
          onClick={() => setModalView("signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
