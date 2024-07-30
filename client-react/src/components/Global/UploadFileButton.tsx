import Button from "@mui/material/Button";
import { SvgIcon } from "@mui/material";
import {
  notAllowedIconSVG,
  confirmSymbolIconSVG,
} from "../../assets/export-svgs";
import { UploadFileProps } from "../../utils/types";
import { uploadTexts } from "./export-objects-and-arrays";
import { UploadFileButtonStyles } from "./styles/styles-objects";

// Custom upload button component
const UploadFileButton: React.FC<UploadFileProps> = ({
  uploadButtonFor,
  fileIsUploaded,
  error,
  handleFileChange,
  resetInputRef,
}) => {
  // Which text to display
  const { before, after } = uploadTexts[uploadButtonFor];

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        endIcon={
          <SvgIcon
            component={
              fileIsUploaded ? confirmSymbolIconSVG : notAllowedIconSVG
            }
            inheritViewBox
          />
        }
        sx={{
          ...UploadFileButtonStyles,
          color: fileIsUploaded ? "#1EB0FF" : "#000000",
        }}
      >
        {fileIsUploaded ? after : before}
        <input
          style={{ position: "absolute", left: "-9999px" }}
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
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "5px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default UploadFileButton;
