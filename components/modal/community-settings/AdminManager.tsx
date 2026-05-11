import { Community } from "@/types/community";
import useCustomToast from "@/hooks/useCustomToast";
import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
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

/**
 * Admin management panel for adding and removing moderators on a community.
 * Handles email search, duplication checks, and confirmation before removal.
 */
const AdminManager: React.FC<AdminManagerProps> = ({ communityData }) => {
  // Placeholder for missing hooks
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddAdminInput>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: { email: "" },
  });

  const emailValue = watch("email");

  const [addingAdmin, setAddingAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState<AdminUser[]>([]);
  const [showResults, setShowResults] = useState(false);
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
      // TODO: Implement backend add admin
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
    <Stack gap={4}>
      <Text fontSize="lg" fontWeight={600}>
        Manage Admins
      </Text>

      <Box position="relative">
        <Flex gap={2} direction="column">
          <Flex gap={2}>
            <Input
              placeholder="Enter email to add admin"
              {...register("email")}
              onFocus={() =>
                emailValue && emailValue.length >= 3 && setShowResults(true)
              }
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              borderRadius={"xl"}
            />
            <Button
              onClick={handleSubmit(onAddAdmin)}
              loading={addingAdmin}
              disabled={!emailValue}
            >
              Add
            </Button>
          </Flex>
          {errors.email && (
            <Text color="red.500" fontSize="xs">
              {errors.email.message}
            </Text>
          )}
        </Flex>
      </Box>

      {loading ? (
        <Flex justify="center" p={4}>
          <Spinner />
        </Flex>
      ) : (
        <Stack gap={2}>
          {admins.map((admin) => (
            <Flex
              key={admin.uid}
              align="center"
              justify="space-between"
              p={2}
              borderWidth="1px"
              borderRadius="xl"
            >
              <Stack gap={0}>
                <Text fontWeight={600}>{admin.displayName || "No Name"}</Text>
                <Text fontSize="sm" color="gray.500">
                  {admin.email}
                </Text>
              </Stack>
              {admin.uid !== communityData.creatorId &&
                admin.uid !== user?.id && (
                  <Button
                    size="sm"
                    variant="outline"
                    colorPalette="red"
                    onClick={() => setAdminToRemove(admin.uid)}
                  >
                    Remove
                  </Button>
                )}
              {admin.uid === communityData.creatorId && (

                <Text fontSize="xs" color="gray.500" fontStyle="italic">
                  Creator
                </Text>
              )}
            </Flex>
          ))}
        </Stack>
      )}
      <ConfirmationDialog
        open={!!adminToRemove}
        onClose={() => setAdminToRemove(null)}
        onConfirm={confirmRemoveAdmin}
        title="Remove Admin"
        body="Are you sure you want to remove this user from admins?"
        confirmButtonText="Remove"
        isLoading={removingAdmin}
      />
    </Stack>
  );
};

export default AdminManager;

