import { PageHeader } from "@/components/common/PageHeader";
import { Button, Grid, Stack } from "@mui/material";
import { FormEmployee } from "../../components/FormEmployee";
import { useGetDetailUser } from "@/services/fetch/getDetailUser.service";
import { useParams } from "react-router-dom";
import { LoadingState } from "@/components/feedback/LoadingState";
import { useState } from "react";
import { ModalUpdatePassword } from "../../components/ModalUpdatePassword";

const EditEmployeePage = () => {
  const { id } = useParams();

  const [showModalUpdatePass, setShowModalUpdatePass] = useState(false);

  const {
    data: detailUser,
    isLoading,
    isFetching,
  } = useGetDetailUser(id as string);

  if (isLoading || isFetching) return <LoadingState />;

  return (
    <Stack spacing="20px">
      <Grid container spacing="20px">
        <Grid size={{ xs: 12, md: 8 }}>
          <PageHeader
            title="Edit Employee"
            breadcrumbs={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Employee", href: "/employee" },
              { label: "Edit Employee" },
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
          <Button
            variant="contained"
            onClick={() => setShowModalUpdatePass(true)}
          >
            Update Password
          </Button>
        </Grid>
      </Grid>

      <FormEmployee type="edit" oldData={detailUser?.user} />

      <ModalUpdatePassword
        open={showModalUpdatePass}
        onCancel={() => setShowModalUpdatePass(false)}
        userId={id as string}
      />
    </Stack>
  );
};

export default EditEmployeePage;
