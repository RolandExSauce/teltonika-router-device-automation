import Button from "@mui/material/Button";
import { SvgIcon } from "@mui/material";
import {
  configTrueIconSVG,
  firmwareIconSVG,
  notAllowedIconSVG,
  restoreBackupIconSVG,
} from "../../../assets/export-svgs";
import { IconMapKeys, UploadFileProps } from "../../../utils/types";
import { VisuallyHiddenInput } from "../../Config-Section/utils/constants";


// Define iconMap with the correct type
const iconMap: Record<IconMapKeys, React.ElementType> = {
  FIRMWARE: firmwareIconSVG,
  SDK: restoreBackupIconSVG,
  CSV: restoreBackupIconSVG, //TODO: change icon later
};

// Define uploadTexts for all FileTypes
const uploadTexts: Record<IconMapKeys, { before: string; after: string }> = {
  FIRMWARE: { before: "FIRMWARE FILE", after: "FW uploaded" },
  SDK: { before: "BACKUP FILE", after: "BAK uploaded" },
  CSV: { before: "CSV FILE", after: "CSV uploaded" },
};

const UploadFileButton: React.FC<UploadFileProps> = ({
  uploadButtonFor,
  fileIsUploaded,
  error,
  handleFileChange,
  resetInputRef,
}) => {
  // Determine the icon component
  const IconComponent = iconMap[uploadButtonFor];

  // Determine the text to display
  const { before, after } = uploadTexts[uploadButtonFor];

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={
          !fileIsUploaded && (
            <SvgIcon component={IconComponent} inheritViewBox />
          )
        }
        endIcon={
          <SvgIcon
            component={fileIsUploaded ? configTrueIconSVG : notAllowedIconSVG}
            inheritViewBox
          />
        }
        sx={{
          boxShadow: 30,
          fontSize: 12,
          padding: 2,
          width: "200px",
          fontWeight: "bold",
          fontFamily: "Arial",
          borderRadius: "30px",
          backgroundColor: "#FFFFFF",
          color: fileIsUploaded ? "#1EB0FF" : "#000000",
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
          height: 57,
        }}
      >
        {fileIsUploaded ? after : before}
        <VisuallyHiddenInput
          type="file"
          accept={
            uploadButtonFor === "FIRMWARE"
              ? ".bin"
              : uploadButtonFor === "SDK"
              ? ".gz"
              : ".csv"
          }
          onChange={handleFileChange}
          ref={resetInputRef}
        />
      </Button>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </>
  );
};

export default UploadFileButton;
