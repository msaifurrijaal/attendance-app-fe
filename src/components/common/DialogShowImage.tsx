import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  image: string;
}

export const DialogShowImage = ({ image, isOpen, handleClose }: Props) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Image Preview</DialogTitle>
      <DialogContent>
        <Box
          component="img"
          src={image}
          alt="preview"
          sx={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
