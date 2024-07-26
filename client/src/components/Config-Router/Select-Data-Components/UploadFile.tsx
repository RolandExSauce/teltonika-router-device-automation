import Button from "@mui/material/Button";
import { SvgIcon } from "@mui/material";
import {
  TrueSVG,
  firmwareSVG,
  restoreBackupSVG,
  notAvailableSVG,
} from "../../../assets/icons/exportIcons";
import { UploadFileProps } from "../../types";
import { VisuallyHiddenInput } from "../utils/constants";

// upload custom .gz file component
const UploadFile: React.FC<UploadFileProps> = ({
  uploadButtonFor,
  fileIsUploaded,
  error,
  handleFileChange,
  resetInputRef,
}) => {
  // change text based on button
  const uploadTexts =
    uploadButtonFor === "FIRMWARE"
      ? {
          before: "FIRMWARE FILE",
          after: "FW uploaded",
        }
      : {
          before: "BACKUP FILE",
          after: "BAK uploaded",
        };

  return (
    <>
      <Button
        component="label"
        fullWidth
        variant="contained"
        startIcon={
          fileIsUploaded ? undefined : (
            <SvgIcon
              component={
                uploadButtonFor === "FIRMWARE" ? firmwareSVG : restoreBackupSVG
              }
              inheritViewBox
            />
          )
        }
        endIcon={
          <SvgIcon
            component={fileIsUploaded ? TrueSVG : notAvailableSVG}
            inheritViewBox
          />
        }
        sx={{
          boxShadow: 30,
          fontSize: 12,
          fontWeight: "bold",
          fontFamily: "Arial",
          borderRadius: "30px",
          backgroundColor: "#FFFFFF", // Change background color if file is uploaded
          color: fileIsUploaded ? "#1EB0FF" : "#000000", // Change text color if file is uploaded
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
          height: 57,
        }}
      >
        {fileIsUploaded ? uploadTexts.after : uploadTexts.before}

        <VisuallyHiddenInput
          type="file"
          accept={uploadButtonFor === "FIRMWARE" ? ".bin" : ".gz"}
          onChange={handleFileChange}
          ref={resetInputRef}
        />
      </Button>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </>
  );
};

export default UploadFile;
