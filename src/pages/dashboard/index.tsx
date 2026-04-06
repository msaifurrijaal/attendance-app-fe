import { PageHeader } from "@/components/common/PageHeader";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useGetDashboardAttendances } from "./services/getDashboardAttendances.service";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { PieChart } from "@mui/x-charts/PieChart";

type FilterType = "today" | "week" | "month";

const STATUS_COLORS = ["#4CAF50", "#2196F3", "#FF9800"];
const DEPT_COLORS = [
  "#1976D2",
  "#E91E63",
  "#9C27B0",
  "#00BCD4",
  "#FF5722",
  "#607D8B",
  "#795548",
];

const DashboardPage = () => {
  const [filter, setFilter] = useState<FilterType>("today");
  const { data, isLoading } = useGetDashboardAttendances(filter);
  const attendances = data?.data ?? [];

  const totalAttendances = attendances.length;

  const completed = attendances.filter((a: any) => a.check_out_time).length;

  const active = attendances.filter((a: any) => {
    if (a.check_out_time) return false;
    const diffHours =
      (new Date().getTime() - new Date(a.check_in_time).getTime()) /
      (1000 * 60 * 60);
    return diffHours < 24;
  }).length;

  const uncompleted = totalAttendances - completed - active;

  const statusData = [
    { name: "Completed", value: completed },
    { name: "Active", value: active },
    { name: "Uncompleted", value: uncompleted },
  ].filter((d) => d.value > 0);

  const departmentData = useMemo(() => {
    const map: Record<string, { name: string; value: number }> = {};
    attendances.forEach((a: any) => {
      const deptName = a.user?.department?.name ?? "Unknown";
      if (!map[deptName]) map[deptName] = { name: deptName, value: 0 };
      map[deptName].value += 1;
    });
    return Object.values(map);
  }, [attendances]);

  const summaryCards = [
    {
      label: "Total Attendances",
      description:
        "Total number of attendance records submitted by all employees in this period",
      value: totalAttendances,
      icon: <PeopleIcon color="primary" />,
      bgcolor: "primary.light",
    },
  ];

  return (
    <Stack spacing="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageHeader title="Dashboard" breadcrumbs={[{ label: "Dashboard" }]} />
        <ButtonGroup size="small" variant="outlined">
          {(["today", "week", "month"] as FilterType[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "contained" : "outlined"}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        {summaryCards.map((card) => (
          <Grid key={card.label} size={{ xs: 12 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      bgcolor: card.bgcolor,
                      borderRadius: "8px",
                      p: 1,
                      display: "flex",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {card.label}
                    </Typography>
                    <Typography variant="h4">{card.value}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {card.description}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pie Charts */}
      <Grid container spacing={2}>
        {/* Status Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" mb={2}>
                Attendance by Status
              </Typography>
              {isLoading || statusData.length === 0 ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height={300}
                >
                  <Typography color="text.secondary">
                    {isLoading ? "Loading..." : "No data"}
                  </Typography>
                </Box>
              ) : (
                <PieChart
                  series={[
                    {
                      data: statusData.map((d, index) => ({
                        id: index,
                        value: d.value,
                        label: d.name,
                        color: STATUS_COLORS[index % STATUS_COLORS.length],
                      })),
                      highlightScope: { fade: "global", highlight: "item" },
                      innerRadius: 30,
                      outerRadius: 100,
                    },
                  ]}
                  height={300}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Department Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" mb={2}>
                Attendance by Department
              </Typography>
              {isLoading || departmentData.length === 0 ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height={300}
                >
                  <Typography color="text.secondary">
                    {isLoading ? "Loading..." : "No data"}
                  </Typography>
                </Box>
              ) : (
                <PieChart
                  series={[
                    {
                      data: departmentData.map((d, index) => ({
                        id: index,
                        value: d.value,
                        label: d.name,
                        color: DEPT_COLORS[index % DEPT_COLORS.length],
                      })),
                      highlightScope: { fade: "global", highlight: "item" },
                      innerRadius: 30,
                      outerRadius: 100,
                    },
                  ]}
                  height={300}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DashboardPage;
