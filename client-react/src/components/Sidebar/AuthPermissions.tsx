import React from "react";
import { TSVG } from "../../utils/types";
import { SvgIcon } from "@mui/material";
import { AuthAndUserRoles } from "../../auth/auth-and-roles";

// Type for user permissions
interface IPermissions {
  readonly [key: string]: TSVG;
}

// Display rules that the user possesses
export const AuthPermissions: React.FC<IPermissions> = (permissions) => {
  const {
    userRoles: { adminUser, rootUser },
  } = AuthAndUserRoles();

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ fontWeight: "bold", color: "#00538C", margin: 20 }}>
        Overview of Permissions (
        {adminUser ? Object.keys(permissions).length : rootUser ? "All" : "1"})
      </h3>
      {rootUser ? (
        <span style={{ color: "green" }}>
          You're a root user; you can do anything you want.
        </span>
      ) : adminUser ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            justifyItems: "center",
          }}
        >
          {Object.entries(permissions).map(([ruleKey, icon], index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <SvgIcon
                component={icon}
                inheritViewBox
                style={{ width: 20, height: 20, marginRight: "8px" }}
              />
              <span>{ruleKey}</span>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* get first key value pair in rule object to display the permission 
          for default user (only one and thats the first one) */}
          <SvgIcon
            component={Object.values(permissions)[0]}
            inheritViewBox
            style={{ width: 20, height: 20, marginRight: "8px" }}
          />
          <span>{Object.keys(permissions)[0]}</span>
        </div>
      )}
    </div>
  );
};
