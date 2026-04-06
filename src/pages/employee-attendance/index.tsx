import { PageHeader } from "@/components/common/PageHeader";
import { Card, Stack } from "@mui/material";
import { SectionTableEmployeeAttendance } from "./components/SectionTableEmployeeAttendance";

const EmployeeAttendancePage = () => {
  return (
    <Stack direction="column" spacing="20px">
      <PageHeader
        title="Employee Attendance"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Employee Attendance" },
        ]}
      />
      <Card
        sx={{
          padding: "16px",
        }}
      >
        <SectionTableEmployeeAttendance />
      </Card>
    </Stack>
  );
};

export default EmployeeAttendancePage;
