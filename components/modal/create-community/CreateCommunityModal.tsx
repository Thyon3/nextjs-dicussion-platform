import { useCreateCommunity } from "@/hooks/community/useCreateCommunity";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import CommunityTypeOptions from "./CommunityTypeOptions";
import CommunityNameSection from "./CommunityNameSection";
import {
  createCommunitySchema,
  CreateCommunityInput,
} from "@/schema/community";

const COMMUNITY_TYPE_OPTIONS = [
  {
    name: "public",
    icon: BsFillPersonFill,
    label: "Public",
    description: "Everyone can view and post",
  },
  {
    name: "restricted",
    icon: BsFillEyeFill,
    label: "Restricted",
    description: "Everyone can view but only subscribers can post",
  },
  {
    name: "private",
    icon: HiLockClosed,
    label: "Private",
    description: "Only subscribers can view and post",
  },
];

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const { createCommunity, loading, error: createError } = useCreateCommunity();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCommunityInput>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      type: "public",
      name: "",
    },
    mode: "onChange",
  });

  const communityName = watch("name");
  const communityType = watch("type");
  const onSubmit = async (data: CreateCommunityInput) => {
    const success = await createCommunity(data.name, data.type);
    if (success) {
      handleClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#1A1D23] w-full max-w-[500px] rounded-[16px] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-bold text-white">Create Community</h2>
          <button 
            onClick={handleClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <CommunityNameSection
              error={errors.name?.message}
              register={register("name")}
            />
            
            <div className="h-[1px] bg-white/10 w-full" />

            <div>
              <p className="text-[15px] font-bold text-white mb-3">
                Community Type
              </p>
              <CommunityTypeOptions
                options={COMMUNITY_TYPE_OPTIONS}
                communityType={communityType}
                onCommunityTypeChange={(value) =>
                  setValue("type", value as any)
                }
              />
            </div>

            {createError && (
              <p className="text-center text-red-400 text-[10pt] font-bold">
                {createError}
              </p>
            )}
          </form>
        </div>

        <div className="flex justify-end gap-3 p-6 bg-white/5 border-t border-white/10">
          <button
            className="px-6 py-1.5 text-white text-[14px] font-bold border border-white/30 rounded-full hover:bg-white/10 transition-all"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-8 py-1.5 text-white text-[14px] font-bold rounded-full transition-all ${
              loading 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-[#FF5722] hover:bg-[#E64A19]"
            }`}
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : 'Create Community'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityModal;
