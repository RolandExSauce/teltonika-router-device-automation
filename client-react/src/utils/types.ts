/*For sidebar ************************************** */

import { store } from "../auth/redux/store";
import { Device, User } from "../generated/gql/graphql";
import { SelectChangeEvent } from "@mui/material/Select";

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


type FileTypes = 'FIRMWARE' | 'SDK' | 'CSV' | 'RUTVERSION';

//props for ExistingFiles and RUTVersionSelect components
interface DropDownSelectProps {
  selectFor?: FileTypes
  onChange: (e: SelectChangeEvent) => void;
}


//bootstrap profile dialog props
interface BootStrapDialogProps {
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


interface InputCheckProps {
  label?: string;
  useFiles: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



/**************************************** */
//get only necessary fields from type "Router"
type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;


//must be passed when configuring router (to store in database)
type GetTypesForInputs = OptionalExceptFor<
  Device,
  | "wifiSSID"
  | "passForWebUser"
  | "passWifi"
// | "deviceFieldsOptional"

>;


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


interface ConfigStepsDropDownProps {
  handleAccordionChange: (e: React.SyntheticEvent, expanded: boolean) => void;
  expanded: boolean;
}




//props for SelectConfigType component
interface SelectConfigTypeProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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

  SelectConfigTypeProps,
  UploadFileProps,
  DropDownSelectProps,
  ConfigStepsDropDownProps,
  InputCheckProps,
  ILogin,
  SidebarProps,
  BootStrapDialogProps,
  // IConfStatus
  IconMapKeys,
  ITodoStep,
  IChar,
  FileTypes,
}