
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import "./styles/config.css";
import { useEffect, useRef, useState } from "react";
import Automation from "./Info-Display-Components/AutoSteps";
import { QR_AND_SIM_BARCODE_READ_CORRECT } from "../../assets/operation-messages";
import { DeviceModell } from "../../generated/gql/graphql";
import warningConfigIMG from "./images/warningConfig.png";
import warningConfigFailure from "./images/warningIcon.png";
import { handleFileSubmit } from "./middlewares/uploadConfigFiles";
import SelectConfigType from "./Select-Data-Components/SelectConfigType";
import lazyGarfield from "./images/workSmartNotHard.png";
import ConfigStepsDropDown from "./Info-Display-Components/ConfigStepsDropDown";
import { SelectChangeEvent } from "@mui/material/Select";
import InputCheck from "./Select-Data-Components/InputCheck";

import DropSelect from "./Select-Data-Components/DropSelect";
import InputDataField, {
  // DataObj,

  inputFieldsObjType,
} from "./InputDataField";
import { initedInputFieldsArr, updatedInputFieldsObj } from "./utils/objects";
// import { before } from "lodash";
import {
  resetIconSVG,
  configAndAddToDBIconSVG,
  configOnlyIconSVG,
  addToDBIconSVG,
  decryptLockIconSVG,
} from "../../assets/export-svgs";
import OpButton from "../Global/buttons/OpButton";
import { offSwitchIconImg } from "../../assets/export-imgs";
import UploadFileButton from "../Global/buttons/UploadFileButton";
import FocusQRInput from "./FocusQRInput";

//init values for config route
const initialValuesRouter = {
  inputQR_CODE: "",

  deviceInfo: {
    modell: "",
    wifiSSID: "",
    webUser: "admin", //change if not admin
    passForWebUser: "",
    passWifi: "",
    serialNumber: "",
    SIMID: "",
    IMEI: "",
    LAN_MAC: "",

    configStatus: {},
  },
  generateNewCredentials: false,
  options: {
    kindOfConfig: "Option1",
    updateFirmware: true,
    updateSDK: false,
  },
};

