import { PageHeader } from "@/components/common/PageHeader";
import { Card, Stack } from "@mui/material";
import { SectionEmployeeTable } from "./SectionEmployeeTable";

const EmployeePage = () => {
  return (
    <Stack direction="column" spacing="20px">
      <PageHeader
        title="Employee"
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Employee",
          },
        ]}
      />
      <Card
        sx={{
          padding: "16px",
        }}
      >
        <SectionEmployeeTable />
      </Card>
    </Stack>
  );
};

export default EmployeePage;
