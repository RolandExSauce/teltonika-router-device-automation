import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import "./config.css";
import { useEffect, useRef, useState } from "react";
import Automation from "./Info-Display-Components/AutoSteps";
import { decodeRouterQR } from "./utils/decode.qr";
import {
  DeviceModell,
  IConfStatus,
  IRouterInput,
  initialValuesRouter,
} from "../types";
import {
  CONFIG_RUNNING_WARNING,
  DATEN_CHECK,
  DATEN_KORREKT,
  QR_AND_SIM_BARCODE_READ_CORRECT,
  QR_OR_SIM_BARCODE_READ_INCORRECT,
} from "../../assets/constants";
import { useMutation } from "@apollo/client";
import { Mutation } from "../../generated/gql/graphql";
import { CONFIG_DEVICE_MUTATION } from "../../graphql/device.mutations";
import warningConfigIMG from "./images/warningConfig.png";
import warningConfigFailure from "./images/warningIcon.png";
import configDoneIMG from "./images/configDone.png";
import { GET_ROUTERS_QUERY } from "../../graphql/queries";
import { validateConfigInputs } from "./utils/validate";

import { SvgIcon } from "@mui/material";
import {
  resetIconSVG,
  inDBSVG,
  onlyConfigSVG,
  inDBConfigSVG,
} from "../../assets/icons/exportIcons";
import { handleFileSubmit } from "./middlewares/uploadConfigFiles";
import SelectConfigType from "./Select-Data-Components/SelectConfigType";
import on from "./images/on.png";
import off from "./images/off.png";
import lazyGarfield from "./images/workSmartNotHard.png";
import clickHere from "./images/clickHere.png";
import ConfigStepsDropDown from "./Info-Display-Components/ConfigStepsDropDown";
import { SelectChangeEvent } from "@mui/material/Select";
import InputCheck from "./Select-Data-Components/InputCheck";
import UploadFile from "./Select-Data-Components/UploadFile";
import DropSelect from "./Select-Data-Components/DropSelect";
import InputDataField, { DataObj, inputFieldsObjType } from "./InputDataField";
import { initedInputFieldsArr, updatedInputFieldsObj } from "./utils/objects";
import { before } from "lodash";

