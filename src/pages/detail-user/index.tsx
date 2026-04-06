import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGetDetailUser } from "@/services/fetch/getDetailUser.service";
import { LoadingState } from "@/components/feedback/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { ModalUpdatePassword } from "@/pages/employee/components/ModalUpdatePassword";
import { stringEmptyGuard } from "@/utils/guard";
import LockResetIcon from "@mui/icons-material/LockReset";

const DetailUserPage = () => {
  const { user: authUser } = useAuth();
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);

  const { data, isLoading } = useGetDetailUser(authUser?.id as string);
  const user = data?.user;

  if (isLoading) return <LoadingState />;

  return (
    <Stack spacing="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageHeader
          title="My Profile"
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "My Profile" },
          ]}
        />
        <Button
          variant="outlined"
          startIcon={<LockResetIcon />}
          onClick={() => setModalPasswordOpen(true)}
        >
          Update Password
        </Button>
      </Box>

      <Card variant="outlined" sx={{ borderRadius: "8px" }}>
        <CardContent>
          <Stack spacing="24px">
            {/* Avatar & Name */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                src={user?.image_url ?? undefined}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: 32,
                }}
              >
                {user?.full_name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5">{user?.full_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Stack>

            {/* Detail Info */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing="4px">
                  <Typography variant="caption" color="text.secondary">
                    Role
                  </Typography>
                  <Chip
                    label={stringEmptyGuard(user?.role?.name)}
                    color="primary"
                    size="small"
                    sx={{ width: "fit-content" }}
                  />
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing="4px">
                  <Typography variant="caption" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body2">
                    {stringEmptyGuard(user?.department?.name)}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing="4px">
                  <Typography variant="caption" color="text.secondary">
                    Position
                  </Typography>
                  <Typography variant="body2">
                    {stringEmptyGuard(user?.position)}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing="4px">
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body2">
                    {stringEmptyGuard(user?.phone)}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Stack spacing="4px">
                  <Typography variant="caption" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body2">
                    {stringEmptyGuard(user?.address)}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      <ModalUpdatePassword
        open={modalPasswordOpen}
        onCancel={() => setModalPasswordOpen(false)}
        userId={authUser?.id as string}
      />
    </Stack>
  );
};

export default DetailUserPage;
