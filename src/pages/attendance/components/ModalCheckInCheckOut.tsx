import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SingleImageUpload } from "@/components/common/SingleImageUpload";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { useUploadImage } from "@/services/action/uploadImage.service";
import { useCheckIn } from "../services/checkIn.service";
import { useCheckOut } from "../services/checkOut.service";
import { useToast } from "@/contexts/ToastContext";
import { attendanceSchema, type AttendanceForm } from "../validations/schema";

interface Props {
  open: boolean;
  onCancel: () => void;
  type: "checkIn" | "checkOut";
}

export const ModalCheckInCheckOut = ({ open, onCancel, type }: Props) => {
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutateAsync: uploadImage, isPending: loadingUpload } =
    useUploadImage();
  const { mutateAsync: checkIn, isPending: loadingCheckIn } = useCheckIn();
  const { mutateAsync: checkOut, isPending: loadingCheckOut } = useCheckOut();

  const isPending = loadingCheckIn || loadingCheckOut;

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttendanceForm>({
    resolver: zodResolver(attendanceSchema),
  });

  const handleClose = () => {
    reset();
    onCancel();
  };

  const onSubmit = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    const values = getValues();
    const now = new Date().toISOString();

    try {
      if (type === "checkIn") {
        await checkIn({
          check_in_time: now,
          check_in_photo: values.image_url,
        });
        showToast({ message: "Check in successful" });
      } else {
        await checkOut({
          check_out_time: now,
          check_out_photo: values.image_url,
        });
        showToast({ message: "Check out successful" });
      }
      setConfirmOpen(false);
      handleClose();
    } catch (err: any) {
      showToast({
        message: err?.response?.data?.message ?? "Something went wrong",
        severity: "error",
      });
      setConfirmOpen(false);
    }
  };

  const handleUploadImage = async (file: File | null) => {
    if (file) {
      try {
        const res = await uploadImage(file);
        setValue("image_url", res.data.url);
      } catch (err: any) {
        showToast({
          message: err?.response?.data?.message ?? "Failed to upload image",
          severity: "error",
        });
      }
    } else {
      setValue("image_url", "");
    }
  };

  const title = type === "checkIn" ? "Check In" : "Check Out";

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack
            spacing="16px"
            pt="8px"
            component="form"
            id="attendance-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="body2" color="text.secondary">
              Please upload your photo as proof of WFH
            </Typography>
            <Controller
              name="image_url"
              control={control}
              render={({ field }) => (
                <Stack spacing="8px">
                  <SingleImageUpload
                    oldImage={field.value ?? null}
                    onImageUpload={handleUploadImage}
                    onDeleteImage={() => setValue("image_url", "")}
                    loading={loadingUpload}
                  />
                  {errors.image_url && (
                    <Typography variant="caption" color="error">
                      {errors.image_url.message}
                    </Typography>
                  )}
                </Stack>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined" disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="attendance-form"
            variant="contained"
            disabled={isPending || loadingUpload}
          >
            {isPending ? "Saving..." : title}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={confirmOpen}
        title={title}
        description={`Are you sure you want to ${type === "checkIn" ? "check in" : "check out"} now?`}
        okText={title}
        okColor="primary"
        loading={isPending}
        onOk={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};
