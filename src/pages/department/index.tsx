import { PageHeader } from "@/components/common/PageHeader";
import { Card, Stack } from "@mui/material";
import { SectionDepartmentTable } from "./components/SectionDepartmentTable";

const Department = () => {
  return (
    <Stack direction="column" spacing="20px">
      <PageHeader
        title="Departments"
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Departments",
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
