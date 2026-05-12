import { Community } from "@/types/community";
import { Box, Button, Flex, Image, Input, Stack, Text, Textarea } from "@chakra-ui/react";
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

/**
 * Component for managing community profile settings
 */
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
    <Stack gap={6}>
      <Stack>
        <Text fontWeight={600} fontSize="12pt">
          Community Description
        </Text>
        <Textarea 
          placeholder="Tell us about your community"
          value={description || ""}
          onChange={(e) => setDescription && setDescription(e.target.value)}
          maxLength={500}
        />
      </Stack>

      <Stack>
        <Text fontWeight={600} fontSize="12pt">
          Community Image
        </Text>
        <Flex direction="column" align="center" width="100%">
          {imageToDisplay ? (
            <Image
              borderRadius="full"
              boxSize="100px"
              src={imageToDisplay}
              alt="Community Image"
              objectFit="cover"
            />
          ) : (
            <Box
              borderRadius="full"
              boxSize="100px"
              border="4px dashed"
              borderColor="gray.200"
            />
          )}
          <Stack direction="row" mt={4}>
            <Button height="28px" onClick={() => selectFileRef.current?.click()}>
              Change Image
            </Button>
            {(currentCommunity?.imageURL || selectedFile) && (
              <Button
                height="28px"
                onClick={() => setDeleteImage(!deleteImage)}
                variant={deleteImage ? "solid" : "outline"}
              >
                {deleteImage ? "Undo Delete" : "Delete Image"}
              </Button>
            )}
          </Stack>
          <Input ref={selectFileRef} type="file" hidden onChange={onSelectFile} accept="image/*" />
        </Flex>
      </Stack>

      {onSelectBannerFile && selectBannerRef && (
        <Stack>
          <Text fontWeight={600} fontSize="12pt">
            Community Banner
          </Text>
          <Flex direction="column" align="center" width="100%">
            {bannerToDisplay ? (
              <Image
                width="100%"
                height="120px"
                borderRadius="md"
                src={bannerToDisplay}
                alt="Community Banner"
                objectFit="cover"
              />
            ) : (
              <Box
                width="100%"
                height="120px"
                borderRadius="md"
                border="4px dashed"
                borderColor="gray.200"
              />
            )}
            <Stack direction="row" mt={4}>
              <Button height="28px" onClick={() => selectBannerRef.current?.click()}>
                Change Banner
              </Button>
              {(currentCommunity?.bannerURL || selectedBannerFile) && setDeleteBanner && (
                <Button
                  height="28px"
                  onClick={() => setDeleteBanner(!deleteBanner)}
                  variant={deleteBanner ? "solid" : "outline"}
                >
                  {deleteBanner ? "Undo Delete" : "Delete Banner"}
                </Button>
              )}
            </Stack>
            <Input ref={selectBannerRef} type="file" hidden onChange={onSelectBannerFile} accept="image/*" />
          </Flex>
        </Stack>
      )}
    </Stack>
  );
};

export default ImageSettings;
