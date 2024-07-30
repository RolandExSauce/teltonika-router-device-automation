import { DeviceInfo, IDeviceFieldsMust, IDeviceFieldsOptional } from "../../../generated/gql/graphql";
import { IChar, IInputFieldsArr } from "../../../utils/types";


//tranform array for input containing label, value etc into an object to send for config
export const transformInputFieldsArr = (arr: IInputFieldsArr[]): DeviceInfo => {
    const myArr = arr.reduce<DeviceInfo>(
        (acc, currentField) => {
            const { id, value } = currentField;

            if (
                ["wifiSSID", "passWifi", "webUser", "passForWebUser"].includes(id)
            ) {
                // Assign to deviceFieldsMust if id matches expected keys
                acc.deviceFieldsMust[id as keyof Omit<IDeviceFieldsMust, "modell">] = value;
            } else {
                // Otherwise, assign to deviceFieldsOptional
                if (acc.deviceFieldsOptional)
                    acc.deviceFieldsOptional[id as keyof IDeviceFieldsOptional] = value;
            }
            return acc;
        },
        {
            deviceFieldsMust: {} as IDeviceFieldsMust,
            deviceFieldsOptional: {} as Partial<IDeviceFieldsOptional>, //optional means that not every field must be included
        }
    );
    return myArr;
};


//function to decode the qr code
const IMEI_LENGTH = 15;
const QR_LENGTH = 109;
const ROUTER_LAN_MAC_LENGTH = 12;
const ROUTER_SERIAL_NUMBER_LENGTH = 10;
const ROUTER_SSID_LENGTH = 11;
const SIMD_ID_LENGTH = 19;

