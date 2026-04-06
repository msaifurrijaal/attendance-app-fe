import { Box, Chip, IconButton, Paper, Stack, TextField } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetAttendances } from "../services/getAttendances.service";
import { useAuth } from "@/contexts/AuthContext";
import { formatDateTimeString } from "@/utils/dateFormatter";
import { DialogShowImage } from "@/components/common/DialogShowImage";

export const SectionTableAttendance = () => {
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [openImage, setOpenImage] = useState(false);

  const { data, isLoading } = useGetAttendances({
    page: page + 1,
    limit: rowsPerPage,
    user_id: user?.id,
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  });

  const handleShowImage = (url: string) => {
    setSelectedImage(url);
    setOpenImage(true);
  };

  const columns: GridColDef[] = [
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
          const checkIn = new Date(check_in_time);
          const now = new Date();

          const diffHours =
            (now.getTime() - checkIn.getTime()) / (1000 * 60 * 60);

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
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Start Date"
            type="datetime-local"
            size="small"
            value={startDate ? dayjs(startDate).format("YYYY-MM-DDTHH:mm") : ""}
            onChange={(e) => {
              setStartDate(
                e.target.value ? dayjs(e.target.value).toISOString() : "",
              );
              setPage(0);
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 220 }}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            size="small"
            value={endDate ? dayjs(endDate).format("YYYY-MM-DDTHH:mm") : ""}
            onChange={(e) => {
              setEndDate(
                e.target.value ? dayjs(e.target.value).toISOString() : "",
              );
              setPage(0);
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 220 }}
          />
        </Box>

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
