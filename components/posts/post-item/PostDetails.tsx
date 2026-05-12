import React from "react";
import { IoPeopleCircleOutline } from "react-icons/io5";
import moment from "moment";
import { Post } from "@/types/post";
import Link from "next/link";

type PostDetailsProps = {
  showCommunityImage?: boolean;
  post: Post;
};

const PostDetails: React.FC<PostDetailsProps> = ({
  showCommunityImage,
  post,
}) => {
  return (
    <div className="flex flex-row items-center gap-2 text-[9pt] w-full mb-1">
      {showCommunityImage && (
        <div className="flex items-center">
          {post.communityImageURL ? (
            <img
              className="rounded-full w-5 h-5 mr-2 object-cover"
              src={post.communityImageURL}
              alt="Community logo"
            />
          ) : (
            <IoPeopleCircleOutline
              className="mr-2 text-[16pt] text-[#FF5722]"
            />
          )}
          <Link href={`/community/${post.communityId}`}>
            <span
              className="font-bold text-white hover:underline mr-1 cursor-pointer"
              onClick={(event) => event.stopPropagation()}
            >
              r/{post.communityId}
            </span>
          </Link>
        </div>
      )}
      <div className="flex items-center text-gray-500 gap-1">
        <span>•</span>
        <span>By {post.creatorUsername}</span>
        <span>•</span>
        <span>{moment(post.createTime).fromNow()}</span>
      </div>
    </div>
  );
};

export default PostDetails;
