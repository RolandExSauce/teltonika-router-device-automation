import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { SvgIcon, Typography } from "@mui/material";
import React from "react";
import { AuthRules } from "./AuthRules";
import { BootStrapDialogProps } from "../../utils/types";
import Dialog from "@mui/material/Dialog";
import { styled as MUIStyled } from "@mui/material/styles";
import { configTrueIconSVG, notAllowedIconSVG } from "../../assets/export-svgs";
import { adminIconImg, defaultUserIconImg } from "../../assets/export-imgs";
import { AuthAndUserRoles } from "../../auth/auth-and-roles";

// import { useNavigate } from "react-router-dom";

// import SettingsIcon from "@mui/icons-material/Settings";
// import { Fragment } from "react";

//styling BootStrap Dialog pop-up window
const BootstrapDialog = MUIStyled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

//validate rule access
const getAllowedIcon = (checkAdmin: boolean) => {
  return checkAdmin ? (
    <SvgIcon
      component={configTrueIconSVG}
      inheritViewBox
      style={{ width: 20, height: 20 }}
    />
  ) : (
    <SvgIcon
      component={notAllowedIconSVG}
      inheritViewBox
      style={{ width: 20, height: 20 }}
    />
  );
};

const permittedIcon = (
  <SvgIcon
    component={configTrueIconSVG}
    inheritViewBox
    style={{ width: 20, height: 20 }}
  />
);

//bootstrap dialog
const ProfilDialog: React.FC<BootStrapDialogProps> = ({
  open,
  onClose,
}: BootStrapDialogProps) => {
  const {
    auth,
    userRoles: { adminUser },
  } = AuthAndUserRoles();

  const getIcon = getAllowedIcon(adminUser);

  //define auth rules
  const authRules = [
    {
      //rule list download
      downloadRouterList: [permittedIcon, "Download Data"],

      //rule router search
      searchRouters: [getIcon, "Detailed Data Search"],

      //rule edit router
      editRouters: [getIcon, "Edit Device Data"],

      //rule delete router
      deleteRouters: [getIcon, "Delete Device"],

      //rule config router
      configRouters: [getIcon, "Configure Device"],

      //rule config router
      backupData: [getIcon, "Create Backup"],

      // user permissions:
      AddUser: [getIcon, "Configure Device"],
    },
  ];

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle
          style={{ fontFamily: "Lilita One", fontSize: 28, color: "#1F305E" }}
          id="customized-dialog-title"
        >
          My Profile
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <CloseIcon
            fontSize="medium"
            sx={{
              color: "#3B444B",
              fontWeight: "bold",
              margin: "20px 20px 20px 0px",

              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={onClose}
          />
        </Box>
        <DialogContent dividers>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.9, width: "90%" }}>
              <img
                style={{
                  display: "block",

                  marginRight: "auto",
                  marginTop: "30px",
                  marginLeft: "30px",
                  width: "90%",
                }}
                src={adminUser ? adminIconImg : defaultUserIconImg}
              />
            </div>

            <div style={{ margin: "15px 30px 20px 30px" }}>
              <Typography style={{ fontFamily: "lilita One" }}>
                <span style={{ fontSize: 20 }}> Username:</span>

                <span
                  style={{
                    marginLeft: 9,
                    color: "#00538C",
                    fontSize: 20,
                  }}
                >
                  {auth?.username}
                </span>
              </Typography>
              <Typography style={{ fontFamily: "lilita One" }}>
                <span style={{ fontSize: 20 }}> Role: </span>
                <span
                  style={{
                    marginLeft: 2,
                    color: "#00538C",
                    fontSize: 20,
                  }}
                >
                  {adminUser ? "@admin user" : "normaler user"}
                </span>
              </Typography>

              <Typography style={{ fontFamily: "lilita One" }}>
                <span style={{ fontSize: 20 }}> Department:</span>

                <span
                  style={{
                    marginLeft: 9,
                    color: "#00538C",
                    fontSize: 20,
                  }}
                >
                  {auth?.userDep}
                </span>
              </Typography>
              <Typography
                style={{
                  marginTop: 15,
                  marginBottom: 17,
                  fontWeight: "bold",
                  color: "#1F305E",
                  fontSize: 17,
                }}
              >
                Permissions:
              </Typography>
              <AuthRules authRules={authRules} />
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
export default ProfilDialog;
