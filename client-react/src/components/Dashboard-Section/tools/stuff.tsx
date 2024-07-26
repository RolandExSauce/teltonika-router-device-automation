import { Tooltip, SvgIcon } from "@mui/material";
import { MRT_Cell } from "material-react-table";
import { copyPasteIconSVG } from "../../../assets/export-svgs";
import { Device } from "../../../generated/gql/graphql";
import { copyToClipboard } from "./utils";
import { CSSProperties } from "react";

interface ICopyButtonProps {
  cell: MRT_Cell<Device, unknown>;
  passCellStyles: {
    divStyle: CSSProperties;
    inputStyle: CSSProperties;
  };
}

//we have three password cells, so instead of duplicating the logic,
// we will keep things compact
export const PasswordCell = ({
  cell,
  passCellStyles: { divStyle, inputStyle },
}: ICopyButtonProps) => (
  <div style={divStyle}>
    <input
      type="password"
      value={cell.getValue<string>()}
      readOnly
      style={inputStyle}
    />
    <Tooltip title="copy" arrow>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => copyToClipboard(cell.getValue<string>())}
      >
        <SvgIcon component={copyPasteIconSVG} inheritViewBox />
      </div>
    </Tooltip>
  </div>
);
