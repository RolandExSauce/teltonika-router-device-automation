import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, Stack, Typography } from "@mui/material";
import ProfilDialog from "./AuthProfil";
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { AdminRoutes } from "./tools";
import { LOGOUT_USER_QUERY } from "../../graphql/queries";
import { client } from "../../auth/apolloClient";
import { Query } from "../../generated/gql/graphql";
import { SidebarProps } from "../types";

//custom sidebar
const ProSidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggled,
  onBackdropClick,
  handleCollapsedChange,
}) => {
  const navigate = useNavigate();
  const [logoutUser] = useLazyQuery<Query>(LOGOUT_USER_QUERY);

  // close and open sidebar ------------------------------
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={onBackdropClick}
      breakPoint="md"
      rootStyles={{
        "& .ps-sidebar-container": {
          backgroundColor: "#100c08 !important",
          width: "105%",
        },
      }}
    >
      <Menu>
        {collapsed ? (
          <Box
            onClick={handleCollapsedChange}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <FaAngleDoubleRight
              style={{
                color: "#FFFFF0",
                fontSize: 25,
                alignItems: "center",
                margin: "10px 10px 10px 20px",
              }}
            />
          </Box>
        ) : (
          <Stack
            onClick={handleCollapsedChange}
            direction={"row"}
            spacing={7}
            sx={{
              margin: "20px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Lilita One",
                textTransform: "uppercase",
                fontSize: 25,
                color: "#FFFFF0",
              }}
            >
              Teltonika
            </Typography>
            <FaAngleDoubleLeft
              style={{
                marginLeft: 65,
                color: "#FFFFF0",
                fontSize: 35,
                padding: 3,
              }}
            />
          </Stack>
        )}
        <MenuItem
          onClick={() => {
            navigate("/");
          }}
          rootStyles={{
            color:
              window.location.pathname === "/dashboard" ? "#1E90FF" : "#FFFFF0",
            ":hover": {
              color: "#100c08",
            },
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <DashboardIcon />
            <Typography style={{ fontWeight: "bold" }}>
              Data Dashboard
            </Typography>
          </Stack>
        </MenuItem>
        {/* show this section only for superadmins*/}

        <>
          <SubMenu
            rootStyles={{
              color:
                window.location.pathname === "/admin-tools"
                  ? "#1E90FF"
                  : "#FFFFF0",
              ":hover": {
                color: "#100c08",
                backgroundColor: "#f5f5f5",
              },
            }}
            label={
              <Stack direction={"row"} spacing={2}>
                <AdminPanelSettingsIcon
                  style={{
                    marginLeft: 3,
                  }}
                />
                <Typography style={{ fontWeight: "bold" }}>
                  Admin board
                </Typography>
              </Stack>
            }
          >
            <AdminRoutes />
          </SubMenu>
        </>
      </Menu>

      <Stack
        className="sidebar-btn-wrapper"
        sx={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        direction={"column"}
        spacing={5}
      >
        <Button
          variant="text"
          size="large"
          sx={{
            backgroundColor: collapsed ? "" : "#FFFFF0",
            borderRadius: 30,
            ":hover": {
              bgcolor: collapsed ? "transparent" : "#FFFFF0",
            },
          }}
          disableRipple={true}
          onClick={handleClickOpen}
        >
          <AccountCircleIcon
            fontSize="large"
            sx={{ color: collapsed ? "#FFFFF0" : "#100c08", marginRight: 1 }}
          />
          {!collapsed && (
            <span
              style={{
                color: "#100c08",
                fontFamily: "Lilita One",
              }}
            >
              My Profile
            </span>
          )}
        </Button>

        <Button
          variant="text"
          size="small"
          sx={{
            borderRadius: 30,
            padding: 1,
            backgroundColor: collapsed ? "" : "#FFFFF0",
            width: "18ch",

            ":hover": {
              bgcolor: collapsed ? "transparent" : "#FFFFF0",
            },
          }}
          onClick={async () => {
            await logoutUser();
            localStorage.clear();
            client.clearStore();
            navigate("/login");
          }}
        >
          <LogoutIcon
            sx={{ color: collapsed ? "#FFFFF0" : "#100c08", marginRight: 1 }}
          />
          {!collapsed && (
            <span
              style={{
                marginLeft: 3,
                color: "#100c08",
                fontFamily: "Lilita One",
              }}
            >
              Logout
            </span>
          )}
        </Button>
      </Stack>
      <ProfilDialog open={open} onClose={handleClose} />
    </Sidebar>
  );
};
export default ProSidebar;
