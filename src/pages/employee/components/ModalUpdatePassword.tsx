import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  updatePasswordSchema,
  type UpdatePasswordForm,
} from "../validations/schema";
import { useUpdatePassword } from "../services/updatePassword.service";
import { useToast } from "@/contexts/ToastContext";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";

interface Props {
  open: boolean;
  onCancel: () => void;
  userId: string;
}

export const ModalUpdatePassword = ({ open, onCancel, userId }: Props) => {
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<UpdatePasswordForm | null>(
    null,
  );

  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const handleClose = () => {
    reset();
    onCancel();
  };

  const onSubmit = (values: UpdatePasswordForm) => {
    setPendingValues(values);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingValues) return;
    try {
      await updatePassword({ id: userId, password: pendingValues.password });
      showToast({ message: "Password updated successfully" });
      setConfirmOpen(false);
      handleClose();
    } catch (err: any) {
      showToast({
        message: err?.response?.data?.message ?? "Failed to update password",
        severity: "error",
      });
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <Stack
            spacing="16px"
            pt="8px"
            component="form"
            id="update-password-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="New Password *"
              size="small"
              fullWidth
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password *"
              size="small"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirm_password")}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined" disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="update-password-form"
            variant="contained"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Update Password"}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={confirmOpen}
        title="Update Password"
        description="Are you sure you want to update this password?"
        okText="Update"
        okColor="primary"
        loading={isPending}
        onOk={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};
