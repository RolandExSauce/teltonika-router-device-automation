import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IDropDownSelectProps } from "../../utils/types";
import { configTypes } from "./export-objects-and-arrays";

// Define static file arrays for simplicity
const firmwareFiles = [
  "RUT2M_R_00.07.06.3_WEBUI_LATEST_FW.bin",
  "RUT2M_R_00.07.06.3_WEBUI_MASS_PROD_FW.bin",
  "RUT2M_R_00.08.06.3_WEBUI_MASS_PROD_FW.bin",
];

const sdkFiles = [
  "RUT2M_R_00.07.06.3_WEBUI_LATEST_FW.gz",
  "RUT2M_R_00.07.06.3_WEBUI_MASS_PROD_FW.gz",
  "RUT2M_R_00.08.06.3_WEBUI_MASS_PROD_FW.gz",
];

const rutVersions = [
  "RUT200",
  "RUT230",
  "RUT240",
  "RUT260",
  "RUT300",
  "RUT360",
  "RUT901",
  "RUT906",
  "RUT950",
  "RUT951",
  "RUT955",
  "RUT956",
];

const DropDownSelect: React.FC<IDropDownSelectProps> = ({
  onChange,
  selectFor,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const { items, label } = (() => {
    switch (selectFor) {
      case "FIRMWARE":
        return { items: firmwareFiles, label: "Select Firmware file" };
      case "SDK":
        return { items: sdkFiles, label: "Select SDK file" };
      case "RUTVERSION":
        return { items: rutVersions, label: "Select RUT Version" };

      case "CONFIG_TYPE":
        return { items: configTypes, label: "Configuration Type" };

      //default value
      default:
        return { items: [], label: "" };
    }
  })();

  return (
    <div style={{ width: "230px", maxWidth: "230px" }}>
      {/* Set a fixed width here */}
      <Select
        displayEmpty
        onChange={onChange}
        onClose={handleClose}
        onOpen={handleOpen}
        defaultValue="" // Prevent uncontrolled input error
        open={open}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (!selected && selectFor === "CONFIG_TYPE") {
            return <span>{configTypes[0]}</span>; //for config Type even if nothing selected
            //we will display: "add & config" select item already so that the config button has the appropriate icon
          }
          if (!selected) {
            return <span>{label}</span>;
          }
          return selected as string; // Show selected item
        }}
        sx={{ width: "100%" }}
      >
        <MenuItem disabled value="">
          <span>{label}</span>
        </MenuItem>
        {items.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default DropDownSelect;