//Main Component for handling the configuration of the device
function ConfigDevice() {
  //for tracking focus input to get qr code input
  const [qrTxt, setQRTxt] = useState("");
  const handleQrTextChange = (text: string) => {
    setQRTxt(text);
  };

  /* FOR SelectConfigType Component START   ****************************/
  const [selectedConfigType, setSelectedConfigType] = useState("Option1");
  const handleConfigOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedConfigType(selectedValue); //set selected option
  };

  //object to for dynamically setting text and icons for the configuration button
  const configType =
    selectedConfigType === "Option1"
      ? { svg: configAndAddToDBIconSVG, text: "Config & add" }
      : selectedConfigType === "Option2"
      ? { svg: configOnlyIconSVG, text: "Config only" }
      : { svg: addToDBIconSVG, text: "Add to DB" };

  /* FOR SelectConfigType Component END   ****************************/

  /* FOR RUTVersionSelect Component START   ****************************/
  const [selectedRUTVersion, setSelectedRUTVersion] =
    useState<DeviceModell | null>(null);
  const handleRUTVersionChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelectedRUTVersion(value as DeviceModell);
  };

  /* FOR RUTVersionSelect Component END   ****************************/
  /* FOR UploadSKD and UploadFirmware Components START   ****************************/
  const inputRefFirmware = useRef<HTMLInputElement>(null);
  const inputRefSDK = useRef<HTMLInputElement>(null);

  const [firmwareFile, setFirmwareFile] = useState<File | null>(null);
  const [firmwarefileIsUploaded, setFirmwareFileIsUploaded] = useState(false);
  const [errorFirmwareFile, setFirmwareFileError] = useState<string | null>(
    null
  );

  const [sdkFile, setSdkFile] = useState<File | null>(null);
  const [sdkFileIsUploaded, setSdkFileIsUploaded] = useState(false);
  const [errorSdkFile, setSdkFileError] = useState<string | null>(null);

  //handle firmware file change, only accept .bin files
  const handleFirmwareFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (inputRefFirmware.current) {
        inputRefFirmware.current.value = "";
      }
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension === "bin") {
        setFirmwareFileIsUploaded(true);
        setFirmwareFile(file);
        setFirmwareFileError(null);
      } else {
        setFirmwareFileError("Please select a .bin file.");
        setTimeout(() => {
          setFirmwareFileError(null);
        }, 5000); // Clear error message after 5 seconds
      }
    }
  };

  //handle sdk file change, only accept .gz files
  const handleSDKFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (inputRefSDK.current) {
        inputRefSDK.current.value = "";
      }
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension === "gz") {
        setSdkFileIsUploaded(true);
        setSdkFile(file);
        setSdkFileError(null);
      } else {
        setSdkFileError("Please select a .gz file.");
        setTimeout(() => {
          setSdkFileError(null);
        }, 5000); // Clear error message after 5 seconds
      }
    }
  };
  /* FOR UploadSKD and UploadFirmware Components END *************************/

  /* FOR InputCheck Component START **************************/
  //use existing files or not
  const [useExistingFiles, setUseExistingFiles] = useState(false);
  const handleUseExistingFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUseExistingFiles(() => event.target.checked);
  };

  //generate new credentials or not
  const [genCredentials, setGenCredentials] = useState(false);
  const handleGenCredentialsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGenCredentials(() => event.target.checked);
  };
  /* FOR InputCheck Component END **************************/

  /* FOR ExistingFirmwareFiles, ExistingBackup Components START **************************/
  const [existingFirmware, setExistingFirmware] = useState("");
  const [existingSDK, setExistingSDK] = useState("");

  //choose existing files
  const handleFirmwareFilesExistChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setExistingFirmware(value);
  };

  const handleBackupFilesExistChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setExistingSDK(value);
  };
  /* FOR ExistingFirmwareFiles, ExistingBackup Components END **************************/

  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const handleAccordionChange = (
    _e: React.SyntheticEvent,
    expanded: boolean
  ) => {
    //console.log(e); //actually not needed
    setExpandedAccordion(expanded);
  };

  //initialze
  const routerConfigStatus = {
    showConfigGears: false, //show gears
    configStatus: "No device is being configured",
  };

  const showFilesArea =
    selectedConfigType === "Option1"
      ? true
      : selectedConfigType === "Option2"
      ? true
      : false;

  //const [config, setConfig] = useState<IConfStatus>(routerConfigStatus);
  const [config, setConfig] = useState<any>(routerConfigStatus);

  const [statusColor, setStatusColor] = useState("red");
  const [statusImg, setStatusImg] = useState(offSwitchIconImg);
  const [inputReceived, setInputReceived] = useState(
    "Scan or enter Data manuelly"
  );

  const [routerData, setRouterData] =
    //useState<IRouterInput>(initialValuesRouter);
    useState<any>(initialValuesRouter);

  //change on false scan and then restart
  useEffect(() => {
    if (inputReceived.includes(QR_AND_SIM_BARCODE_READ_CORRECT)) {
      setInputReceived(QR_AND_SIM_BARCODE_READ_CORRECT);
    }
  }, [inputReceived]);

  const [inputFieldsArr, setInputFieldsArr] = useState(initedInputFieldsArr);
  const transformedInputFieldsArr = inputFieldsArr.reduce(
    (acc, currentField) => ({ ...acc, [currentField.id]: currentField.value }),
    updatedInputFieldsObj
  ); //turning array to object with reduce, we are only interested in the value fields

  const [inputFieldsObj, setInputFieldsObj] = useState(
    transformedInputFieldsArr
  );

  const configData = {
    deviceInfo: inputFieldsObj,
    generateNewCredentials: genCredentials,
    options: {
      kindOfConfig: selectedConfigType,
      //option three means we not configuring the device, so its undefined
      updatingDevice:
        selectedConfigType === "Option3"
          ? undefined
          : {
              uploadingFirmware: firmwareFile ? true : false,
              uploadingSDK: sdkFile ? true : false,
              usingFirmwareFile: existingFirmware,
              usingSDKFile: existingSDK,
            },
    },
  };

  const handleChangeManuelly = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldPassed: inputFieldsObjType
  ) => {
    const { value } = e.target;
    e.preventDefault();
    let result = inputFieldsArr; // copy state of inputfields array
    result = result.map((field) => {
      // map array to replace the old comment with the new one
      if (field.id === fieldPassed.id) field.value = value;
      return field;
    });

    setInputFieldsObj((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));

    setInputFieldsArr(result); //update state with new value
  };

  return (
    <>
      <div className="main-content">
        {/* left div start ***************************************************************************************************************************/}
        <div className="content">
          <Automation />
          <ConfigStepsDropDown
            expanded={expandedAccordion}
            handleAccordionChange={handleAccordionChange}
          />
          <div
            style={{
              marginTop: 4,
              backgroundColor: "#ffeaea",
              padding: 10,
              borderRadius: "15px",
              display: "flex",
              flexDirection: "row",
              margin: "40px 0px 0px 0px",
            }}
          >
            <img src={warningConfigFailure} style={{ width: 80, height: 80 }} />
            <p style={{ fontSize: "1.5rem", lineHeight: 1.5 }}>
              Make sure your Internet connection is stable! If the configuration
              keeps failing, please contact a system administrator.
            </p>
          </div>

          {!expandedAccordion && (
            <div>
              <img
                src={lazyGarfield}
                style={{
                  width: "90%",
                  marginTop: 20,
                  paddingTop: 20,
                  borderRadius: 30,
                }}
              />
            </div>
          )}
        </div>
        {/* left div ends *****************************************************************************************************************/}

        {/* TODO: LATER REMOVE MARGIN BOTTOM FROM EACH DIV AND ADD GAP */}
        {/* right div *********************************************************************************************************************/}

        <div className="sidebar">
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
              disabled={false}
              buttonIcon={resetIconSVG}
              buttonIsDynamic={false}
            />
          </div>

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
            <TextField
              required={true}
              value={qrTxt}
              placeholder="Your scanned QR and SIM ID will be shown here"
              disabled={true}
              fullWidth
            />

            <OpButton
              opButtonTxt="Decrypt"
              handleClick={() => console.log("implement")}
              disabled={false}
              buttonIcon={decryptLockIconSVG}
              buttonIsDynamic={false}
            />
          </div>

          <SelectConfigType onChange={handleConfigOptionChange} />

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
            <InputCheck
              label="Generate new passwords for device"
              useFiles={genCredentials}
              handleChange={handleGenCredentialsChange}
            />

            <DropSelect
              selectFor="RUTVERSION"
              onChange={handleRUTVersionChange}
            />
          </div>

          {showFilesArea ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <InputCheck
                label="Use existing files for config"
                useFiles={useExistingFiles}
                handleChange={handleUseExistingFilesChange}
              />

              {/* Grid item for ExistingFirmware components or Upload components */}
              <Grid item xs={12} sm={8}>
                {useExistingFiles ? (
                  /*** Display Choose from existing files components START ***/
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DropSelect
                        selectFor="FIRMWARE"
                        onChange={handleFirmwareFilesExistChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DropSelect
                        selectFor="SDK"
                        onChange={handleBackupFilesExistChange}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  /*** Display Choose from existing files components END ***/
                  // Display Upload components START
                  <>
                    <UploadFileButton
                      uploadButtonFor="FIRMWARE"
                      handleFileChange={handleFirmwareFileChange}
                      fileIsUploaded={firmwarefileIsUploaded}
                      error={errorFirmwareFile}
                      resetInputRef={inputRefFirmware}
                    />

                    <UploadFileButton
                      uploadButtonFor="SDK"
                      handleFileChange={handleSDKFileChange}
                      fileIsUploaded={sdkFileIsUploaded}
                      error={errorSdkFile}
                      resetInputRef={inputRefSDK}
                    />
                  </>

                  // Display Upload components END
                )}
              </Grid>
            </div>
          ) : null}

          {/* Two columns with three text fields each */}
          {/* <Grid container spacing={3}>
            <InputDataField
              data={inputFieldsArr}
              dataTwo={inputFieldsObj}
              onChange={handleChangeManuelly}
            />
          </Grid> */}
          {/* 
          <Grid
            sx={{ textAlign: "center", justifyContent: "center", mt: 3, p: 1 }}
          >
            <OpButton
              opButtonTxt={configType.text}
              handleClick={async () => {
                setRouterData(initialValuesRouter);
                setInputReceived("");
                const Arr = [];
                Arr.push(firmwareFile as File);
                Arr.push(sdkFile as File);
                await handleFileSubmit(Arr, selectedRUTVersion as DeviceModell);
              }}
              disabled={false}
              buttonIcon={configType.svg}
              buttonIsDynamic={false}
            />

            <Box sx={{ display: "flex", mt: 5 }}>
              <Typography sx={{ fontWeight: "bold", mr: 3, fontSize: 27 }}>
                Config Status:
              </Typography>
              {showFilesArea ? null : (
                <div className="gears-container">
                  <div className="gear-rotate"></div>
                  <div className="gear-rotate-left"></div>
                </div>
              )}

              <Typography sx={{ color: "green", fontSize: 27 }}>
                {showFilesArea
                  ? config.configTxts?.configStatus
                  : " is running"}
              </Typography>
              <img src={warningConfigIMG} style={{ width: 45, height: 45 }} />
              <img src={warningConfigIMG} style={{ width: 45, height: 45 }} />
            </Box>
          </Grid> */}
        </div>
      </div>
    </>
  );
}

export default ConfigDevice;
