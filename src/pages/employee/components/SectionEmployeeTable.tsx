import { InfiniteSelect } from "@/components/common/InfiniteSelect";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { useFetchInfiniteDepartment } from "../services/fetchInfiniteDepartment.service";
import type { FilterTableState } from "../types/employee.type";
import { debounce } from "lodash";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { useToast } from "@/contexts/ToastContext";
import { useGetUsers } from "../services/getUsers.service";
import { stringEmptyGuard } from "@/utils/guard";
import { useDeleteUser } from "../services/deleteUser.service";
import { useNavigate } from "react-router-dom";

export const SectionEmployeeTable = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [filter, setFilter] = useState<FilterTableState>({
    search: "",
    department: null,
  });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useGetUsers({
    page: page + 1,
    limit: rowsPerPage,
    search: filter.search || undefined,
    department_id: filter.department?.id || undefined,
  });

  const { mutateAsync: deleteUser, isPending: loadingDelete } = useDeleteUser();

  const debouncedSearch = useCallback(
    // eslint-disable-next-line
    debounce((value: string) => {
      handleFilterChange("search", value);
      setPage(0);
    }, 500),
    [],
  );

  const handleFilterChange = (key: keyof FilterTableState, value: any) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedDeleteId!);
      setConfirmDeleteOpen(false);
      showToast({ message: "Employee deleted successfully" });
    } catch (err: any) {
      showToast({
        message: err?.response?.data?.message ?? "Failed to delete",
        severity: "error",
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "full_name", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      renderCell: (params) => stringEmptyGuard(params.row.department?.name),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => stringEmptyGuard(params.row.role?.name),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <Stack direction="row" spacing="4px">
          <IconButton
            onClick={() => navigate(`/employee/edit/${params.row.id}`)}
          >
            <ModeEditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing="16px">
      <Stack direction="row" spacing="20px" justifyContent="space-between">
        <Grid container spacing={2} width="100%">
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Search employee..."
              size="small"
              onChange={(e) => debouncedSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GridSearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfiniteSelect
              label="Department"
              labelKey="name"
              valueKey="id"
              value={filter?.department}
              fetchDataService={(e) => useFetchInfiniteDepartment(e)}
              onChange={(_e, val) => handleFilterChange("department", val)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} width="100%" justifyContent="flex-end">
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/employee/add")}
            >
              Add Employee
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button variant="outlined" fullWidth>
              Export Data
            </Button>
          </Grid>
        </Grid>
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: "8px" }}>
        <DataGrid
          rows={data?.data ?? []}
          columns={columns}
          rowCount={data?.meta.total ?? 0}
          paginationMode="server"
          paginationModel={{ page, pageSize: rowsPerPage }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
          }}
          pageSizeOptions={[10]}
          loading={isLoading}
          disableRowSelectionOnClick
          autoHeight
          sx={{ border: "none" }}
        />
      </Paper>

      <ConfirmationModal
        open={confirmDeleteOpen}
        title="Delete Employee"
        description="Are you sure you want to delete this employee?"
        onOk={handleConfirmDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
        loading={loadingDelete}
      />
    </Stack>
  );
};
