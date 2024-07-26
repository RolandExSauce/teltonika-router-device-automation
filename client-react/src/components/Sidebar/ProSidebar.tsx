import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfilDialog from "./AuthProfil";
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { AdminRoutes } from "./tools";
import { LOGOUT_USER_QUERY } from "../../graphql/queries";
import { client } from "../../auth/apolloClient";
import { Query } from "../../generated/gql/graphql";
import { SidebarProps } from "../../utils/types";
import "./ProSidebar.css";

const ProSidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggled,
  onBackdropClick,
  handleCollapsedChange,
}) => {
  const navigate = useNavigate();
  const [logoutUser] = useLazyQuery<Query>(LOGOUT_USER_QUERY);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonStyle = {
    backgroundColor: collapsed ? "transparent" : "#FFFFF0",
    border: collapsed ? "none" : "",
    fontWeight: "bold",
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
          height: "100%"
        },
      }}
    >
      <Menu>
        <div onClick={handleCollapsedChange} className="hover-class">
          {collapsed ? (
            <FaAngleDoubleRight
              className="hover-class"
              style={{
                color: "#FFFFF0",
                fontSize: 25,
                margin: "10px 10px 10px 20px",
              }}
            />
          ) : (
            <div
              style={{ margin: "20px", display: "flex", flexDirection: "row" }}
            >
              <h2
                className="hover-class"
                style={{
                  fontFamily: "Verdana",
                  textTransform: "uppercase",
                  fontSize: 24,
                  color: "#FFFFF0",
                }}
              >
                Teltonika
              </h2>
              <FaAngleDoubleLeft
                className="hover-class"
                style={{
                  marginLeft: 20,
                  color: "#FFFFF0",
                  fontSize: 35,
                  padding: 3,
                }}
              />
            </div>
          )}
        </div>

        <MenuItem
          onClick={() => navigate("/dashboard")}
          rootStyles={{
            color:
              window.location.pathname === "/dashboard" ? "#1E90FF" : "#FFFFF0",
            ":hover": { color: "#100c08", width: "100%" },
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
            <DashboardIcon />
            <h3 style={{ fontWeight: "bold", marginTop: 3.5 }}>Data Dashboard</h3>
          </div>
        </MenuItem>

        <SubMenu
          rootStyles={{
            color:
              window.location.pathname === "/config-board" ||
              window.location.pathname === "/search-update" ||
              window.location.pathname === "/app-settings"
                ? "#1E90FF"
                : "#FFFFF0",
            ":hover": { color: "#100c08", backgroundColor: "#f5f5f5" },
          }}
          label={
            <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
              <AdminPanelSettingsIcon style={{ marginLeft: 3 }} />
              <h3 style={{ fontWeight: "bold", marginTop: 3.5 }}>Admin board</h3>
            </div>
          }
        >
          {!collapsed && <AdminRoutes isVisible={!collapsed} />}
        </SubMenu>
      </Menu>

      <div
        className="sidebar-btn-wrapper"
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <button
          className="sidebar-btn hover-class"
          style={buttonStyle}
          onClick={handleClickOpen}
        >
          <AccountCircleIcon
            fontSize="large"
            style={{
              color: collapsed ? "#FFFFF0" : "#100c08",
              marginRight: "5px",
            }}
          />
          {!collapsed && <span className="sidebar-btn-text">My Profile</span>}
        </button>

        <button
          className="sidebar-btn hover-class"
          style={buttonStyle}
          onClick={async () => {
            await logoutUser();
            localStorage.clear();
            client.clearStore();
            navigate("/login");
          }}
        >
          <LogoutIcon
            style={{
              color: collapsed ? "#FFFFF0" : "#100c08",
              marginRight: "5px",
            }}
          />
          {!collapsed && <span className="sidebar-btn-text">Logout</span>}
        </button>
      </div>
      <ProfilDialog open={open} onClose={handleClose} />
    </Sidebar>
  );
};
export default ProSidebar;
