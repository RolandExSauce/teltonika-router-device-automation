import { TextField } from "@mui/material";
import "./styles/config.css";
import { useRef, useState } from "react";
import { DeviceModell } from "../../generated/gql/graphql";
import SelectConfigType from "./Select-Data-Components/SelectConfigType";
import { SelectChangeEvent } from "@mui/material/Select";
import InputCheck from "./Select-Data-Components/InputCheck";
import DropSelect from "./Select-Data-Components/DropSelect";
import { resetIconSVG, decryptLockIconSVG } from "../../assets/export-svgs";
import OpButton from "../Global/buttons/OpButton";
import FocusQRInput from "./FocusQRInput";
import ConfigInstruction from "./Info-Display-Components/ConfigInstruction";
import UploadFileButton from "../Global/buttons/UploadFileButton";
import CTextField from "../Global/textfields/CTextField";

type TStateForFileOrRUTVersion = string | DeviceModell | null;

//Component for handling the configuration of the device
const ConfigBoard = () => {
  // State and Ref Hooks **********************************************************

  // Scanned QR Code/SIM ID Text Handling
  const [qrTxt, setQRTxt] = useState("");
  const handleQrTextChange = (text: string) => setQRTxt(text);

  // Configuration Type Handling (radio buttons)
  const [selectedConfigType, setSelectedConfigType] = useState("Option1");
  const handleConfigOptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedConfigType(e.target.value);

  //RUT Version handling, Selected RUT Version
  const [selectedRUTVersion, setSelectedRUTVersion] =
    useState<TStateForFileOrRUTVersion>(null);

  // Existing Firmware File Handling
  const [existingFirmware, setExistingFirmware] =
    useState<TStateForFileOrRUTVersion>("");

  // and existing SDK File handling
  const [existingSDK, setExistingSDK] = useState<TStateForFileOrRUTVersion>("");

  //generalize existing files change or if RUT version is selected, because both are of type SelectChangeEvent ****************************
  const handleFileExistOrRutVersionChange = (
    event: SelectChangeEvent,
    setExistingFileOrRutVersionChange: React.Dispatch<
      React.SetStateAction<TStateForFileOrRUTVersion>
    >
  ) => setExistingFileOrRutVersionChange(event.target.value);

  // File Upload Handling (Generalized) ****************************************************************************************************
  const [firmwareFile, setFirmwareFile] = useState<File | null>(null);
  const [sdkFile, setSdkFile] = useState<File | null>(null);
  const [firmwarefileIsUploaded, setFirmwareFileIsUploaded] = useState(false);
  const [sdkFileIsUploaded, setSdkFileIsUploaded] = useState(false);
  const [errorFirmwareFile, setFirmwareFileError] = useState<string | null>(
    null
  );
  const [errorSdkFile, setSdkFileError] = useState<string | null>(null);
  const inputRefFirmware = useRef<HTMLInputElement>(null);
  const inputRefSDK = useRef<HTMLInputElement>(null);

  //generalized upload file change handler (for both firmware and sdk, differentiated by fileType parameter) *********************************
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: "firmware" | "sdk",
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (inputRef.current) inputRef.current.value = "";
      const extension = file.name.split(".").pop()?.toLowerCase();
      const validExtension = fileType === "firmware" ? "bin" : "gz";

      if (extension === validExtension) {
        setIsUploaded(true);
        setFile(file);
        setError(null);
      } else {
        setError(`Please select a .${validExtension} file.`);
        setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
      }
    }
  };

  // Generate New Credentials Handling
  const [genCredentials, setGenCredentials] = useState(false);
  const handleGenCredentialsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGenCredentials(event.target.checked);
  };

  // Toggle Display of Files Area ******************************************************************
  const showFilesArea = ["Option1", "Option2"].includes(selectedConfigType);
  const [useExistingFiles, setUseExistingFiles] = useState(false);
  const handleUseExistingFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUseExistingFiles(event.target.checked);
  };

  return (
    <div className="main-content">
      {/* Left div start: Config Instructions and QR Handling *********************************/}
      <ConfigInstruction />
      {/* Left div ends *********************************************************************/}

      {/* Right div start *********************************************************************/}
      <div className="sidebar">
        {/* Focus input QR button and Clear button ******************************************/}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "40px",
          }}
        >
          <FocusQRInput onQrTextChange={handleQrTextChange} />
          <OpButton
            opButtonTxt="Clear Inputs"
            handleClick={() => console.log("implement")}
            disabled={!(qrTxt || firmwareFile || sdkFile)}
            buttonIcon={resetIconSVG}
            buttonIsDynamic={false}
          />
        </div>
        {/************************************************************************** */}

        {/* Input field for scanned QR and SIM ID, and Decrypt button ***************************/}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "40px",
            gap: 25,
          }}
        >
          {/* <TextField
            required={true}
            value={qrTxt}
            placeholder="Your scanned QR and SIM ID will be shown here"
            disabled={true}
            fullWidth
          /> */}

          <CTextField
            placeHolderTxt="Your scanned QR and SIM ID will be shown here"
            value={qrTxt}
            disabled={true}
          />

          <OpButton
            opButtonTxt="Decrypt"
            handleClick={() => console.log("implement")}
            disabled={!qrTxt}
            buttonIcon={decryptLockIconSVG}
            buttonIsDynamic={false}
          />
        </div>
        {/************************************************************************** */}

        {/* Radio Select buttons for Config Type */}
        <SelectConfigType onChange={handleConfigOptionChange} />
        {/************************************************************************** */}

        {/* Generate new passwords and RUT Version selection *************************/}
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: "30px",
            marginBottom: "40px",
            justifyContent: "space-between", // This will position the child divs at the ends
          }}
        >
          {/* Flex container */}
          <div style={{ flex: 1 }}>
            {/* First child div */}
            <InputCheck
              label="Generate new passwords for device"
              useFiles={genCredentials}
              handleChange={handleGenCredentialsChange}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {/* Second child div */}
            <DropSelect
              selectFor="RUTVERSION"
              onChange={(e) =>
                handleFileExistOrRutVersionChange(e, setSelectedRUTVersion)
              }
            />
          </div>
        </div>

        {/************************************************************************** */}

        {/* Display Area for File Handling ********************************************/}
        {showFilesArea && (
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              marginBottom: "40px",
            }}
          >
            <div style={{ width: "50%" }}>
              <InputCheck
                label="Use existing files"
                useFiles={useExistingFiles}
                handleChange={handleUseExistingFilesChange}
              />
            </div>

            {useExistingFiles ? (
              <div style={{ display: "flex", gap: "16px" }}>
                {/* Flexbox container for layout */}
                <div style={{ flex: 1 }}>
                  {/* Wrapper for the first DropSelect */}
                  <DropSelect
                    selectFor="FIRMWARE"
                    onChange={(e) =>
                      handleFileExistOrRutVersionChange(e, setExistingFirmware)
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  {/* Wrapper for the second DropSelect */}
                  <DropSelect
                    selectFor="SDK"
                    onChange={(e) =>
                      handleFileExistOrRutVersionChange(e, setExistingSDK)
                    }
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "16px" }}>
                {/* Flexbox container for layout */}
                <div style={{ flex: 1 }}>
                  {/* Wrapper for the first DropSelect */}
                  <UploadFileButton
                    uploadButtonFor="FIRMWARE"
                    handleFileChange={(event) =>
                      handleFileChange(
                        event,
                        "firmware",
                        setFirmwareFile,
                        setFirmwareFileIsUploaded,
                        setFirmwareFileError,
                        inputRefFirmware
                      )
                    }
                    fileIsUploaded={firmwarefileIsUploaded}
                    error={errorFirmwareFile}
                    resetInputRef={inputRefFirmware}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  {/* Wrapper for the second DropSelect */}
                  <UploadFileButton
                    uploadButtonFor="SDK"
                    handleFileChange={(event) =>
                      handleFileChange(
                        event,
                        "sdk",
                        setSdkFile,
                        setSdkFileIsUploaded,
                        setSdkFileError,
                        inputRefSDK
                      )
                    }
                    fileIsUploaded={sdkFileIsUploaded}
                    error={errorSdkFile}
                    resetInputRef={inputRefSDK}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Sidebar ends ************************************************************************* */}
    </div>
  );
};

export default ConfigBoard;
