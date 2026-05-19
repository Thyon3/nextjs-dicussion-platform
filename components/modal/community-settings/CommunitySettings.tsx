import { communityStateAtom } from "@/atoms/communitiesAtom";
import useCommunityImage from "@/hooks/community/useCommunityImage";
import useCommunityPrivacy from "@/hooks/community/useCommunityPrivacy";
import useDeleteCommunity from "@/hooks/community/useDeleteCommunity";
import useCustomToast from "@/hooks/useCustomToast";
import useSelectFile from "@/hooks/useSelectFile";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  AdminManager,
  DangerZone,
  ImageSettings,
  ModalFooter,
  PrivacySettings,
} from ".";
import { Community } from "@/types/community";

type CommunitySettingsModalProps = {
  open: boolean;
  handleClose: () => void;
  communityData: Community;
};

const CommunitySettingsModal: React.FC<CommunitySettingsModalProps> = ({
  open,
  handleClose,
  communityData,
}) => {
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile(300, 300);
  const selectFileRef = useRef<HTMLInputElement>(null);
  const selectBannerRef = useRef<HTMLInputElement>(null);
  const [communityStateValue] = useAtom(communityStateAtom);
  const [deleteImage, setDeleteImage] = useState(false);
  const [deleteBanner, setDeleteBanner] = useState(false);
  const [selectedPrivacyType, setSelectedPrivacyType] = useState("");
  const [description, setDescription] = useState(communityData?.description || "");
  const [activeTab, setActiveTab] = useState("profile");
  const showToast = useCustomToast();

  const { selectedFile: selectedBannerFile, setSelectedFile: setSelectedBannerFile, onSelectFile: onSelectBannerFile } = useSelectFile(1200, 300);

  const { updateProfile, deleteCommunityImage } = useCommunityImage(communityData);
  const { updatePrivacyType } = useCommunityPrivacy(communityData);
  const { deleteCommunity: callDeleteCommunity, loading } = useDeleteCommunity();

  const handleSaveButtonClick = async () => {
    if (selectedPrivacyType) {
      await updatePrivacyType(selectedPrivacyType);
    }
    
    if (selectedFile || selectedBannerFile || description !== communityData?.description) {
      await updateProfile(selectedFile || undefined, selectedBannerFile || undefined, description);
      setSelectedFile("");
      setSelectedBannerFile("");
    }
    
    if (deleteImage) {
      await deleteCommunityImage();
    }
    showToast({
      title: "Settings Updated",
      description: "Your settings have been updated",
      status: "success",
    });
    closeModal();
  };

  const closeModal = () => {
    setSelectedFile("");
    setSelectedBannerFile("");
    setSelectedPrivacyType("");
    setDeleteImage(false);
    setDeleteBanner(false);
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal Content */}
      <div className="relative bg-card w-full max-w-[600px] rounded-[16px] border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-xl font-bold text-foreground">Community Settings</h2>
          <button 
            onClick={closeModal}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex flex-col">
          {/* Tabs List */}
          <div className="flex border-b border-border px-6">
            {["profile", "privacy", "admins", "danger"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-[14px] font-bold capitalize transition-all border-b-2 ${
                  activeTab === tab 
                    ? "text-[#FF5722] border-b-[#FF5722]" 
                    : "text-muted-foreground border-b-transparent hover:text-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "danger" ? "Danger Zone" : tab}
              </button>
            ))}
          </div>

          {/* Tabs Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {activeTab === "profile" && (
              <ImageSettings
                selectedFile={selectedFile || ""}
                onSelectFile={onSelectFile}
                selectFileRef={selectFileRef}
                selectedBannerFile={selectedBannerFile || ""}
                onSelectBannerFile={onSelectBannerFile}
                selectBannerRef={selectBannerRef}
                description={description}
                setDescription={setDescription}
                currentCommunity={communityStateValue.currentCommunity || communityData}
                deleteImage={deleteImage}
                setDeleteImage={setDeleteImage}
                deleteBanner={deleteBanner}
                setDeleteBanner={setDeleteBanner}
              />
            )}
            {activeTab === "privacy" && (
              <PrivacySettings
                currentCommunity={communityStateValue.currentCommunity || null}
                selectedPrivacyType={selectedPrivacyType}
                handlePrivacyTypeChange={(details) => setSelectedPrivacyType(details.value)}
              />
            )}
            {activeTab === "admins" && (
              <AdminManager
                communityData={communityStateValue.currentCommunity || communityData}
              />
            )}
            {activeTab === "danger" && (
              <DangerZone
                deleteCommunity={async () => {
                  await callDeleteCommunity(communityData.id);
                }}
                loading={loading}
              />
            )}
          </div>
        </div>

        <ModalFooter onCancel={closeModal} onSave={handleSaveButtonClick} />
      </div>
    </div>
  );
};

export default CommunitySettingsModal;
