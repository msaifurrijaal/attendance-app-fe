import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEmployeeSchema, type EmployeeForm } from "../validations/schema";
import { InfiniteSelect } from "@/components/common/InfiniteSelect";
import { SingleImageUpload } from "@/components/common/SingleImageUpload";
import { useFetchInfiniteDepartment } from "../services/fetchInfiniteDepartment.service";
import { useFetchInfiniteRole } from "../services/fetchInfiniteRole.service";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useUploadImage } from "@/services/action/uploadImage.service";
import { useToast } from "@/contexts/ToastContext";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { useRegisterUser } from "@/pages/auth/register/services/registerUser.service";

interface FormEmployeeProps {
  type: "add" | "edit";
  oldData?: any;
}

export const FormEmployee: FC<FormEmployeeProps> = ({ type, oldData }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutateAsync: uploadImage, isPending: loadingUploadImage } =
    useUploadImage();
  const { mutateAsync: registerUser, isPending: loadingRegisterUser } =
    useRegisterUser();

  const loadingSubmit = loadingRegisterUser;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EmployeeForm>({
    // @ts-expect-error
    resolver: zodResolver(getEmployeeSchema(type)),
  });

  const onSubmit = () => {
    setConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    const values = getValues();

    const payload = {
      ...values,
      role_id: values.role_id?.id,
      department_id: values.department_id?.id,
    };

    console.log({ payload });

    try {
      if (type === "add") {
        await registerUser(payload);
        showToast({ message: "Employee added successfully" });
      } else {
        // await updateEmployee({ id: oldData.id, payload });
        showToast({ message: "Employee updated successfully" });
      }
      setConfirmOpen(false);
      navigate(-1);
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
        console.log({ res });
        setValue("image_url", res.data.url);
      } catch (err: any) {
        console.log({ err });

        showToast({
          message: err?.response?.data?.message ?? "Failed to upload image",
          severity: "error",
        });
      }
    } else {
      setValue("image_url", undefined);
    }
  };

  return (
    <>
      <Card variant="outlined" sx={{ borderRadius: "8px" }}>
        <CardContent>
          <Stack
            spacing="24px"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Full Name *"
                  size="small"
                  fullWidth
                  {...register("full_name")}
                  error={!!errors.full_name}
                  helperText={errors.full_name?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Email *"
                  type="email"
                  size="small"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Password *"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  fullWidth
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Position"
                  size="small"
                  fullWidth
                  {...register("position")}
                  error={!!errors.position}
                  helperText={errors.position?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <InfiniteSelect
                      label="Role *"
                      labelKey="name"
                      valueKey="id"
                      fetchDataService={useFetchInfiniteRole}
                      value={field.value ?? null}
                      onChange={(_e, val) => field.onChange(val)}
                      error={!!errors.role_id}
                      helperText={errors.role_id?.message as string}
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="department_id"
                  control={control}
                  render={({ field }) => (
                    <InfiniteSelect
                      label="Department *"
                      labelKey="name"
                      valueKey="id"
                      fetchDataService={useFetchInfiniteDepartment}
                      value={field.value ?? null}
                      onChange={(_e, val) => field.onChange(val)}
                      error={!!errors.department_id}
                      helperText={errors.department_id?.message as string}
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Phone"
                  size="small"
                  fullWidth
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  type="number"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Address"
                  size="small"
                  fullWidth
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing="8px">
                  <Typography variant="body2" color="text.secondary">
                    Profile Photo
                  </Typography>
                  <Controller
                    name="image_url"
                    control={control}
                    render={({ field }) => (
                      <SingleImageUpload
                        oldImage={field.value ?? null}
                        onImageUpload={(file) => handleUploadImage(file)}
                        onDeleteImage={() => setValue("image_url", undefined)}
                        loading={loadingUploadImage}
                      />
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={() => navigate("/employee")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {type === "add" ? "Add Employee" : "Update Employee"}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <ConfirmationModal
        open={confirmOpen}
        title={type === "add" ? "Add Employee" : "Update Employee"}
        description={
          type === "add"
            ? "Are you sure you want to add this employee?"
            : "Are you sure you want to update this employee?"
        }
        okText={type === "add" ? "Add" : "Update"}
        okColor="primary"
        onOk={handleConfirmSubmit}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};
