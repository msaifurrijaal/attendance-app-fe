import { Box, CircularProgress } from "@mui/material";
import type { FC } from "react";

interface LoadingStateProps {
  height?: string;
}

export const LoadingState: FC<LoadingStateProps> = ({ height = "100vh" }) => {
  return (
    <Box
      sx={{
        height: height,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
