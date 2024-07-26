import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { DropDownSelectProps } from "../../types";

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

// this component will fetch the latest uploaded firmware files and display it
const DropSelect: React.FC<DropDownSelectProps> = ({ onChange, selectFor }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const arritems =
    selectFor === "FIRMWARE"
      ? firmwareFiles
      : selectFor === "SDK"
      ? sdkFiles
      : rutVersions;

  const selectDropTxt =
    selectFor === "FIRMWARE"
      ? "Select Firmware File"
      : selectFor === "SDK"
      ? "Select Backup  - file"
      : "Select RUT version";

  return (
    <>
      <FormControl fullWidth>
        <Select
          displayEmpty
          onChange={onChange}
          onClose={handleClose}
          onOpen={handleOpen}
          defaultValue="" // to bypass uncontrolled input error
          open={open}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return <span>{selectDropTxt}</span>;
            }
            return selected;
          }}
        >
          <MenuItem disabled value="">
            <span>{selectDropTxt}</span>
          </MenuItem>
          {arritems.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DropSelect;
