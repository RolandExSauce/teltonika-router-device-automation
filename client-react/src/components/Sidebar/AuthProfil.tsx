import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { AuthPermissions } from "./AuthPermissions";
import { IAuthProfil } from "../../utils/types";
import { AuthAndUserRoles } from "../../auth/auth-and-roles";
import {
  adminUserIconImg,
  normalUserIconImg,
  rootUserIconImg,
} from "../../assets/export-imgs";
import { deviceRules } from "../Global/export-objects-and-arrays";

// profile dialog to display user permissions
const AuthProfil: React.FC<IAuthProfil> = ({ open, onClose }) => {
  const {
    auth,
    userRoles: { adminUser, rootUser },
  } = AuthAndUserRoles();

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        PaperProps={{
          sx: {
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          style={{
            fontSize: 28,
            color: "#00538C",
            fontWeight: "bold",
            textAlign: "center",
          }}
          id="customized-dialog-title"
        >
          My Profile
        </DialogTitle>
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <CloseIcon
            fontSize="medium"
            style={{
              color: "#3B444B",
              fontWeight: "bold",
              margin: "20px 20px 20px 0px",
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        </div>
        <DialogContent dividers sx={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <img
              style={{
                width: "25%",
              }}
              src={
                adminUser
                  ? adminUserIconImg
                  : rootUser
                  ? rootUserIconImg
                  : normalUserIconImg
              }
              alt="User Icon"
            />
            <div>
              <div
                style={{
                  fontFamily: "Arial",
                  fontSize: 20,
                  marginBottom: "15px",
                }}
              >
                <strong>Username:</strong>{" "}
                <span style={{ color: "#00538C" }}>{auth?.username}</span>
              </div>
              <div
                style={{
                  fontFamily: "Arial",
                  fontSize: 20,
                  marginBottom: "15px",
                }}
              >
                <strong>Role:</strong>{" "}
                <span style={{ color: "#00538C" }}>
                  {adminUser
                    ? "admin user"
                    : rootUser
                    ? "root user"
                    : "default user"}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "Arial",
                  fontSize: 20,
                }}
              >
                <strong>Department:</strong>{" "}
                <span style={{ color: "#00538C" }}>{auth?.userDep}</span>
              </div>
            </div>
          </div>
          <AuthPermissions {...deviceRules} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthProfil;
