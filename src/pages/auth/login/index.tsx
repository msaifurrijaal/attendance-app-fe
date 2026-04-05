import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "./validations/schema";
import { useLogin } from "./services/login.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const { mutateAsync: login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      setErrorMsg("");
      const response = await login(values);
      const {
        data: { access_token, refresh_token },
      } = response;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      navigate("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.message ?? "Login failed";
      const status = err?.response?.status;
      console.log({ status, message });
      setErrorMsg(message);
    }
  };
  return (
    <AuthLayout>
      <Stack direction="column" spacing="20px">
        <Stack spacing="4px">
          <Typography variant="h3">Login</Typography>
          <Typography variant="body2">
            Sign in to your account to track attendance and keep your work on
            record.
          </Typography>
        </Stack>
        <Stack
          spacing="16px"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Sign In
          </Button>
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
        </Stack>
      </Stack>
    </AuthLayout>
  );
};

export default LoginPage;
