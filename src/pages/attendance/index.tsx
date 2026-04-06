import { PageHeader } from "@/components/common/PageHeader";
import { Alert, Button, Card, Grid, Stack } from "@mui/material";
import { useGetLatestAttendance } from "./services/getLatestAttendance.service";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState } from "@/components/feedback/LoadingState";
import { useMemo, useState } from "react";
import { formatDateTimeString } from "@/utils/dateFormatter";
import { ModalCheckInCheckOut } from "./components/ModalCheckInCheckOut";
import { SectionTableAttendance } from "./components/SectionTableAttendance";

const AttendancePage = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState<{
    open: boolean;
    type: "checkIn" | "checkOut";
  }>({
    open: false,
    type: "checkIn",
  });

  const { data, isLoading, isFetching } = useGetLatestAttendance(
    user?.id as string,
  );

  const latestAttendance = data?.data[0];

  const showButtonCheckIn = useMemo(() => {
    if (!latestAttendance) return true;
    if (latestAttendance?.check_out_time) return true;
    return false;
  }, [latestAttendance]);

  const showButtonCheckOut = useMemo(() => {
    if (!latestAttendance) return false;
    if (latestAttendance?.check_out_time) return false;
    return true;
  }, [latestAttendance]);

  if (isLoading || isFetching) return <LoadingState />;

  return (
    <Stack direction="column" spacing="20px">
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <PageHeader
            title="Attendance"
            breadcrumbs={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Attendance" },
            ]}
          />
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {showButtonCheckIn && (
            <Button
              variant="contained"
              onClick={() => setModalOpen({ open: true, type: "checkIn" })}
            >
              Check In
            </Button>
          )}
          {showButtonCheckOut && (
            <Button
              variant="contained"
              onClick={() => setModalOpen({ open: true, type: "checkOut" })}
            >
              Check Out
            </Button>
          )}
        </Grid>
      </Grid>

      <Card sx={{ padding: "16px" }}>
        <Stack spacing="40px">
          <Stack spacing="16px">
            <Alert severity="warning">
              If you check in and do not check out within 24 hours, your
              attendance will be marked as Uncompleted, and you will need to
              check in again.
            </Alert>
            {showButtonCheckOut && (
              <Alert severity="info">
                You latest check in at{" "}
                {formatDateTimeString(latestAttendance?.check_in_time)}
              </Alert>
            )}
          </Stack>

          <SectionTableAttendance />
        </Stack>
      </Card>

      <ModalCheckInCheckOut
        open={modalOpen.open}
        type={modalOpen.type}
        onCancel={() => setModalOpen({ open: false, type: "checkIn" })}
      />
    </Stack>
  );
};

export default AttendancePage;