//Main Component for handling the configuration of the device
function ConfigRouter() {
  /* FOR SelectConfigType Component START   ****************************/
  const [selectedConfigType, setSelectedConfigType] = useState("Option1");
  const handleConfigOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedConfigType(selectedValue); //set selected option
  };

  //object to for dynamically setting text and icons for the configuration button
  const configType =
    selectedConfigType === "Option1"
      ? { svg: inDBConfigSVG, text: "Config & add" }
      : selectedConfigType === "Option2"
      ? { svg: onlyConfigSVG, text: "Config only" }
      : { svg: inDBSVG, text: "Add to DB" };

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

  const [config, setConfig] = useState<IConfStatus>(routerConfigStatus);

  //config and add router mutation
  const [configAndMaybeAddDeviceInDB] = useMutation<Mutation>(
    CONFIG_DEVICE_MUTATION,
    {
      fetchPolicy: "no-cache",
      onCompleted: ({ configThenAddRouter }) => {
        if (configThenAddRouter?.__typename === "RouterConfigStatus") {
          //update error messages
          setConfig({
            showConfigGears: false, //cuz we done
            configTxts: {
              ...config.configTxts,
              configStatus: "Konfiguration fertig",
              configRunOrDone: configThenAddRouter.isConfigured as string,
            },
          });
        } else if (configThenAddRouter?.__typename === "GraphqlError") {
          //update error messages
          setConfig({
            showConfigGears: false,
            configTxts: {
              ...config.configTxts,
              configStatus: "Fehlgeschlagen...",
              configRunOrDone: configThenAddRouter.customError,
            },
          });
        }

        //reset everything
        setTimeout(() => {
          setRouterData(initialValuesRouter);
          setInputReceived("");
          setConfig(routerConfigStatus);
        }, 4000);
      },

      onError: (err) => {
        setConfig({
          showConfigGears: false,
          configTxts: {
            ...config.configTxts,
            configStatus: "Fehlgeschlagen...",
            configRunOrDone: err.message,
          },
        });

        setTimeout(() => {
          setRouterData(initialValuesRouter);
          setInputReceived("");
          setConfig(routerConfigStatus);
        }, 4000);
      },

      refetchQueries: [GET_ROUTERS_QUERY, "GetRouters"],
    }
  );

  const [statusColor, setStatusColor] = useState("red");
  const [statusImg, setStatusImg] = useState(off);
  const [isFocused, setIsFocused] = useState(false);
  const [inputReceived, setInputReceived] = useState(
    "Scan or enter Data manuelly"
  );

  const [routerData, setRouterData] =
    useState<IRouterInput>(initialValuesRouter);

  const ref = useRef(null);
  useEffect(() => {}, [isFocused]);
  //check if scan input is focused on mount
  useEffect(() => {
    if (document.activeElement === ref.current) {
      /**/
    } else {
      /**/
    }
  }, [ref]);

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

  console.log(configData);

  const handleInputQRFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setInputFieldsObj((prev) => ({
      ...prev,
      inputQRC: value,
    }));
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

  //decode data and display in textfields
  const beforeSubmit = (values: DataObj) => {
    console.log(values.inputQR_CODE);
    const ROUTER_INFO = decodeRouterQR(String(values.inputQR_CODE));
    console.log(ROUTER_INFO);
    setRouterData({
      ...routerData,
      ...ROUTER_INFO,
    });
  };

  //get submitted data
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent form from submitting directly

    const validateRes = validateConfigInputs(routerData); //validate length of fields
    if (!validateRes) {
      setInputReceived(() => DATEN_CHECK);
    } else {
      setInputReceived(() => DATEN_KORREKT);
      //set config objects
      setConfig({
        ...config,
        showConfigGears: true,
        configTxts: {
          ...config.configTxts,
          configStatus: "Router wird konfiguriert...",
          configRunOrDone: CONFIG_RUNNING_WARNING,
        },
      });

      //run config mutation
      await configAndMaybeAddDeviceInDB({
        variables: {
          deviceConfigInput: {
            deviceInfo: configData.deviceInfo,
            generateNewCredentials: configData.generateNewCredentials,
            options: configData.options,
          },

          // configRouterInput: {
          //   serialNumber: routerData.serialNumber,
          //   routerSSID: routerData.routerSSID,
          //   dfltRouterPass: routerData.dfltRouterPass,
          //   dfltWifiPass: routerData.dfltWifiPass,
          //   IMEI: routerData.IMEI,
          //   LAN_MAC: routerData.LAN_MAC,
          // },
        },
      });
    }
  };

  return (
    <>
      <Box className="main-content">
        {/* left div start */}
        <Box className="content">
          <Automation />
          <ConfigStepsDropDown
            expanded={expandedAccordion}
            handleAccordionChange={handleAccordionChange}
          />

          <Box sx={{ display: "flex", mt: 5 }}>
            <Typography sx={{ fontWeight: "bold", mr: 3, fontSize: 27 }}>
              Current Status:
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
                : "Configuration is running"}
            </Typography>
            <img src={warningConfigIMG} style={{ width: 45, height: 45 }} />
            <img src={warningConfigIMG} style={{ width: 45, height: 45 }} />
            {/* <img src={configDoneIMG} style={{ width: 45, height: 45 }} /> */}
          </Box>

          <Stack
            sx={{
              marginTop: 4,
              bgcolor: "#ffeaea",
              padding: 2,
              borderRadius: "15px",
            }}
            direction={"row"}
            spacing={3}
          >
            <img src={warningConfigFailure} style={{ width: 80, height: 80 }} />
            <Typography variant="h5">
              Make sure your Internet connection is stable! If the configuration
              keeps failing, please contact a system administrator.
            </Typography>
          </Stack>

          {!expandedAccordion && (
            <Box>
              <img
                src={lazyGarfield}
                style={{
                  width: "90%",
                  marginTop: 20,
                  paddingTop: 20,
                  borderRadius: 30,
                }}
              />
            </Box>
          )}
        </Box>
        {/* left div ends */}

        {/* right div */}
        <Box className="sidebar">
          <Grid
            container
            spacing={3}
            style={{ marginTop: 10, marginBottom: 30 }}
          >
            {/* Left column */}
            <Grid item xs={8}>
              <Stack direction="row" spacing={2}>
                <img src={clickHere} style={{ width: 78, height: 55 }} />
                {/* TextField */}
                <TextField
                  variant="standard"
                  autoComplete="off"
                  type="text"
                  id="inputQR_SIM_BAR_CODE"
                  name="inputQR_SIM_BAR_CODE"
                  style={{
                    background: statusColor,
                    fontSize: 15,
                    width: "4ch",
                    height: "4ch",
                    borderRadius: "15px",
                    color: "transparent",
                    caretColor: "transparent",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    inputProps: {
                      style: {
                        color: statusColor,
                      },
                    },
                  }}
                  sx={{ input: { cursor: "pointer" } }}
                  ref={ref}
                  value={inputFieldsObj.inputQR_CODE}
                  onFocus={() => {
                    setIsFocused(true);
                    setStatusColor("green");
                    setStatusImg(on);
                  }}
                  onBlur={() => {
                    setIsFocused(false);
                    setStatusColor("red");
                    setStatusImg(off);
                  }}
                  onChange={(e) => {
                    handleInputQRFieldChange(e);
                    beforeSubmit(inputFieldsObj);
                    // length of qr code
                    if (e.target.value.length === 128) {
                      setInputReceived(QR_AND_SIM_BARCODE_READ_CORRECT);
                      beforeSubmit(inputFieldsObj);
                    }
                    // update field value of scanned input
                    setRouterData({
                      ...routerData,
                      inputQR_CODE: e.target.value,
                    });
                    setStatusColor("green");
                  }}
                />

                {/* Typography */}
                <Typography sx={{ fontWeight: "bold", mt: 5 }}>
                  QR Code Catcher:
                </Typography>
                <img src={statusImg} style={{ width: 40, height: 37 }} />
              </Stack>
            </Grid>

            {/* Right column */}
            <Grid item xs={4} style={{ textAlign: "right" }}>
              {/* Reset Button */}
              <Button
                sx={{
                  width: "max-content",
                  fontWeight: "bold",
                  fontFamily: "Arial",
                  borderRadius: "30px",
                  backgroundColor: "#F3F9FC",
                  color: "#1EB0FF",
                  "&:hover": {
                    backgroundColor: "#F3F9FC",
                  },
                  height: 50,
                }}
                variant="contained"
                endIcon={<SvgIcon component={resetIconSVG} inheritViewBox />}
                onClick={() => {
                  setRouterData(initialValuesRouter);
                  setInputReceived("");
                  setInputFieldsArr(initedInputFieldsArr);
                  setFirmwareFile(null);
                  setFirmwareFileIsUploaded(false);
                  setSdkFileIsUploaded(false);
                  setSdkFile(null);
                }}
              >
                clear
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={9}>
              <TextField
                required={true}
                value={routerData.inputQR_CODE}
                placeholder="Your scanned QR Code will be shown here"
                disabled={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Arial",
                  borderRadius: "30px",
                  height: 50,
                }}
                variant="contained"
                onClick={() => {
                  // Check for correct qr code
                  if (routerData.inputQR_CODE?.length !== 128) {
                    setInputReceived(QR_OR_SIM_BARCODE_READ_INCORRECT);
                    beforeSubmit(inputFieldsArr);
                  } else {
                    setInputReceived(QR_AND_SIM_BARCODE_READ_CORRECT);
                  }

                  console.log(routerData);
                  beforeSubmit(routerData);
                }}
              >
                Decrypt
              </Button>
            </Grid>
          </Grid>
          <SelectConfigType onChange={handleConfigOptionChange} />

          <Grid container spacing={2}>
            <Grid item xs={8} md={7}>
              <InputCheck
                label="Generate new passwords for Device"
                useFiles={genCredentials}
                handleChange={handleGenCredentialsChange}
              />
            </Grid>

            <Grid item xs={4} md={5} sx={{ mb: 4 }}>
              <DropSelect
                selectFor="RUTVERSION"
                onChange={handleRUTVersionChange}
              />
            </Grid>
          </Grid>

          {showFilesArea ? (
            <Grid container spacing={3} sx={{ mb: 5 }}>
              <Grid item xs={12} sm={4}>
                {/* UseExistingFiles component */}
                <InputCheck
                  label="Use Existing files"
                  useFiles={useExistingFiles}
                  handleChange={handleUseExistingFilesChange}
                />
              </Grid>

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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <UploadFile
                        uploadButtonFor="FIRMWARE"
                        handleFileChange={handleFirmwareFileChange}
                        fileIsUploaded={firmwarefileIsUploaded}
                        error={errorFirmwareFile}
                        resetInputRef={inputRefFirmware}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <UploadFile
                        uploadButtonFor="SDK"
                        handleFileChange={handleSDKFileChange}
                        fileIsUploaded={sdkFileIsUploaded}
                        error={errorSdkFile}
                        resetInputRef={inputRefSDK}
                      />
                    </Grid>
                  </Grid>
                  // Display Upload components END
                )}
              </Grid>
            </Grid>
          ) : null}
          {/* Two columns with three text fields each */}
          <Grid container spacing={3}>
            <InputDataField
              data={inputFieldsArr}
              dataTwo={inputFieldsObj}
              onChange={handleChangeManuelly}
            />
          </Grid>

          <Grid sx={{ textAlign: "center", mt: 3, p: 1 }}>
            <Button
              sx={{
                fontWeight: "bold",
                fontFamily: "Arial",
                borderRadius: "30px",
                backgroundColor: "#F3F9FC  ", // Set background color to white
                color: "#1EB0FF",
                "&:hover": {
                  // Remove hover effect
                  backgroundColor: "#F3F9FC ", // Set the same color as the normal state
                },
                height: 60,
              }}
              variant="contained"
              onClick={async () => {
                setRouterData(initialValuesRouter);
                setInputReceived("");
                const Arr = [];
                Arr.push(firmwareFile as File);
                Arr.push(sdkFile as File);
                await handleFileSubmit(Arr, selectedRUTVersion as DeviceModell);
              }}
              endIcon={
                <SvgIcon
                  component={configType.svg}
                  inheritViewBox
                  sx={{ height: 50, width: 100 }}
                />
              }
            >
              {configType.text}
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ConfigRouter;
