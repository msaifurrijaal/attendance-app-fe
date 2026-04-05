import { PageHeader } from "@/components/common/PageHeader";
import { Card, Stack } from "@mui/material";
import { SectionDepartmentTable } from "./components/SectionDepartmentTable";

const Department = () => {
  return (
    <Stack direction="column" spacing="20px">
      <PageHeader
        title="Department"
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Department",
          },
        ]}
      />
      <Card
        sx={{
          padding: "16px",
        }}
      >
        <SectionDepartmentTable />
      </Card>
    </Stack>
  );
};

export default Department;
