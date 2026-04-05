import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  description: string;
  onOk: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
  okColor?: "error" | "primary" | "warning";
  loading?: boolean;
}

export const ConfirmationModal = ({
  open,
  title,
  description,
  onOk,
  onCancel,
  okText = "Confirm",
  cancelText = "Cancel",
  okColor = "error",
  loading = false,
}: Props) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} variant="outlined" disabled={loading}>
          {cancelText}
        </Button>
        <Button
          onClick={onOk}
          variant="contained"
          color={okColor}
          disabled={loading}
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