//Add some error handling later
export const decodeRouterQR = (INFO_STRING: string) => {

  console.log("info string: ", INFO_STRING)
  const EXTRACTED_BARCODE_SIMD = INFO_STRING.slice(-SIMD_ID_LENGTH);
  const EXTRACTED_ROUTER_QR_CODE = INFO_STRING.slice(0, QR_LENGTH);

  //Get router ssid
  const ROUTER_SSID = EXTRACTED_ROUTER_QR_CODE.substring(
    EXTRACTED_ROUTER_QR_CODE.indexOf("R"),
    EXTRACTED_ROUTER_QR_CODE.indexOf("R") + ROUTER_SSID_LENGTH
  );

  //If ? is in router ssid, remove and replace by underscore "_"
  const checkQuestionMark = (chr: string) =>
    `&/#, +()$~%.'":*?<>{}`.includes(chr);
  let ROUTER_SSID_WITH_UNDERSCORE = [...ROUTER_SSID].reduce(
    (s, c) => (checkQuestionMark(c) ? s + "_" : s + c),
    ""
  );

  //QR Code String Router ssid removed
  const QR_STRING_ROUTER_SSID_REMOVED = EXTRACTED_ROUTER_QR_CODE.replace(
    ROUTER_SSID,
    ""
  );

  //get index of admin
  const adminIndex = QR_STRING_ROUTER_SSID_REMOVED.indexOf("admin");
  const partWithAdmin = QR_STRING_ROUTER_SSID_REMOVED.substring(adminIndex); //find substring with admin string in it

  //remove substring which includes admin
  const QR_STRING_ADMIN_REMOVED = EXTRACTED_ROUTER_QR_CODE.replace(
    partWithAdmin,
    ""
  );

  //remove the stupid chars, string is being read from the end, -3 represents the count of stupid chars, maybe it will change?,
  // => on frontend => TODO: INFO, check router information and correct if read errors
  const ALMOST_AT_LAN_MAC = QR_STRING_ADMIN_REMOVED.slice(0, -3);

  //read lan mac from behind
  let LanMac = ALMOST_AT_LAN_MAC.substring(
    ALMOST_AT_LAN_MAC.length - ROUTER_LAN_MAC_LENGTH
  );

  //string when lan mac is removed
  const QR_STRING_LanMac_REMOVED = ALMOST_AT_LAN_MAC.replace(LanMac, "");

  //repeat for IMEI and Serialnumber
  const ALMOST_AT_IMEI = QR_STRING_LanMac_REMOVED.slice(0, -3);
  const IMEI = ALMOST_AT_IMEI.substring(ALMOST_AT_IMEI.length - IMEI_LENGTH);
  const QR_STRING_IMEI_removed = ALMOST_AT_IMEI.replace(IMEI, "");

  //serialnumber
  const ALMOST_AT_SERIALNUMBER = QR_STRING_IMEI_removed.slice(0, -3);
  const SERIAL_NUMBER = ALMOST_AT_SERIALNUMBER.substring(
    ALMOST_AT_SERIALNUMBER.length - ROUTER_SERIAL_NUMBER_LENGTH
  );

  //extract wifi password
  const wifiPasswordPart = ALMOST_AT_SERIALNUMBER.substring(
    0,
    ALMOST_AT_SERIALNUMBER.indexOf(ROUTER_SSID) + ROUTER_SSID.length
  );

  const AlmostFirstfinalPasswordString = ALMOST_AT_SERIALNUMBER.replace(
    wifiPasswordPart,
    ""
  );
  const AlmostSecondfinalPasswordString =
    AlmostFirstfinalPasswordString.replace(SERIAL_NUMBER, "");

  //get the default password
  const passOne = AlmostSecondfinalPasswordString.slice(3);
  let finalPasswordWifi: string;

  finalPasswordWifi = passOne.substring(0, passOne.indexOf("Ö"));
  finalPasswordWifi = passOne.substring(0, passOne.indexOf("ö"));

  const adminRemoved = partWithAdmin.replace("admin", "");

  const stupidPart = adminRemoved.slice(3);
  let stupidPartRemoved: string = "";

  if (stupidPart.startsWith("ö")) {
    stupidPartRemoved = stupidPart.replace("ö", "");
  }
  if (stupidPart.startsWith("Ö")) {
    stupidPartRemoved = stupidPart.replace("Ö", "");
  }

  let defaultPassword: string;
  defaultPassword = stupidPartRemoved.slice(0, stupidPartRemoved.indexOf("Ö"));
  defaultPassword = stupidPartRemoved.slice(0, stupidPartRemoved.indexOf("ö"));

  //replace y by z and vice versa
  const charToReplace: IChar = {
    y: "z",
    Z: "Y",
    z: "y",
    Y: "Z",
  };

  //swap y and z occurences
  ROUTER_SSID_WITH_UNDERSCORE = ROUTER_SSID_WITH_UNDERSCORE.replace(
    /[yZzY]/g,
    (val) => charToReplace[val]
  );
  finalPasswordWifi = finalPasswordWifi.replace(
    /[yZzY]/g,
    (val) => charToReplace[val]
  );
  defaultPassword = defaultPassword.replace(
    /[yZzY]/g,
    (val) => charToReplace[val]
  );
  LanMac = LanMac.replace(/[yZzY]/g, (val) => charToReplace[val]);

  //add information to router object
  const ROUTER = {
    routerSSID: ROUTER_SSID_WITH_UNDERSCORE,
    defaultPassword,
    defaultWifiPassword: finalPasswordWifi,
    SerialNumber: SERIAL_NUMBER,
    IMEI: IMEI,
    LANMAC: LanMac,
    simID: EXTRACTED_BARCODE_SIMD,
  };
  return ROUTER;
};


//validate qr code
// export const validateConfigInputs = (fields: any) => { //use IRouterInput here
//     const {
//       serialNumber,
//       routerSSID,
//       IMEI,
//       LAN_MAC,
//       dfltRouterPass,
//       dfltWifiPass,
//     } = fields;
  
//     if (
//       serialNumber.length !== 10 ||
//       routerSSID.length !== 11 ||
//       IMEI?.length !== 15 ||
//       LAN_MAC?.length !== 12 ||
//       dfltRouterPass.length !== 8 ||
//       dfltWifiPass?.length !== 8
//     ) {
//       return false; //will return false if the length those inputs are wrong 
//     } else return true;
//   };
  