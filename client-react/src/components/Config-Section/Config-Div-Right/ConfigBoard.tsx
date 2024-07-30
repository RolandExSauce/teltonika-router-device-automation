import "../styles/ConfigBoard.css";
import { useRef, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import FocusQRInput from "./FocusQRInput";
import {
  resetIconSVG,
  decryptLockIconSVG,
  addToDBIconSVG,
  configAndAddToDBIconSVG,
  configOnlyIconSVG,
} from "../../../assets/export-svgs";
import CustomTextField from "../../Global/CustomTextField";
import OpButton from "../../Global/OpButton";
import UploadFileButton from "../../Global/UploadFileButton";
import ConfigInstruction from "../Info-Div-Left/ConfigInstruction";
import DeviceInputFields from "./DeviceInputFields";
import DropDownSelect from "../../Global/DropDownSelect";
import CheckBoxInput from "../../Global/CheckBoxInput";
import { warningSymbolIconImg } from "../../../assets/export-imgs";
import { initedInputFieldsArr } from "../../Global/export-objects-and-arrays";
import { transformInputFieldsArr } from "./tools";
import {
  ConfigOptions,
  DeviceConfigInput,
  DeviceModell,
} from "../../../generated/gql/graphql";
import {
  handleCheckBoxInputChange,
  handleDropDownSelectChange,
  handleFileChange,
  handleInputFieldsManuellyTypedChange,
} from "./onChange-handlers";

//Main component with all the config stuff
const ConfigBoard = () => {
  /****************************************************************************************************** */

  //TODO: handling config again => dialog
  const [isBeingConfiguredAgain, setIsBeingConfiguredAgain] = useState(false);
  const [inputFieldsArr, setInputFieldsArr] = useState(initedInputFieldsArr);
  const [dataFieldsObj, setDataFieldsObj] = useState(() =>
    transformInputFieldsArr(initedInputFieldsArr)
  );

  // Scanned QR Code/SIM ID Text Handling
  const [qrTxt, setQRTxt] = useState("");
  const handleQrTextChange = (text: string) => setQRTxt(text);

  // Configuration Type Handling
  const [selectedConfigType, setSelectedConfigType] =
    useState("Configure & add");

  //configuration type
  const kindOfConfig: ConfigOptions =
    selectedConfigType === "Configure & add"
      ? ConfigOptions.Option1
      : selectedConfigType === "Configure only"
      ? ConfigOptions.Option2
      : ConfigOptions.Option3;

  //RUT Version handling
  const [selectedRUTVersion, setSelectedRUTVersion] = useState("");

  // Existing Firmware and SDK File Handling
  const [existingFirmware, setExistingFirmware] = useState("");
  const [existingSDK, setExistingSDK] = useState("");

  //states regarding files
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

  //states for booleans, e.g generate new credentials ? use existing files ?
  const [genCredentials, setGenCredentials] = useState(false);
  const [useExistingFiles, setUseExistingFiles] = useState(false);

  // Toggle Display of Files Area
  const showFilesArea = ["Configure & add", "Configure only"].includes(
    selectedConfigType
  );

  // Object to dynamically set text and icons for the configuration button
  const configType =
    selectedConfigType === "Configure & add"
      ? { svg: configAndAddToDBIconSVG, text: "Config & add" }
      : selectedConfigType === "Configure only"
      ? { svg: configOnlyIconSVG, text: "Config only" }
      : { svg: addToDBIconSVG, text: "Add to DB" };

  //construct device config input to send
  const configInput: DeviceConfigInput = {
    configAgain: isBeingConfiguredAgain,
    generateNewCredentials: genCredentials,
    deviceInfo: dataFieldsObj,
    options: {
      kindOfConfig,
      deviceFilesForScript: {
        useThisFirmwareFile: firmwareFile?.name ?? existingFirmware,
        useThisSDKFile: sdkFile?.name ?? existingSDK,
      },
    },
  };
  console.log("Config input: ", configInput);

  return (
    <div className="main-content">
      <ConfigInstruction />
      {/* Right div start */}
      <div className="sidebar">
        {/* Focus input QR button and Clear button */}
        <div className="input-header">
          <FocusQRInput onQrTextChange={handleQrTextChange} />
          <OpButton
            opButtonTxt="Clear Data"
            handleClick={() => console.log("implement")}
            disabled={!(qrTxt || firmwareFile || sdkFile)}
            buttonIcon={resetIconSVG}
            buttonIsDynamic={false}
            roundButtonBorders={true}
          />
        </div>
        {/* Input field for scanned QR and SIM ID, and Decrypt button */}
        <div className="qr-sim-id-container">
          <CustomTextField
            inputProps={{
              id: qrTxt,
              name: qrTxt, //id and name will be the same,
              value: qrTxt,
              type: "text",
              placeHolderTxt: "Your scanned QR and SIM ID will be shown here",
            }}
            disabled={true}
          />
          <OpButton
            opButtonTxt="Decrypt"
            handleClick={() => console.log("implement")}
            disabled={!qrTxt}
            buttonIcon={decryptLockIconSVG}
            buttonIsDynamic={false}
            roundButtonBorders={true}
          />
        </div>
        {/* Generate new passwords, config type selection and RUT Version selection */}
        <div className="config-selection">
          <CheckBoxInput
            label="Create new passwords"
            inputChecked={genCredentials}
            handleInputCheckedChange={(e) =>
              handleCheckBoxInputChange(e, setGenCredentials)
            }
          />
          <div className="dropdown-selects">
            <DropDownSelect
              selectFor="CONFIG_TYPE"
              onChange={(e: SelectChangeEvent) =>
                handleDropDownSelectChange(e, setSelectedConfigType)
              }
            />
            <DropDownSelect
              selectFor="RUTVERSION"
              onChange={(e: SelectChangeEvent) => {
                handleDropDownSelectChange(e, setSelectedRUTVersion);
                dataFieldsObj.deviceFieldsMust.modell =
                  selectedRUTVersion as DeviceModell;
              }}
            />
          </div>
        </div>
        {/* Display Area for File Handling */}
        {showFilesArea && (
          <div className="file-handling">
            <CheckBoxInput
              label="Use existing files"
              inputChecked={useExistingFiles}
              handleInputCheckedChange={(e) =>
                handleCheckBoxInputChange(e, setUseExistingFiles)
              }
            />
            {useExistingFiles ? (
              <div className="dropdown-selects">
                <DropDownSelect
                  selectFor="FIRMWARE"
                  onChange={(e: SelectChangeEvent) =>
                    handleDropDownSelectChange(e, setExistingFirmware)
                  }
                />
                <DropDownSelect
                  selectFor="SDK"
                  onChange={(e: SelectChangeEvent) =>
                    handleDropDownSelectChange(e, setExistingSDK)
                  }
                />
              </div>
            ) : (
              <div className="dropdown-selects">
                <UploadFileButton
                  uploadButtonFor="FIRMWARE"
                  handleFileChange={(e) =>
                    handleFileChange(
                      e,
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
                <UploadFileButton
                  uploadButtonFor="SDK"
                  handleFileChange={(e) =>
                    handleFileChange(
                      e,
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
            )}
          </div>
        )}

        <DeviceInputFields
          data={inputFieldsArr}
          onChange={(event) =>
            handleInputFieldsManuellyTypedChange(
              event,
              setInputFieldsArr,
              setDataFieldsObj
            )
          }
        />

        <div className="config-action">
          <OpButton
            opButtonTxt={configType.text}
            handleClick={() => {}}
            disabled={false}
            buttonIcon={configType.svg}
            buttonIsDynamic={false}
            roundButtonBorders={true}
            buttonStyleOptions={{
              buttonStyles: {
                height: "75px",
                width: "max-content",
              },
              iconStyles: {
                height: 60,
                width: 70,
              },
            }}
          />

          <div className="warning-container">
            <img
              src={warningSymbolIconImg}
              alt="Warning symbol"
              className="warning-symbol"
            />
            <img
              src={warningSymbolIconImg}
              alt="Warning symbol"
              className="warning-symbol"
            />
          </div>
          <span className="config-status-text">Configuration is running</span>
          <div className="gears-container">
            <div className="gear-rotate"></div>
            <div className="gear-rotate-left"></div>
          </div>
        </div>
      </div>
      {/* Right div ends */}
    </div>
  );
};
export default ConfigBoard;
