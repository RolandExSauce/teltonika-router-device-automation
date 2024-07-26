import Dialog from "@mui/material/Dialog";
import { styled as MUIStyled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { MenuItem } from "react-pro-sidebar";
import { Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import {
  searchAndEditBlackSVG,
  searchAndEditBlueSVG,
  configSectionIconBlackSVG,
  configSectionIconBlueSVG,
} from "../../assets/icons/exportIcons";
import { AuthContext } from "../../auth/authContext";

//styling BootStrap Dialog pop-up window
export const BootstrapDialog = MUIStyled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

//maybe add more routes in the future
export const AdminRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser?.role === "ADMIN";

  const navigate = useNavigate();

  //admin sub routes
  const adminSubRoutes = [
    {
      name: <Typography>Search and Edit</Typography>,
      icon: (
        <SvgIcon
          component={
            window.location.pathname === "/search-update"
              ? searchAndEditBlueSVG
              : searchAndEditBlackSVG
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
            window.location.pathname === "/config-router"
              ? configSectionIconBlueSVG
              : configSectionIconBlackSVG
          }
          inheritViewBox
        />
      ),
      to: "/config-router",
    },
    {
      name: "Settings",
      icon: (
        <SettingsIcon
          style={{
            color:
              window.location.pathname === "/app-settings"
                ? "#0066b2" //#0066b2
                : "#100c08",
          }}
        />
      ),
      to: "/app-settings",
    },
  ];

  //admin routes
  const routes = adminSubRoutes.map((section, index) => {
    return !isAdmin && !(section.name === "Config device") ? undefined : (
      <MenuItem
        key={index}
        icon={section.icon}
        onClick={() => navigate(section.to)}
        style={{
          borderRight: "0.1rem solid #100c08",
        }}
      >
        <Typography
          style={{
            color: "#100c08",
          }}
        >
          {section.name}
        </Typography>
      </MenuItem>
    );
  });
  return <Fragment>{routes}</Fragment>;
};
