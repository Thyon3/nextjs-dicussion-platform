import { Community } from "@/types/community";
import useCreatePost from "@/hooks/posts/useCreatePost";
import useSelectFile from "@/hooks/useSelectFile";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import BackToCommunityButton from "./BackToCommunityButton";
import PostCreateError from "./PostCreateError";
import TextInputs from "../post-form/TextInputs";
import ImageUpload from "../post-form/ImageUpload";
import { createPostSchema, CreatePostInput } from "@/schema/post";
import { User } from "@/atoms/userAtom";

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
  currentCommunity?: Community;
};

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images",
    icon: IoImageOutline,
  },
];

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageURL,
  currentCommunity,
}) => {
  const router = useRouter();
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile(
    3000,
    3000
  );
  const { handleCreatePost, loading, error } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onChange",
  });

  const onCreatePost = async (data: CreatePostInput) => {
    const communityId = params?.communityId as string;
    await handleCreatePost(
      user,
      communityId,
      communityImageURL,
      { title: data.title, body: data.body || "" },
      selectedFile
    );
  };

  return (
    <div className="flex flex-col bg-[#1A1D23] rounded-[16px] border border-white/10 mt-2 shadow-xl overflow-hidden">
      {/* Tabs Header */}
      <div className="flex p-2 gap-2 border-b border-white/5">
        {formTabs.map((item) => (
          <button
            key={item.title}
            className={`flex-1 flex items-center justify-center h-[52px] gap-2 rounded-[10px] font-bold text-[14px] transition-all ${
              selectedTab === item.title
                ? "text-[#FF5722] border-b-2 border-[#FF5722] bg-white/5"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
            }`}
            onClick={() => setSelectedTab(item.title)}
          >
            <item.icon size={20} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col gap-4">
        <BackToCommunityButton communityId={currentCommunity?.id} />
        
        {selectedTab === "Post" && (
          <div className="animate-in fade-in duration-300">
            <TextInputs
              register={register}
              errors={errors}
              handleCreatePost={handleSubmit(onCreatePost)}
              loading={loading}
            />
          </div>
        )}

        {selectedTab === "Images" && (
          <div className="animate-in fade-in duration-300">
            <ImageUpload
              selectedFile={selectedFile}
              onSelectImage={onSelectFile}
              setSelectedTab={setSelectedTab}
              setSelectedFile={setSelectedFile}
            />
          </div>
        )}
      </div>

      <PostCreateError error={error} />
    </div>
  );
};

export default NewPostForm;
