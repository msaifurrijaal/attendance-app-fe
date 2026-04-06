import {
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useState } from "react";
import dayjs from "dayjs";
import { formatDateTimeString } from "@/utils/dateFormatter";
import { DialogShowImage } from "@/components/common/DialogShowImage";
import { InfiniteSelect } from "@/components/common/InfiniteSelect";
import { useFetchInfiniteDepartment } from "@/pages/employee/services/fetchInfiniteDepartment.service";
import { useGetEmployeeAttendances } from "../services/getEmployeeAttendances.service";
import { useFetchInfiniteUsers } from "../services/fetchInfiniteUsers.service";
import { useGetAllEmployeeAttendances } from "../services/getAllEmployeeAttendances.service";
import { exportToExcel } from "../utils/exportExcel.util";
import { useToast } from "@/contexts/ToastContext";

interface FilterState {
  user: Record<string, any> | null;
  department: Record<string, any> | null;
  start_date: string;
  end_date: string;
}

export const SectionTableEmployeeAttendance = () => {
  const { showToast } = useToast();

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [selectedImage, setSelectedImage] = useState("");
  const [openImage, setOpenImage] = useState(false);

  const [filter, setFilter] = useState<FilterState>({
    user: null,
    department: null,
    start_date: "",
    end_date: "",
  });

  const { mutateAsync: getAllAttendances, isPending: loadingExport } =
    useGetAllEmployeeAttendances();

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const { data, isLoading } = useGetEmployeeAttendances({
    page: page + 1,
    limit: rowsPerPage,
    user_id: filter.user?.id || undefined,
    department_id: filter.department?.id || undefined,
    start_date: filter.start_date || undefined,
    end_date: filter.end_date || undefined,
  });

  const handleShowImage = (url: string) => {
    setSelectedImage(url);
    setOpenImage(true);
  };

  const handleExport = async () => {
    try {
      const res = await getAllAttendances();
      await exportToExcel(res.data);
      showToast({
        message: "Successfully exported",
      });
    } catch {
      showToast({
        message: "Failed to export",
        severity: "error",
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "Employee",
      flex: 1,
      renderCell: (params) => params.row.user?.full_name ?? "-",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      renderCell: (params) => params.row.user?.department?.name ?? "-",
    },
    {
      field: "check_in_time",
      headerName: "Check In",
      flex: 1,
      renderCell: (params) => formatDateTimeString(params.value),
    },
    {
      field: "check_out_time",
      headerName: "Check Out",
      flex: 1,
      renderCell: (params) =>
        params.value ? formatDateTimeString(params.value) : "-",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const { check_in_time, check_out_time } = params.row;
        let label = "";
        let color: "success" | "warning" | "info" = "info";

        if (check_out_time) {
          label = "Completed";
          color = "success";
        } else if (check_in_time) {
          const diffHours =
            (new Date().getTime() - new Date(check_in_time).getTime()) /
            (1000 * 60 * 60);
          if (diffHours >= 24) {
            label = "Uncompleted";
            color = "warning";
          } else {
            label = "Active";
            color = "info";
          }
        }

        return <Chip label={label} color={color} size="small" />;
      },
    },
    {
      field: "check_in_photo",
      headerName: "Check In Photo",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <IconButton
            size="small"
            onClick={() => handleShowImage(params.value)}
          >
            <ImageSearchIcon color="primary" fontSize="small" />
          </IconButton>
        ) : (
          "-"
        ),
    },
    {
      field: "check_out_photo",
      headerName: "Check Out Photo",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <IconButton
            size="small"
            onClick={() => handleShowImage(params.value)}
          >
            <ImageSearchIcon color="primary" fontSize="small" />
          </IconButton>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <>
      <Stack spacing="16px">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfiniteSelect
              label="Employee"
              labelKey="full_name"
              valueKey="id"
              fetchDataService={useFetchInfiniteUsers}
              value={filter.user}
              onChange={(_e, val) => handleFilterChange("user", val)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfiniteSelect
              label="Department"
              labelKey="name"
              valueKey="id"
              fetchDataService={useFetchInfiniteDepartment}
              value={filter.department}
              onChange={(_e, val) => handleFilterChange("department", val)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label="Start Date"
              type="datetime-local"
              size="small"
              fullWidth
              value={
                filter.start_date
                  ? dayjs(filter.start_date).format("YYYY-MM-DDTHH:mm")
                  : ""
              }
              onChange={(e) =>
                handleFilterChange(
                  "start_date",
                  e.target.value ? dayjs(e.target.value).toISOString() : "",
                )
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label="End Date"
              type="datetime-local"
              size="small"
              fullWidth
              value={
                filter.end_date
                  ? dayjs(filter.end_date).format("YYYY-MM-DDTHH:mm")
                  : ""
              }
              onChange={(e) =>
                handleFilterChange(
                  "end_date",
                  e.target.value ? dayjs(e.target.value).toISOString() : "",
                )
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              onClick={handleExport}
              disabled={loadingExport}
              fullWidth
            >
              {loadingExport ? "Exporting..." : "Export Data"}
            </Button>
          </Grid>
        </Grid>

        <Paper variant="outlined" sx={{ borderRadius: "8px" }}>
          <DataGrid
            rows={data?.data ?? []}
            columns={columns}
            rowCount={data?.meta.total ?? 0}
            paginationMode="server"
            paginationModel={{ page, pageSize: rowsPerPage }}
            onPaginationModelChange={(model) => setPage(model.page)}
            pageSizeOptions={[10]}
            loading={isLoading}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: "none" }}
          />
        </Paper>
      </Stack>

      <DialogShowImage
        image={selectedImage}
        isOpen={openImage}
        handleClose={() => {
          setOpenImage(false);
          setSelectedImage("");
        }}
      />
    </>
  );
};
