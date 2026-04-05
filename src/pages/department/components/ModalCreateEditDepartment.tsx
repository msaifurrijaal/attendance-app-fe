import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useCreateDepartment } from "../services/createDepartment.service";
import { useUpdateDepartment } from "../services/updateDepartment.service";
import { useToast } from "@/contexts/ToastContext";
import type { Department } from "../types/department.type";
import { departmentSchema, type DepartmentForm } from "../validations/schema";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";

interface Props {
  open: boolean;
  onCancel: () => void;
  selectedData: Department | null;
}

export const ModalCreateEditDepartment = ({
  open,
  onCancel,
  selectedData,
}: Props) => {
  const isEdit = !!selectedData;
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<DepartmentForm | null>(
    null,
  );

  const { mutateAsync: createDepartment, isPending: isCreating } =
    useCreateDepartment();
  const { mutateAsync: updateDepartment, isPending: isUpdating } =
    useUpdateDepartment();

  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentForm>({
    resolver: zodResolver(departmentSchema),
  });

  useEffect(() => {
    if (open) {
      reset(
        selectedData
          ? { code: selectedData.code, name: selectedData.name }
          : { code: "", name: "" },
      );
    }
  }, [open, selectedData]);

  const onSubmit = (values: DepartmentForm) => {
    setPendingValues(values);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingValues) return;

    try {
      if (isEdit) {
        await updateDepartment({ id: selectedData.id, payload: pendingValues });
        showToast({ message: "Department updated successfully" });
      } else {
        await createDepartment(pendingValues);
        showToast({ message: "Department created successfully" });
      }
      setConfirmOpen(false);
      onCancel();
    } catch (err: any) {
      showToast({
        message: err?.response?.data?.message ?? "Something went wrong",
        severity: "error",
      });
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
        <DialogTitle>
          {isEdit ? "Edit Department" : "Create Department"}
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing="16px"
            component="form"
            id="department-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="body2" color="text.secondary">
              Please fill in the required fields
            </Typography>
            <TextField
              label="Code *"
              size="small"
              {...register("code")}
              error={!!errors.code}
              helperText={errors.code?.message}
              fullWidth
            />
            <TextField
              label="Name *"
              size="small"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onCancel} variant="outlined" disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="department-form"
            variant="contained"
            disabled={isPending}
          >
            {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={confirmOpen}
        title={isEdit ? "Update Department" : "Create Department"}
        description={
          isEdit
            ? "Are you sure you want to update this department?"
            : "Are you sure you want to create this department?"
        }
        okText={isEdit ? "Update" : "Create"}
        okColor="primary"
        loading={isPending}
        onOk={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};
