/*For sidebar ************************************** */

import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { CSSProperties } from "react";
import { store } from "../auth/redux/store";
import {
  // Device, 
  User
} from "../generated/gql/graphql";
import { SelectChangeEvent } from "@mui/material/Select";


export interface ICustomAccordionProps {
  handleAccordionChange: (e: React.SyntheticEvent, expanded: boolean) => void;
  expanded: boolean;
  accTitle: string; //accordion title
  accSubTitle?: string; //an optional subtitle
  accDetailsType: "INSTRUCTION" | "CUSTOM_TEXTFIELDS_OPTIONALS";
  DetailsArea: JSX.Element;
}

export interface IOpButtonProps {
  handleClick: () => void;
  disabled: boolean;
  opButtonTxt?: string;
  buttonIcon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  buttonStyleOptions?: {
    buttonStyles?: CSSProperties;
    iconStyles?: SxProps<Theme>;
  };
  roundButtonBorders?: boolean; //borders are rounded
  buttonIsDynamic: boolean; // the animation effect will only be applied on download and backup data buttons
  typeButtonIfDynamic?: "BACK" | "DOWNLOAD"; //if button is dynamic we know that it will either be the download button or backup button
}


export interface ICustomTextFieldProps {
  inputProps: {
    id: string;
    name: string;
    type: "password" | "text";
    value: string;
    placeHolderTxt?: string; //optional
  };
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface IFocusQRInput {
  onQrTextChange: ($txt: string) => void;
}

export interface IDeviceInputFieldsProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  data: IInputFieldsArr[];
}


export interface IInputFieldsArr {
  label: string;
  id: string;
  value: string;
}


//For Redux:
interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

//don't need password, though its hashed
type IUser = Omit<User, "password">

// Define RootState and AppDispatch types for Redux State Management
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


//sidebar props
interface SidebarProps {
  collapsed: boolean;
  toggled: boolean;
  onBackdropClick: () => void;
  handleCollapsedChange: () => void;
}


type FileTypes = 'FIRMWARE' | 'SDK' | 'CSV' | 'RUTVERSION' | 'CONFIG_TYPE';


type TSVG = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
  title?: string;
}>


//TODO: change selectFor to its own type
//props for ExistingFiles and RUTVersionSelect components
interface IDropDownSelectProps {
  selectFor?: FileTypes
  onChange: (e: SelectChangeEvent) => void;
}


//bootstrap profile dialog props
interface IAuthProfil {
  open: boolean;
  onClose: () => void;
}


// Define a type for valid keys of iconMap
type IconMapKeys = 'FIRMWARE' | 'SDK' | 'CSV';


//props for UploadFirmware and UploadSDK functional components
interface UploadFileProps {
  uploadButtonFor: IconMapKeys,
  fileIsUploaded: boolean;
  error: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetInputRef: React.RefObject<HTMLInputElement> // on reset if the same file is uploaded, then set input value temporarely to "" to trigger visual effects
}


interface ICheckBoxInputProps {
  label?: string;
  inputChecked: boolean;
  handleInputCheckedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



/**************************************** */
//get only necessary fields from type "Router"
// type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
//   Pick<T, TRequired>;


//must be passed when configuring router (to store in database)
// type GetTypesForInputs = OptionalExceptFor<
//   Device,
//   | "wifiSSID"
//   | "passForWebUser"
//   | "passWifi"
// // | "deviceFieldsOptional"
// >;


// | "routerSSID"
// | "dfltRouterPass"
// | "dfltWifiPass"
// | "IMEI"
// | "LAN_MAC"


//for router search and router udpate
// type GetTypesOnSearch = OptionalExceptFor<
//     Router,
//     | "serialNumber"
//     | "IMEI"
//     | "LAN_MAC"
//     | "dfltRouterPass"
//     | "dfltWifiPass"
//     | "routerPassWeb"
//     | "wifiPass"
//     | "routerPassShell"
//     | "isConfigured"
//     | "ipAdress"
// >;

// //extend GetTypes For Inputs interface
// interface IRouterInput extends GetTypesForInputs {
//     inputQR_CODE?: string; //if user decides to scan
// }
// //for config router status widgets
// type IConfStatus = {
//     showConfigGears?: boolean;
//     configTxts?: {
//         configStatus?: string;
//         configRunOrDone?: string;
//     };
// };





// for AutoSteps.tsx file 
interface ITodoStep {
  stepName?: string | JSX.Element;
  imgSrc: string;
  todo?: JSX.Element;
}
// interface IUser extends UserObj {
//   accessToken: string;
// }

//for login
interface ILogin {
  username: string;
  password: string;
}


type IChar = {
  [key: string]: string;
};



export {
  AuthState,
  IUser,
  RootState,
  AppDispatch,
  UploadFileProps,
  IDropDownSelectProps,
  ICheckBoxInputProps,
  ILogin,
  SidebarProps,
  IAuthProfil,
  // IConfStatus
  IconMapKeys,
  ITodoStep,
  IChar,
  FileTypes,
  TSVG
}