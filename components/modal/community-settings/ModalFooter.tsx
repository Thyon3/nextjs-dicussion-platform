import React from "react";

type ModalFooterProps = {
  onCancel: () => void;
  onSave: () => void;
};

const ModalFooter: React.FC<ModalFooterProps> = ({ onCancel, onSave }) => {
  return (
    <div className="flex justify-between items-center p-6 bg-white/5 border-t border-white/10 rounded-b-[10px] gap-3">
      <button
        className="flex-1 h-[32px] text-[14px] font-bold text-white border border-white/30 rounded-full hover:bg-white/10 transition-all"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        className="flex-1 h-[32px] text-[14px] font-bold text-white bg-[#FF5722] rounded-full hover:bg-[#E64A19] transition-all"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};

export default ModalFooter;
