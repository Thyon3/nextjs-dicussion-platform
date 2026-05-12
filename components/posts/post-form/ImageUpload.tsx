import React, { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedTab,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
      {selectedFile ? (
        <div className="flex flex-col items-center w-full gap-6">
          <div className="relative group">
            <img
              src={selectedFile}
              alt="Uploaded image for post"
              className="max-w-full max-h-[400px] rounded-[12px] border border-white/10 shadow-xl object-contain"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[12px] flex items-center justify-center pointer-events-none">
              <span className="text-white font-bold">Preview</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[440px]">
            <button
              className="flex-1 h-[40px] bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-lg"
              onClick={() => setSelectedTab("Post")}
            >
              Back to Post
            </button>
            <button
              className="flex-1 h-[40px] border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all shadow-lg"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="flex flex-col items-center justify-center w-full min-h-[300px] border-2 border-dashed border-white/10 rounded-[12px] bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
          onClick={() => selectedFileRef.current?.click()}
        >
          <div className="p-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
              <svg 
                className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <button
              className="px-8 py-2 bg-[#FF5722] text-white font-bold rounded-full hover:bg-[#E64A19] transition-all shadow-lg"
            >
              Upload Content
            </button>
            <p className="text-gray-500 text-[12px] font-medium">PNG, JPG, or GIF</p>
          </div>
          <input
            type="file"
            accept="image/png,image/gif,image/jpeg"
            ref={selectedFileRef}
            className="hidden"
            onChange={onSelectImage}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
