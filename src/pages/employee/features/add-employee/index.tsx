import { PageHeader } from "@/components/common/PageHeader";

import { FormEmployee } from "../../components/FormEmployee";
import { Stack } from "@mui/material";

const AddEmployeePage = () => {
  return (
    <Stack spacing="20px">
      <PageHeader
        title="Add Employee"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Employee", href: "/employee" },
          { label: "Add Employee" },
        ]}
      />
      <FormEmployee type="add" />
    </Stack>
  );
};

export default AddEmployeePage;
