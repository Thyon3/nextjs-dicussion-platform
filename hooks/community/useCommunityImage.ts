import { communityStateAtom } from "@/atoms/communitiesAtom";
import { useSetAtom } from "jotai";
import { useState } from "react";
import useCustomToast from "../useCustomToast";
import { Community } from "@/types/community";
import { updateCommunityImage, updateCommunityProfile } from "@/lib/api/community";


/**
 * A custom hook that provides functionality for managing a community's profile image.
 * It handles uploading new images, deleting existing ones, and synchronizes these changes
 * across the community document and all user membership snippets.
 * @param communityData - The community object whose image is being managed.
 * @returns An object containing functions for updating and deleting image, and an uploading state indicator.
 */
const useCommunityImage = (communityData: Community) => {
  const setCommunityStateValue = useSetAtom(communityStateAtom);
  const showToast = useCustomToast();
  const [uploadingImage, setUploadingImage] = useState(false);

  const onUpdateProfile = async (
    selectedImageFile?: string,
    selectedBannerFile?: string,
    description?: string
  ) => {
    setUploadingImage(true);

    try {
      const updatedCommunity = (await updateCommunityProfile(
        communityData.id,
        description,
        selectedImageFile,
        selectedBannerFile
      )) as any;

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: updatedCommunity.imageURL,
          bannerURL: updatedCommunity.bannerURL,
          description: updatedCommunity.description,
        } as Community,
      }));

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.map((snippet) => {
          if (snippet.communityId === communityData.id) {
            return {
              ...snippet,
              imageURL: updatedCommunity.imageURL,
            };
          }
          return snippet;
        }),
      }));
    } catch (error) {
      console.log("Error: onUpdateProfile", error);
      showToast({
        title: "Profile not Updated",
        description: "There was an error updating the profile",
        status: "error",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const onDeleteCommunityImage = async () => {
    try {
      await updateCommunityImage(communityData.id, "");


      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: "",
        } as Community,
      }));

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.map((snippet) => {
          if (snippet.communityId === communityData.id) {
            return {
              ...snippet,
              imageURL: "",
            };
          }
          return snippet;
        }),
      }));
    } catch (error) {
      console.log("Error: onDeleteCommunityImage", error);
      showToast({
        title: "Image not Deleted",
        description: "There was an error deleting the image",
        status: "error",
      });
    }
  };

  return {
    updateProfile: onUpdateProfile,
    deleteCommunityImage: onDeleteCommunityImage,
    uploadingImage,
  };
};

export default useCommunityImage;
