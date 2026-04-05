import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { useGetDepartments } from "../services/getDepartments.service";
import { debounce } from "lodash";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { useToast } from "@/contexts/ToastContext";
import { useDeleteDepartment } from "../services/deleteDepartment.service";
import type { Department } from "../types/department.type";
import { ModalCreateEditDepartment } from "./ModalCreateEditDepartment";

export const SectionDepartmentTable = () => {
  const { showToast } = useToast();

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [search, setSearch] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [modalCreateEditOpen, setModalCreateEditOpen] = useState<{
    open: boolean;
    selectedData: Department | null;
  }>({
    open: false,
    selectedData: null,
  });

  const { data, isLoading } = useGetDepartments({
    page: page + 1,
    limit: rowsPerPage,
    search: search || undefined,
    sort_by: "updated_at",
    sort_order: "desc",
  });
  const { mutateAsync: deleteDepartment, isPending: loadingDelete } =
    useDeleteDepartment();

  const debouncedSearch = useCallback(
    // eslint-disable-next-line
    debounce((value: string) => {
      setSearch(value);
      setPage(0);
    }, 500),
    [setSearch, setPage],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const columns: GridColDef[] = [
    { field: "code", headerName: "Code", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <Stack direction="row" spacing="4px">
          <IconButton onClick={() => handleCreateEditClick(params.row)}>
            <ModeEditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const handleCreateEditClick = (data: Department | null) => {
    setModalCreateEditOpen({ open: true, selectedData: data });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDepartment(selectedDeleteId!);
      setConfirmDeleteOpen(false);
      showToast({ message: "Department deleted successfully" });
    } catch (err: any) {
      showToast({
        message: err?.response?.data?.message ?? "Failed to delete",
        severity: "error",
      });
    }
  };

  return (
    <Stack spacing="16px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          placeholder="Search departments..."
          size="small"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 320 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCreateEditClick(null)}
        >
          Create Department
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ borderRadius: "8px" }}>
        <DataGrid
          rows={data?.data ?? []}
          columns={columns}
          rowCount={data?.meta.total ?? 0}
          paginationMode="server"
          paginationModel={{ page, pageSize: 10 }}
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
        title="Delete Department"
        description="Are you sure you want to delete this department?"
        onOk={handleConfirmDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
        loading={loadingDelete}
      />
      <ModalCreateEditDepartment
        open={modalCreateEditOpen.open}
        onCancel={() =>
          setModalCreateEditOpen({ open: false, selectedData: null })
        }
        selectedData={modalCreateEditOpen.selectedData}
      />
    </Stack>
  );
};
