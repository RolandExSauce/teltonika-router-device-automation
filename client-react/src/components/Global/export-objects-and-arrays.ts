import { confirmSymbolIconSVG } from "../../assets/export-svgs";
import { IconMapKeys, IInputFieldsArr } from "../../utils/types";

// define device rules, for default user we will only render
const deviceRules = {
    "Download data": confirmSymbolIconSVG,
    "Search detailed data": confirmSymbolIconSVG,
    "Edit device data": confirmSymbolIconSVG,
    "Delete device data": confirmSymbolIconSVG,
    "Configure device": confirmSymbolIconSVG,
    "Backup device data": confirmSymbolIconSVG,
};

//for input fields, used in ConfigBoard.tsx
const initedInputFieldsArr: IInputFieldsArr[] = [
    { label: 'WIFI SSID*', id: 'wifiSSID', value: '' },
    { label: 'CLI username*', id: 'webUser', value: '' },
    { label: 'CLI user password*', id: 'passForWebUser', value: '' },
    { label: 'WIFI Password*', id: 'passWifi', value: '' },
    //optional fields
    { label: 'SSH username (optional)', id: 'shellUser', value: '' },
    { label: 'SSH user password (optional)', id: 'passForShellUser', value: '' },
    { label: 'Device Serial number (optional)', id: 'serialNumber', value: '' },
    { label: 'Device SIMID (optional)', id: 'SIMID', value: '' },
    { label: 'Device IMEI (optional)', id: 'IMEI', value: '' },
    { label: 'Device LAN MAC (optional)', id: 'LAN_MAC', value: '' },
];

//items for select drop down "Select Config Type"
const configTypes = ["Configure & add", "Configure only", "Add to DB only"];

//Define uploadTexts for all FileTypes, used in UploadFileButton.tsx
const uploadTexts: Record<IconMapKeys, { before: string; after: string }> = {
    FIRMWARE: { before: "UPLOAD FIRMWARE", after: "FW uploaded" },
    SDK: { before: "UPLOAD BACKUP", after: "BAK uploaded" },
    CSV: { before: "CSV FILE", after: "CSV uploaded" },
};

export {
    deviceRules,
    initedInputFieldsArr,
    configTypes,
    uploadTexts
}