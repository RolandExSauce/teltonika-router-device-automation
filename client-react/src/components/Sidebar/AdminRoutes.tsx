import React from "react";
import { useNavigate } from "react-router-dom";
import { SvgIcon, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { MenuItem } from "react-pro-sidebar";
import {
  subMenuConfigSymbolBlueIconSVG,
  subMenuConfigSymbolBlackIconSVG,
  editSearchBlackIconSVG,
  editSearchBlueIconSVG,
} from "../../assets/export-svgs";
import { AuthAndUserRoles } from "../../auth/auth-and-roles";

// Define the type for the prop
interface IAdminRoutesProps {
  isVisible: boolean;
}

//admin routes
export const AdminRoutes: React.FC<IAdminRoutesProps> = ({ isVisible }) => {
  const {
    userRoles: { rootUser, adminOrRootUser },
  } = AuthAndUserRoles();

  const navigate = useNavigate();
  if (!isVisible) return null; // Do not render if not visible

  const adminSubRoutes = [
    {
      name: "Search & Edit",
      icon: (
        <SvgIcon
          component={
            window.location.pathname === "/search-update"
              ? editSearchBlueIconSVG
              : editSearchBlackIconSVG
          }
          inheritViewBox
        />
      ),
      to: "/search-update",
    },
    {
      name: "Configuration",
      icon: (
        <SvgIcon
          component={
            window.location.pathname === "/config-board"
              ? subMenuConfigSymbolBlueIconSVG
              : subMenuConfigSymbolBlackIconSVG
          }
          inheritViewBox
        />
      ),
      to: "/config-board",
    },
    {
      name: "App Settings",
      icon: (
        <SettingsIcon
          style={{
            color:
              window.location.pathname === "/app-settings"
                ? "#0066b2"
                : "#100c08",
          }}
        />
      ),
      to: "/app-settings",
    },
  ];

  const routes = adminSubRoutes.map((section, index) => {
    // "App Settings" section is exclusive to root users only
    if (section.name === "App Settings" && !rootUser) return null;

    // Render menu items only if the user is an admin or root user
    return adminOrRootUser ? (
      <MenuItem
        key={index}
        icon={section.icon}
        onClick={() => navigate(section.to)}
      >
        <Typography
          style={{
            color: "#100c08",
          }}
        >
          {section.name}
        </Typography>
      </MenuItem>
    ) : null;
  });
  return routes;
};
