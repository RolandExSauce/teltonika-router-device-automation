import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { deleteWarningIconImg } from "../../assets/export-imgs";
import {
  notAllowedIconSVG,
  confirmSymbolIconSVG,
} from "../../assets/export-svgs";
import OpButton from "../Global/buttons/OpButton";
import { inputStyle } from "./DeviceColumns";
import React, { useCallback, useState } from "react";
import { MRT_Row } from "material-react-table";
import { Device } from "../../generated/gql/graphql";

interface IDeleteDialogProps {
  openDialog: boolean;
  handleClose: () => void;
  rowData: MRT_Row<Device> | undefined;
  tableDataLength: number;
  tableData: Device[];
  setTableData: React.Dispatch<React.SetStateAction<Device[]>>;
}

const DeleteDialog: React.FC<IDeleteDialogProps> = ({
  openDialog,
  handleClose,
  rowData,
  tableDataLength,
  tableData,
  setTableData,
}) => {
  const [deleteCode, setDeleteCode] = useState("");
  //handle row deletion
  const handleDeleteRow = useCallback(
    (wifiSSID: string) => {
      // Create a new array excluding the device with the given wifiSSID, tried using splice got readonly error cuz state is immutable
      const newTableData = tableData.filter(
        (device) => device.wifiSSID !== wifiSSID
      );
      // update the state with the new array
      setTableData(newTableData);
    },
    [setTableData, tableData]
  );

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            height: "330px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            p: 2,
          },
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: 2,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={deleteWarningIconImg}
            style={{ width: "50px", height: "50px" }}
          />
          <span
            style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Delete Confirmation
          </span>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center", color: "#000" }}
          >
            Delete the Device with WI-FI SSID:{" "}
            <span style={{ color: "green" }}>{rowData?.original.wifiSSID}</span>{" "}
            ?
          </DialogContentText>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textAlign: "center",
              justifyContent: "center",
              marginTop: 15,
              paddingTop: 7,
            }}
          >
            <span>Type the Delete Confirmation Code</span>
            <input
              id="delete-code"
              type="password"
              value={deleteCode}
              style={inputStyle}
              onChange={(e) => {
                setDeleteCode(e.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <OpButton
            opButtonTxt="CANCEL"
            handleClick={handleClose}
            disabled={!tableDataLength}
            buttonIcon={notAllowedIconSVG}
            buttonIsDynamic={false}
          />

          <OpButton
            opButtonTxt="YES, DELETE"
            handleClick={() => {
              handleDeleteRow(rowData?.original.wifiSSID as string);
              handleClose();
            }}
            disabled={!deleteCode} //delete button is disabled if no delete code is provided
            buttonIcon={confirmSymbolIconSVG}
            buttonIsDynamic={false}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
