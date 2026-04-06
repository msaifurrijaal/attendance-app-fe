import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { registerSchema, type RegisterForm } from "./validations/schema";
import { useRegisterUser } from "./services/registerUser.service";
import { useToast } from "@/contexts/ToastContext";
import { AuthLayout } from "../layouts/AuthLayout";
import { useGetHRRoleAndDepartment } from "./services/getHRData.service";

const ADMIN_CODE = "I_AM_ADMIN_HR";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);

  const { mutateAsync: registerUser, isPending: registerLoading } =
    useRegisterUser();
  const { mutateAsync: getHRData, isPending: getHRDataLoading } =
    useGetHRRoleAndDepartment();

  const loading = registerLoading || getHRDataLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterForm) => {
    if (values.admin_code !== ADMIN_CODE) {
      showToast({ message: "Invalid admin code", severity: "error" });
      return;
    }

    try {
      const { role, department } = await getHRData();

      if (!role) {
        showToast({ message: "HR Admin role not found", severity: "error" });
        return;
      }

      if (!department) {
        showToast({ message: "HR department not found", severity: "error" });
        return;
      }

      await registerUser({
        full_name: values.full_name,
        email: values.email,
        password: values.password,
        role_id: role.id,
        department_id: department.id,
      });

      showToast({ message: "Account created successfully" });
      navigate("/login");
    } catch (err: any) {
      showToast({
        message: err?.response?.data?.message ?? "Registration failed",
        severity: "error",
      });
    }
  };

  return (
    <AuthLayout>
      <Stack direction="column" spacing="20px">
        <Stack spacing="4px">
          <Typography variant="h3">Register</Typography>
          <Typography variant="body2" color="text.secondary">
            Create an admin account to manage attendance and employees.
          </Typography>
        </Stack>

        <Stack
          spacing="16px"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Full Name *"
            size="small"
            fullWidth
            {...register("full_name")}
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
          />

          <TextField
            label="Email *"
            type="email"
            size="small"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

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

          <TextField
            label="Admin Code *"
            size="small"
            fullWidth
            type={showAdminCode ? "text" : "password"}
            {...register("admin_code")}
            error={!!errors.admin_code}
            helperText={errors.admin_code?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowAdminCode((prev) => !prev)}
                    edge="end"
                    size="small"
                  >
                    {showAdminCode ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </Button>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account? <Link to="/login">Sign In</Link>
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </AuthLayout>
  );
};

export default RegisterPage;
