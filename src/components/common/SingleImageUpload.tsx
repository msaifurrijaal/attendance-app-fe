import { Box, IconButton, Typography } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { DialogShowImage } from "./DialogShowImage";

interface Props {
  onImageUpload: (file: File | null) => void;
  onDeleteImage?: (imageUrl: string) => void;
  oldImage?: string | null;
}

export const SingleImageUpload = ({
  onImageUpload,
  onDeleteImage,
  oldImage,
}: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    oldImage ?? null,
  );
  const [openShowImage, setOpenShowImage] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (oldImage) onDeleteImage?.(oldImage);
    setImagePreview(null);
    onImageUpload(null);
  };

  const handleShow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (imagePreview) setOpenShowImage(true);
  };

  return (
    <>
      <Box
        component="label"
        sx={{
          width: 120,
          height: 120,
          border: imagePreview ? "none" : "2px dashed #ccc",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          bgcolor: imagePreview ? "grey.100" : "transparent",
        }}
      >
        <input
          type="file"
          hidden
          accept="image/jpg,image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
        />

        {imagePreview ? (
          <>
            <Box
              component="img"
              src={imagePreview}
              alt="preview"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              onClick={handleRemove}
              size="small"
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
            <IconButton
              onClick={handleShow}
              size="small"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={0.5}
          >
            <PhotoCameraIcon
              sx={{ fontSize: "1.5rem", color: "text.disabled" }}
            />
            <Typography variant="caption" color="text.secondary">
              Upload Image
            </Typography>
          </Box>
        )}
      </Box>

      <DialogShowImage
        image={imagePreview ?? ""}
        isOpen={openShowImage}
        handleClose={() => setOpenShowImage(false)}
      />
    </>
  );
};
