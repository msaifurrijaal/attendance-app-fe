import { Box, Stack } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

interface IAuthLayoutProps {}

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      sx={{
        minHeight: "95vh",
        padding: "24px",
      }}
      direction="row"
      spacing="24px"
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "95vh",
          height: "100%",
          backgroundImage: "url('/assets/images/background/bg.jpg')",
          backgroundSize: "cover",
          borderRadius: "12px",
        }}
      />
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
