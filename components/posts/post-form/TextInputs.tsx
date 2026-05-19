import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreatePostInput } from "@/schema/post";

type TextInputsProps = {
  register: UseFormRegister<CreatePostInput>;
  errors: FieldErrors<CreatePostInput>;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  register,
  errors,
  handleCreatePost,
  loading,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-1">
        <input
          placeholder="Title"
          className="w-full h-[40px] px-4 text-[14px] text-white bg-card border border-border rounded-[10px] focus:outline-none focus:border-[#FF5722] transition-all placeholder:text-muted-foreground hover:border-white/30"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-[12px] font-semibold px-2">
            {errors.title.message}
          </p>
        )}
      </div>

      <textarea
        placeholder="Text (Optional)"
        className="w-full min-h-[120px] p-4 text-[14px] text-white bg-card border border-border rounded-[10px] focus:outline-none focus:border-[#FF5722] transition-all placeholder:text-muted-foreground hover:border-white/30 resize-none"
        {...register("body")}
      />

      <div className="flex justify-end pt-2">
        <button
          className={`h-[34px] px-8 text-[14px] font-bold text-foreground rounded-full transition-all shadow-md ${
            loading 
              ? "bg-gray-600 cursor-not-allowed" 
              : "bg-[#FF5722] hover:bg-[#E64A19]"
          }`}
          onClick={handleCreatePost}
          disabled={loading}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          ) : "Post"}
        </button>
      </div>
    </div>
  );
};

export default TextInputs;
