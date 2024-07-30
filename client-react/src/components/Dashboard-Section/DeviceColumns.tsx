import { SvgIcon } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { Device } from "../../generated/gql/graphql";
import {
  confirmSymbolIconSVG,
  notAllowedIconSVG,
} from "../../assets/export-svgs";
import { PasswordCell } from "./tools/stuff";

//global style object for overall styling
export const inputStyle = {
  height: "48px",
  width: "130px",
  border: "1px solid #ced4da",
  borderRadius: "4px",
  padding: "0 12px",
  fontSize: "16px",
  outline: "none",
  margin: "3px",
};
const divStyle = { display: "flex", alignItems: "center" };
const passCellStyles = {
  divStyle,
  inputStyle,
};

//columns for material table
export const deviceColumns: MRT_ColumnDef<Device>[] = [
  {
    accessorKey: "configStatus.deviceIsConfigured",
    header: "Configured",
    size: 40,
    enableColumnActions: false,
    enableSorting: false,
    Edit: () => undefined,
    Cell: ({ cell }) => (
      <div style={divStyle}>
        <SvgIcon
          component={
            cell.getValue<boolean>() ? confirmSymbolIconSVG : notAllowedIconSVG
          }
          inheritViewBox
        />
        <span style={{ marginLeft: 8 }}>
          {cell.getValue<boolean>() ? "Yes" : "No"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "modell",
    header: "Device Modell",
    enableColumnActions: false,
    enableSorting: false,
    Edit: () => undefined,
  },
  {
    accessorKey: "wifiSSID",
    header: "Device WIFI SSID",
    size: 40,
    enableColumnActions: false,
    enableSorting: false,

    //props when field is being edited
    muiEditTextFieldProps: {
      style: { marginTop: 7 },
      variant: "outlined",
      label: "New WIFI SSID",
      type: "text",
      required: true,

      //TODO: add validation
      // error: !!validationErrors?.email,
      // helperText: validationErrors?.email,
      // onFocus: () =>
      //   setValidationErrors({
      //     ...validationErrors,
      //     email: undefined,
      //   }),
    },
  },
  {
    accessorKey: "passWifi",
    header: "WIFI PASS",
    enableColumnActions: false,
    enableSorting: false,
    muiEditTextFieldProps: {
      variant: "outlined",
      label: "New WIFI Password",
      type: "password",
      required: true,
    },
    Cell: ({ cell }) => (
      <PasswordCell cell={cell} passCellStyles={passCellStyles} />
    ),
  },
  {
    accessorKey: "webUser",
    header: "Web User",
    size: 30,
    enableColumnActions: false,
    enableSorting: false,
    Edit: () => undefined,
  },
  {
    accessorKey: "passForWebUser",
    header: "Web User PASS",
    enableColumnActions: false,
    enableSorting: false,
    muiEditTextFieldProps: {
      variant: "outlined",
      label: "New Web User Password",
      type: "password",
      required: true,
    },
    Cell: ({ cell }) => (
      <PasswordCell cell={cell} passCellStyles={passCellStyles} />
    ),
  },
  {
    accessorKey: "deviceFieldsOptional.shellUser",
    header: "SSH User",
    size: 30,
    enableColumnActions: false,
    enableSorting: false,
    Edit: () => undefined,
  },
  {
    accessorKey: "deviceFieldsOptional.passForShellUser",
    header: "SSH User PASS",
    enableColumnActions: false,
    enableSorting: false,
    muiEditTextFieldProps: {
      variant: "outlined",
      label: "New SSH User Password",
      type: "password",
      required: true,
    },
    Cell: ({ cell }) => (
      <PasswordCell cell={cell} passCellStyles={passCellStyles} />
    ),
  },
];
