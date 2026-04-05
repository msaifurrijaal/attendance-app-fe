import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "@mui/material";
import { FormEmployee } from "../../components/FormEmployee";

const EditEmployeePage = () => {
  return (
    <Stack spacing="20px">
      <PageHeader
        title="Edit Employee"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Employee", href: "/employee" },
          { label: "Edit Employee" },
        ]}
      />
      <FormEmployee type="edit" />
    </Stack>
  );
};

export default EditEmployeePage;
