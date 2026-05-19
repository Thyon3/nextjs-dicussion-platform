import { Community } from "@/types/community";
import React from "react";

type ImageSettingsProps = {
  selectedFile: string;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectFileRef: React.RefObject<HTMLInputElement>;
  selectedBannerFile?: string;
  onSelectBannerFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectBannerRef?: React.RefObject<HTMLInputElement>;
  description?: string;
  setDescription?: (value: string) => void;
  currentCommunity: Community | null;
  deleteImage: boolean;
  setDeleteImage: (value: boolean) => void;
  deleteBanner?: boolean;
  setDeleteBanner?: (value: boolean) => void;
};

const ImageSettings: React.FC<ImageSettingsProps> = ({
  selectedFile,
  onSelectFile,
  selectFileRef,
  selectedBannerFile,
  onSelectBannerFile,
  selectBannerRef,
  description,
  setDescription,
  currentCommunity,
  deleteImage,
  setDeleteImage,
  deleteBanner,
  setDeleteBanner,
}) => {
  const imageToDisplay = selectedFile || currentCommunity?.imageURL;
  const bannerToDisplay = selectedBannerFile || currentCommunity?.bannerURL;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label className="text-[12pt] font-bold text-foreground">
          Community Description
        </label>
        <textarea 
          placeholder="Tell us about your community"
          className="w-full bg-transparent border border-border rounded-lg p-3 text-[14px] text-white focus:outline-none focus:border-[#FF5722] transition-all min-h-[100px] resize-none"
          value={description || ""}
          onChange={(e) => setDescription && setDescription(e.target.value)}
          maxLength={500}
        />
        <p className="text-right text-[10px] text-muted-foreground">
          {(description?.length || 0)}/500
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-[12pt] font-bold text-foreground">
          Community Image
        </label>
        <div className="flex flex-col items-center gap-4">
          <div className="w-[100px] h-[100px] rounded-full border-2 border-dashed border-white/20 overflow-hidden bg-muted flex items-center justify-center">
            {imageToDisplay ? (
              <img
                src={imageToDisplay}
                alt="Community Image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-1.5 bg-white text-black text-[12px] font-bold rounded-full hover:bg-gray-200 transition-colors"
              onClick={() => selectFileRef.current?.click()}
            >
              Change Image
            </button>
            {(currentCommunity?.imageURL || selectedFile) && (
              <button
                className={`px-4 py-1.5 text-[12px] font-bold rounded-full transition-all ${
                  deleteImage 
                    ? "bg-red-600 text-foreground hover:bg-red-700" 
                    : "border border-white/30 text-foreground hover:bg-muted"
                }`}
                onClick={() => setDeleteImage(!deleteImage)}
              >
                {deleteImage ? "Undo Delete" : "Delete Image"}
              </button>
            )}
          </div>
          <input ref={selectFileRef} type="file" hidden onChange={onSelectFile} accept="image/*" />
        </div>
      </div>

      {onSelectBannerFile && selectBannerRef && (
        <div className="flex flex-col gap-4">
          <label className="text-[12pt] font-bold text-foreground">
            Community Banner
          </label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full h-[120px] rounded-lg border-2 border-dashed border-white/20 overflow-hidden bg-muted">
              {bannerToDisplay ? (
                <img
                  src={bannerToDisplay}
                  alt="Community Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
            <div className="flex gap-3">
              <button 
                className="px-4 py-1.5 bg-white text-black text-[12px] font-bold rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => selectBannerRef.current?.click()}
              >
                Change Banner
              </button>
              {(currentCommunity?.bannerURL || selectedBannerFile) && setDeleteBanner && (
                <button
                  className={`px-4 py-1.5 text-[12px] font-bold rounded-full transition-all ${
                    deleteBanner 
                      ? "bg-red-600 text-foreground hover:bg-red-700" 
                      : "border border-white/30 text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setDeleteBanner(!deleteBanner)}
                >
                  {deleteBanner ? "Undo Delete" : "Delete Banner"}
                </button>
              )}
            </div>
            <input ref={selectBannerRef} type="file" hidden onChange={onSelectBannerFile} accept="image/*" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSettings;
