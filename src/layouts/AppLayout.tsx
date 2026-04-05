import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchUserMe } from "@/services/fetch/fetchUserMe.service";
import { LoadingState } from "@/components/feedback/LoadingState";

const SIDEBAR_WIDTH = 240;

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Attendance", icon: <AccessTimeIcon />, path: "/attendance" },
  { label: "Employees", icon: <PeopleIcon />, path: "/employees" },
  { label: "Departments", icon: <BusinessIcon />, path: "/departments" },
];

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { user, setUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { mutateAsync: fetchUserMe } = useFetchUserMe();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const setDataUser = async () => {
    const response = await fetchUserMe();
    setUser(response.user);
  };

  useEffect(() => {
    if (user) return;

    setDataUser();
  }, []);

  const sidebarContent = (
    <Box display="flex" flexDirection="column" height="100%">
      <Toolbar>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Attendance App
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              if (!isDesktop) setMobileOpen(false);
            }}
            sx={{
              borderRadius: "8px",
              mb: "4px",
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "common.white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                "& .MuiListItemIcon-root": {
                  color: "common.white",
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box p={2}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              fontSize: 14,
            }}
          >
            {user?.image_url ? (
              <Box
                component="img"
                src={user.image_url}
                alt="foto"
                sx={{ width: "100%", borderRadius: "8px" }}
              />
            ) : (
              `${user?.full_name?.charAt(0)}` || "-"
            )}
          </Avatar>
          <Box overflow="hidden">
            <Typography variant="body2" fontWeight={500} noWrap>
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Admin HR
            </Typography>
          </Box>
        </Box>
        <ListItemButton
          onClick={() => console.log("logout")}
          sx={{ borderRadius: "8px", color: "error.main" }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "error.main" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  if (!user) return <LoadingState />;

  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar desktop */}
      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Sidebar mobile */}
      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main content */}
      <Box display="flex" flexDirection="column" flex={1} minWidth={0}>
        {/* Navbar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            color: "text.primary",
          }}
        >
          <Toolbar>
            {!isDesktop && (
              <IconButton
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" fontWeight={500} flex={1}>
              {menuItems.find((m) => m.path === location.pathname)?.label ??
                "Dashboard"}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box component="main" flex={1} p={3} bgcolor="grey.50">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
