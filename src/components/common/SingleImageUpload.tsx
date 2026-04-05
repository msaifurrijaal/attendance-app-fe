import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { DialogShowImage } from "./DialogShowImage";

interface Props {
  onImageUpload: (file: File | null) => void;
  onDeleteImage?: (imageUrl: string) => void;
  oldImage?: string | null;
  loading?: boolean;
}

export const SingleImageUpload = ({
  onImageUpload,
  onDeleteImage,
  oldImage,
  loading = false,
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
    e.target.value = "";
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

  useEffect(() => {
    if (oldImage) setImagePreview(oldImage);
  }, [oldImage]);

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
          cursor: loading ? "not-allowed" : "pointer",
          position: "relative",
          overflow: "hidden",
          bgcolor: imagePreview ? "grey.100" : "transparent",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <input
          type="file"
          hidden
          accept="image/jpg,image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          disabled={loading}
        />

        {loading ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgba(0,0,0,0.4)",
              borderRadius: "8px",
            }}
          >
            <CircularProgress size={28} sx={{ color: "white" }} />
          </Box>
        ) : imagePreview ? (
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
