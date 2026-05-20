import { Community } from "@/types/community";
import useCustomToast from "@/hooks/useCustomToast";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AdminUser } from "@/types/adminUser";
import ConfirmationDialog from "@/components/modal/ConfirmationDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAdminSchema, AddAdminInput } from "@/schema/admin";

type AdminManagerProps = {
  communityData: Community;
};

const AdminManager: React.FC<AdminManagerProps> = ({ communityData }) => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddAdminInput>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: { email: "" },
  });

  const emailValue = watch("email");

  const [addingAdmin, setAddingAdmin] = useState(false);
  const showToast = useCustomToast();
  const { user } = useAuth();
  const [adminToRemove, setAdminToRemove] = useState<string | null>(null);
  const [removingAdmin, setRemovingAdmin] = useState(false);

  useEffect(() => {
    // TODO: Fetch admins from backend
    setAdmins([]);
  }, [communityData]);

  const onAddAdmin = async (data: AddAdminInput) => {
    setAddingAdmin(true);
    try {
      showToast({
        title: "Not Implemented",
        description: "Admin management is coming soon to the new backend.",
        status: "info",
      });
    } catch (error: any) {
      console.error("Error adding admin", error);
    } finally {
      setAddingAdmin(false);
    }
  };

  const confirmRemoveAdmin = async () => {
    if (!adminToRemove) return;
    setRemovingAdmin(true);
    try {
      // TODO: Implement backend remove admin
    } catch (error: any) {
      console.error("Error removing admin", error);
    } finally {
      setRemovingAdmin(false);
      setAdminToRemove(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold text-foreground">Manage Admins</h3>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            placeholder="Enter email to add admin"
            className="flex-1 bg-transparent border border-border rounded-full h-[40px] px-4 text-[14px] text-white focus:outline-none focus:border-[#FF5722] transition-all"
            {...register("email")}
          />
          <button
            className={`px-6 h-[40px] font-bold text-[14px] rounded-full transition-all ${
              !emailValue || addingAdmin
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-[#FF5722] text-white hover:bg-[#E64A19]"
            }`}
            onClick={handleSubmit(onAddAdmin)}
            disabled={!emailValue || addingAdmin}
          >
            {addingAdmin ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : "Add"}
          </button>
        </div>
        {errors.email && (
          <p className="text-red-500 text-[10px] font-semibold px-2">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="flex justify-center p-4">
            <div className="w-6 h-6 border-2 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
          </div>
        ) : admins.length === 0 ? (
          <p className="text-muted-foreground text-[12px] italic text-center p-4">
            No additional admins found.
          </p>
        ) : (
          admins.map((admin) => (
            <div
              key={admin.uid}
              className="flex items-center justify-between p-3 border border-border rounded-[12px] bg-muted"
            >
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-foreground">
                  {admin.displayName || "No Name"}
                </span>
                <span className="text-[12px] text-muted-foreground">
                  {admin.email}
                </span>
              </div>
              
              {admin.uid === communityData.creatorId ? (
                <span className="text-[10px] text-muted-foreground italic font-medium bg-muted px-2 py-0.5 rounded-full">
                  Creator
                </span>
              ) : admin.uid !== user?.id ? (
                <button
                  className="px-4 py-1 text-[12px] font-bold text-red-500 border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all"
                  onClick={() => setAdminToRemove(admin.uid)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>

      <ConfirmationDialog
        open={!!adminToRemove}
        onClose={() => setAdminToRemove(null)}
        onConfirm={confirmRemoveAdmin}
        title="Remove Admin"
        body="Are you sure you want to remove this user from admins?"
        confirmButtonText="Remove"
        isLoading={removingAdmin}
      />
    </div>
  );
};

export default AdminManager;
