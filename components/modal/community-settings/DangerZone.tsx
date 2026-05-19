import React, { useState } from "react";
import ConfirmationDialog from "@/components/modal/ConfirmationDialog";

type DangerZoneProps = {
  deleteCommunity: () => Promise<void>;
  loading: boolean;
};

const DangerZone: React.FC<DangerZoneProps> = ({
  deleteCommunity,
  loading,
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[12pt] font-bold text-red-500">
        Danger Zone
      </h3>
      <p className="text-[10pt] text-muted-foreground">
        Once you delete a community, there is no going back. Please be certain.
      </p>
      <button
        className={`w-full h-[36px] text-[14px] font-bold text-red-500 border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => setDeleteConfirmationOpen(true)}
        disabled={loading}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto" />
        ) : "Delete Community"}
      </button>

      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={() => {
          deleteCommunity();
          setDeleteConfirmationOpen(false);
        }}
        title="Delete Community"
        body="Are you sure you want to delete this community? This action cannot be undone and will delete all posts and comments."
        confirmButtonText="Delete Community"
        isLoading={loading}
      />
    </div>
  );
};

export default DangerZone;
